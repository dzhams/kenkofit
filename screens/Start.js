import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../colors/colors';



const Start = ({ navigation }) => {

    return (
        
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={["#141e1d", "#141e1d", COLORS.secondary]}
        >
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, alignItems: 'center', marginTop: 90}}>
                    <Image
                        source={require("../assets/kenkofit.png")}
                        style={{
                            height: 250,
                            width: "100%",
                            borderRadius: 20,
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    bottom: 80,
                    width: "100%"
                }}>

                    <View style={{ marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 20,
                            color: "#b0a077",
                            marginVertical: 4,
                            fontFamily: "Rajdhani-Bold",
                        }}>Der Weg zur Fitness beginnt</Text>
                        <Text style={{
                            fontSize: 20,
                            color: "#b0a077",
                            marginVertical: 4,
                            fontFamily: "Rajdhani-Bold",
                        }}>mit dem ersten Schritt</Text>
                        
                    </View>
                    <Pressable
                    onPress={() => navigation.navigate("Signup")}
                    style={{
                        backgroundColor: "white",
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
                            color: "black",
                            fontSize: 21,
                            fontWeight: "600",
                            fontFamily: "Rajdhani-Bold"
                        }}
                    >
                        Mach jetzt mit
                    </Text>
                </Pressable>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: COLORS.white,
                            fontFamily: "Rajdhani-Regular",
                        }}>Du bist schon registriert ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.white,
                                marginLeft: 8,
                                marginTop: -2,
                                fontFamily: "Rajdhani-Bold",
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Start