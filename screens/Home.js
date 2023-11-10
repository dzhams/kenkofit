import { Text, View, Image, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FitnessItems } from "../Context";
import FitnessCards from "../components/FitnessCards";

const Home = () => {
  const { minutes: initialMinutes, calories: initialCalories, workout: initialWorkout } = useContext(FitnessItems);

  const [minutes, setMinutes] = useState(initialMinutes);
  const [calories, setCalories] = useState(initialCalories);
  const [workout, setWorkout] = useState(initialWorkout);

  useEffect(() => {
    // Funktion zum Abrufen von Workout-Daten für den aktuellen Tag
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch('http://192.168.0.16:3000/get-workout', {
          method: 'GET',
        });

        const data = await response.json();

        if (data.workout) {
          // Wenn Daten vorhanden sind, setze den State
          setWorkout(data.workout);
          setCalories(data.calories);
          setMinutes(data.minutes);
        }
      } catch (error) {
        console.log("Fehler beim Abrufen der Workout-Daten: " + error);
      }
    };

    // Rufe die Funktion zum Abrufen von Workout-Daten auf
    fetchWorkoutData();
  }, []); // Trigger the effect only on component mount


  return (
    <ScrollView style={{ marginTop: 22 }}>
      <View
        style={{
          backgroundColor: "#B8860B",
          padding: 10,
          height: 170,
          width: "100%",
          marginBottom: 30,
        }}
      >
        <View style={{ backgroundColor: "white" }}>
          <Text style={{ color: "black", fontSize: 30, fontFamily: "Rajdhani-Bold", alignSelf: "center" }}>
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

    </ScrollView>
  );
};

export default Home;


