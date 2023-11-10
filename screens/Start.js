import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../colors/colors';
import Button from '../components/Button';



const Start = ({ navigation }) => {

    return (
        
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, alignItems: 'center', marginTop: 90}}>
                    <Image
                        source={require("../assets/user.png")}
                        style={{
                            height: 200,
                            width: 200,
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
                    top: 350,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 65,
                        textAlign: "center",
                        fontFamily: "Rajdhani-Bold",
                        color: COLORS.white
                    }}>kenkofit</Text>
                    

                    <View style={{ marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 20,
                            color: COLORS.white,
                            marginVertical: 4,
                            fontFamily: "Rajdhani-Bold",
                        }}>Der Weg zur Fitness beginnt</Text>
                        <Text style={{
                            fontSize: 20,
                            color: COLORS.white,
                            marginVertical: 4,
                            fontFamily: "Rajdhani-Bold",
                        }}>mit dem ersten Schritt</Text>
                        
                    </View>

                    <Button
                        title="Mach jetzt mit"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            marginTop: 30,
                            width: "100%"
                        }}
                    />

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