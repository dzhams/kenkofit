import React, { useState, useContext, useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { FitnessItems } from "../components/Context";

const ActivityScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [markedDates, setMarkedDates] = useState({});
    const [workoutData, setWorkoutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { completed } = useContext(FitnessItems);
    const navigation = useNavigation();
    const [showCalendar, setShowCalendar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        navigation.navigate("Login");
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            setIsLoggedIn(false);
        } catch (error) {
            console.log("Fehler beim Logout: ", error);
        }
    };


    const updateMarkedDates = () => {
        const updatedMarkedDates = {};
        completed.forEach((date) => {
            updatedMarkedDates[date] = { selected: true, marked: true, selectedColor: "blue" };
        });
        setMarkedDates(updatedMarkedDates);
    };

    const getWorkoutData = async (date) => {
        if (isLoggedIn) {
            try {
                setLoading(true);
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await fetch(`http://192.168.0.10:3000/get-workout-by-date/${date}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setWorkoutData(data);
                } else {
                    setWorkoutData(null);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Workout-Daten:', error);
                setWorkoutData(null);
            } finally {
                setLoading(false);
            }
        }
    };


    const fetchWorkoutDates = async () => {
        if (isLoggedIn) {
            try {
                setLoading(true);
                const authToken = await AsyncStorage.getItem('authToken');
                const response = await fetch('http://192.168.0.10:3000/get-workout-dates', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (response.ok) {
                    const dates = await response.json();
                    const newMarkedDates = {};
                    dates.forEach(date => {
                        // Hier konvertieren wir das Datum in das erforderliche Format
                        newMarkedDates[date] = { marked: true, dotColor: 'green' };
                    });
                    setMarkedDates(newMarkedDates); // Aktualisieren des State
                } else {
                    console.error('Fehler beim Abrufen der Workout-Daten:', response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Workout-Daten:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {
        fetchWorkoutDates();
    }, [isLoggedIn]);

    useEffect(() => {
        updateMarkedDates();
    }, [completed], [isLoggedIn]);

    useEffect(() => {
        if (selectedDate !== "") {
            getWorkoutData(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchWorkoutDates();
        const today = moment().format('YYYY-MM-DD');
        setSelectedDate(today);
        getWorkoutData(today);
    }, [isLoggedIn]);



    return (
        <ScrollView>
            <View style={{ margin: 25, marginTop: 50, flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 35, marginBottom: 5, fontFamily: "Rajdhani-Bold" }}>
                        Workout History
                    </Text>
                    <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
                        <AntDesign name="calendar" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                {showCalendar && (
                    <Calendar
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                            setShowCalendar(false);
                        }}
                        markedDates={markedDates}
                    />
                )}
                {isLoggedIn ? (
                    <>
                        {selectedDate !== "" && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 22, fontFamily: "Rajdhani-Bold", marginBottom: 10 }}>
                                    {selectedDate === moment().format('YYYY-MM-DD') ? "Workout von Heute" : `Workout von ${moment(selectedDate).format('DD MMMM YYYY')}`}
                                </Text>
                                {loading ? (
                                    <ActivityIndicator size="small" color="black" />
                                ) : workoutData ? (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 12 }}>
                                            <CircularProgress
                                                value={workoutData.workout}
                                                maxValue={15}
                                                activeStrokeWidth={20}
                                                inActiveStrokeColor="#dededc"
                                                progressValueColor={'black'}
                                                activeStrokeColor="#404191"
                                                title="Übungen"
                                                titleColor={'black'}
                                                titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                                            />
                                            <CircularProgress
                                                value={workoutData.minutes}
                                                activeStrokeWidth={20}
                                                progressValueColor={'black'}
                                                inActiveStrokeColor="#dededc"
                                                activeStrokeColor="#026a52"
                                                maxValue={40
                                                }
                                                title="Min"
                                                titleColor={'black'}
                                                titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <CircularProgress
                                                value={workoutData.calories}
                                                radius={120}
                                                duration={2000}
                                                progressValueColor={'black'}
                                                activeStrokeColor="#c43c08"
                                                inActiveStrokeColor="#dededc"
                                                activeStrokeWidth={20}
                                                maxValue={100}
                                                title={'Kcal'}
                                                titleColor={'black'}
                                                titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
                                            />
                                        </View>
                                    </View>

                                ) : (
                                    <Text style={{ fontFamily: "Rajdhani-Medium", fontSize: 20 }}>Keine Workout-Daten für ausgewähltes Datum vorhanden</Text>
                                )}

                            </View>

                        )}


                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{
                                backgroundColor: "black",
                                padding: 13,
                                alignSelf: "center",
                                marginTop: 20,
                                borderRadius: 6,
                                width: "100%"
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    fontFamily: "Rajdhani-Bold",
                                }}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={{ marginTop: 200 }}>
                        <Text style={{ fontSize: 20, color: "black", fontFamily: "Rajdhani-SemiBold" }}>
                            Bitte logge dich ein, um deine Aktivitäten zu sehen.
                        </Text>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={{
                                backgroundColor: "black",
                                padding: 13,
                                alignSelf: "center",
                                marginTop: 20,
                                borderRadius: 6,
                                width: "100%"
                            }}
                        >

                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    fontFamily: "Rajdhani-Bold",
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ height: 30 }}></View>
            </View>
        </ScrollView>
    );
};

export default ActivityScreen;
