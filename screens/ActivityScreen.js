import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FitnessItems } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ActivityScreen = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [markedDates, setMarkedDates] = useState({});
    const { completed } = useContext(FitnessItems);
    const navigation = useNavigation();

    const updateMarkedDates = () => {
        const updatedMarkedDates = {};

        completed.forEach((date) => {
            updatedMarkedDates[date] = { selected: true, marked: true, selectedColor: "blue" };
        });

        setMarkedDates(updatedMarkedDates);
    };

    const handleLogout = async () => {
        try {
            // Lösche den Token aus dem AsyncStorage
            await AsyncStorage.removeItem('authToken');
            // Navigiere zur Login-Screen
            navigation.replace("Login");
        } catch (error) {
            console.log("Fehler beim Logout: ", error);
        }
    };

    useEffect(() => {
        updateMarkedDates();
    }, [completed]);

    return (
        <SafeAreaView>
            <View style={{ margin: 25, marginTop: 50 }}>
                <Text style={{ fontSize: 30, marginBottom: 40, fontFamily:"Rajdhani-Bold" }}>
                    Workout History
                </Text>
                <Calendar
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        // Hier kannst du die Logik für das Abrufen und Anzeigen der Workout-Daten für 'day.dateString' implementieren
                    }}
                    markedDates={markedDates}
                />
                {selectedDate !== "" && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Workout-Daten für {selectedDate}:
                        </Text>
                        {/* Hier die Logik für das Anzeigen der Workout-Daten basierend auf 'selectedDate' */}
                    </View>
                )}

                {/* Logout-Button */}
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
                            fontFamily: "Rajdhani-Bold"
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ActivityScreen;
