import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../colors/colors';
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');

                if (token) {
                    setTimeout(() => {
                        navigation.replace("myTabs", { screen: "Activity" });
                    }, 400);
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        if (!email.trim()) {
            Alert.alert('E-Mail address is required.');
            return;

        }
        try {
            const user = {
                email: email,
                password: password
            }

            const response = await axios.post('http://192.168.0.16:3000/login', user);
            const token = response.data.token;

            // Speichere den Token im AsyncStorage
            await AsyncStorage.setItem('authToken', token);

            // Navigiere zum ActivityScreen
            navigation.replace("myTabs", { screen: "Activity" });
        } catch (error) {
            console.log("error", error);
            Alert.alert("Fehler beim Einloggen");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <AntDesign onPress={() => navigation.goBack()} name="back" size={24} color="black" />
                    <Text style={{
                        fontSize: 26,
                        fontFamily: "Rajdhani-Bold",
                        marginVertical: 30,
                        color: COLORS.black
                    }}>
                        Willkommen Zurück ! 💪
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Melde dich an, um zu starten</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>E-Mail Addresse</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <MaterialIcons
                            style={{ position: "absolute", left: 4 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder='E-Mail'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                marginLeft: 32,
                                fontSize: email ? 16 : 16
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Passwort</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <AntDesign
                            style={{ position: "absolute", left: 4 }}
                            name="lock"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder='Passwort'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%",
                                marginLeft: 32,
                                fontSize: password ? 16 : 16
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Merken</Text>
                </View>
                <Pressable
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
                            fontFamily: "Rajdhani-Bold"
                        }}
                    >
                        Login
                    </Text>

                </Pressable>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14, marginTop: 6 }}>Oder Login mit</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>


                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>oogle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Noch kein Account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Registrieren</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login