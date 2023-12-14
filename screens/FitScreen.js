import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../components/Context";
import { useFonts } from "expo-font";




const FitScreen = () => {
  


  const route = useRoute();
  // console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  // console.log(current, "first excersise");

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);
  console.log(completed, "completed excersise");

  const [fontsLoaded] = useFonts({
    "Rajdhani-Bold": require("../fonts/Rajdhani-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <SafeAreaView>
      <Image
        style={{marginTop: 15, width: "100%", height: 350 }}
        source={{ uri: current.image }}
      />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="gray"
        />

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: "Rajdhani-Bold",
          
        }}
      >
        {current.name}
      </Text>

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 38,
          fontWeight: "bold",
        }}
      >
        x{current.sets}
      </Text>
      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate("Workout");
          }}
          style={{
            backgroundColor: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 5,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            navigation.navigate("Rest");
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(parseFloat((minutes + 2.5).toFixed(2)));
            setCalories(parseFloat((calories + 6.2).toFixed(2)));
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 5,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
              setIndex(index - 1);
          }}
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginHorizontal: 20,
            width: 100,
            borderWidth: 1,
            borderColor: "#dededc"
          }}
        >
          <Text
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            PREV
          </Text>
        </Pressable>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("Workout");
            }}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginHorizontal: 20,
              width: 100,
              borderWidth: 1,
              borderColor: "#dededc"
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              // navigation.navigate("Rest");

              // setTimeout(() => {
                setIndex(index + 1);
              // }, 2000);
            }}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              marginHorizontal: 20,
              width: 100,
              borderWidth: 1,
              borderColor: "#dededc"
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
