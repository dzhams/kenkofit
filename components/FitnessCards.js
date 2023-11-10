import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../data/fitness";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 35}}>
      {FitnessData.map((item, key) => (
        <Pressable
        onPress={() => navigation.navigate("Workout",{
          image:item.image,
          excersises:item.excersises,
          id:item.id,
        })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{ width: "92%", height: 140, borderRadius: 7 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <Ionicons
            style={{ position: "absolute", color: "white", bottom: 15,left:20 }}
            name="fitness-outline" 
            size={24} 
            color="black" 
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});