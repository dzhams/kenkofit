import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FitnessItems } from "../components/Context";
import FitnessCards from "../components/FitnessCards";

const Home = () => {
  const { minutes, calories, workout, setMinutes, setCalories, setWorkout } = useContext(FitnessItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (isLoggedIn) {
        // Logik für eingeloggte Benutzer
        try {
          const token = await AsyncStorage.getItem('authToken');
          const response = await fetch('http://192.168.0.10:3000/get-todays-workout', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (response.status === 200) {
            const data = await response.json();
            setWorkout(data.workout);
            setCalories(data.calories);
            setMinutes(data.minutes);
          }
        } catch (error) {
          console.error("Fehler beim Abrufen der Workout-Daten:", error);
          
        }
      } else {
        // Logik für nicht eingeloggte Benutzer
        loadLocalData();
      }
    };
    fetchWorkoutData();
  }, [isLoggedIn]);

  useEffect(() => {
    const postWorkoutData = async () => {
      if (isLoggedIn) {
        try {
          const token = await AsyncStorage.getItem('authToken');
          await fetch('http://192.168.0.10:3000/update-todays-workout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ workout, calories, minutes }),
          });
        } catch (error) {
          console.error("Fehler beim Posten der Workout-Daten auf dem Server:", error.message);
        }
      }
    };
    postWorkoutData();
  }, [workout, calories, minutes, isLoggedIn]);

  const loadLocalData = async () => {
    const data = await AsyncStorage.getItem('workout');
    const parsed = data ? JSON.parse(data) : {};
    setWorkout(parsed.workout || 0);
    setCalories(parsed.calories || 0);
    setMinutes(parsed.minutes || 0);
  };

  return (
    <ScrollView style={{ marginTop: 22}}>
        <View
        style={{
          backgroundColor: "#9d874f",
          padding: 10,
          height: 170,
          width: "100%",
          marginBottom: 30,
        }}
      >
          <View style={{backgroundColor: "white", borderRadius: 7}}>
            <Text style={{ color: "black", fontSize: 30, fontFamily: "Rajdhani-Bold", alignSelf: "center"}}>
              H O M E   W O R K O U T
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: -15,
              width: "98%"
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",

                  color: "black",
                  fontSize: 20,
                  fontFamily: "Rajdhani-Bold",
                }}
              >
                {workout}
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontFamily: "Rajdhani-SemiBold" }}>
                ÜBUNGEN
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 20,
                  fontFamily: "Rajdhani-Bold"
                }}
              >
                {calories}
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontFamily: "Rajdhani-SemiBold" }}>
                KCAL
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 20,
                  fontFamily: "Rajdhani-Bold"
                }}
              >
                {minutes}
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontFamily: "Rajdhani-SemiBold" }}>
                MIN
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../assets/homeworkout.jpg")}
              style={{
                width: "100%",
                height: 130,
                marginTop: 20,
                borderRadius: 7,

              }}

            />
          </View>
        </View>
        <FitnessCards />
        <View style={{ height: 45 }}></View>
    </ScrollView>
  );
};

export default Home;


