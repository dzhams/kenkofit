import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../colors/colors';
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import axios from 'axios';

const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = () => {
        // Check if email is empty
        if (!email.trim()) {
            Alert.alert('E-Mail address is required.');
            return;
        }

        // Check if email contains '@' and '.'
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Please enter a valid email.');
            return;
        }

        // Check if password is at least 8 characters long
        if (password.length < 8) {
            Alert.alert('Password must be at least 8 characters.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match.');
            return;
        }

        // If all checks pass, proceed with registration
        const user = {
            name,
            email,
            password,
        };

        axios
            .post('http://192.168.0.16:3000/register', user)
            .then((response) => {
                console.log(response);
                Alert.alert("Registrierung erfolgreich");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                Alert.alert("Fehler beim Registrieren");
                console.log("fehler", error);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 2 }}>
                    <AntDesign onPress={() => navigation.goBack()} name="back" size={26} color="black" style={{ marginTop: 15 }} />
                    <Text style={{
                        fontSize: 30,
                        color: COLORS.black,
                        fontFamily: "Rajdhani-Bold",
                    }}>
                        Account erstellen
                    </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Name</Text>
                    <View
                        style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}
                    >
                        <Ionicons
                            style={{ position: "absolute", left: 4 }}
                            name="person"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder="Name"
                            placeholderTextColor={COLORS.black}
                            style={{ width: "100%", marginLeft: 32, fontSize: name ? 16 : 16 }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 8 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email Addresse</Text>

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
                            placeholder="E-Mail"
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{ width: "100%", marginLeft: 32 }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 8 }}>
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
                            placeholder="Passwort"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{ width: "100%", marginLeft: 32 }}
                            value={password}
                            onChangeText={text => setPassword(text)}

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
                <View style={{ marginBottom: 8 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Passwort bestätigen</Text>
                    <View
                        style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}
                    >
                        <AntDesign
                            style={{ position: "absolute", left: 4 }}
                            name="lock"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            placeholder="Passwort bestätigen"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{ width: "100%", marginLeft: 32 }}
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
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
                <Pressable
                    onPress={handleRegister}
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
                        Registrieren
                    </Text>

                </Pressable>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Oder einloggen mit</Text>

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
                                marginRight: 4
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{ fontFamily: "Rajdhani-Bold", fontSize: 20 }}>oogle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 12
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Du hast schon ein Account?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6,
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup