import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React ,{useContext} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../components/Context";
import { AntDesign } from '@expo/vector-icons';
const WorkOutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    completed,
    setCompleted,
  } = useContext(FitnessItems);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", marginTop: 40 }}
      >
        <Image
          style={{ width: "100%", height: 170 }}
          source={{ uri: route.params.image }}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {route.params.excersises.map((item, index) => (
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.image }}
            />

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontFamily: "Rajdhani-Bold",width:170, }}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 18, color: "gray", fontFamily: "Rajdhani-SemiBold" }}>
                x{item.sets}
              </Text>
            </View>

            {completed.includes(item.name) ? (
              <AntDesign style={{marginLeft:40}} name="checkcircle" size={24} color="green" />
            ) : (
              null
            )}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
      onPress={() =>  {
        navigation.navigate("Fit",{
          excersises:route.params.excersises,
      })
      setCompleted([]);
      }}
        style={{
          backgroundColor: "black",
          padding: 13,
          alignSelf: "center",
          marginVertical: 20,
          width:"70%",
          borderRadius:6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          GO
        </Text>
      </Pressable>
    </>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({});
