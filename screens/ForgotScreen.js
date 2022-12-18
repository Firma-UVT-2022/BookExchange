import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from "react-native";
import { useState, useEffect } from "react";

import * as Animatable from 'react-native-animatable';
import { auth } from "../firebase";

const ForgotScreen = ({navigation}) => {
   
    const [email, setEmail] = useState('');

    const handleForgot = async () => {
        let threwError = false;
        await auth.sendPasswordResetEmail(email).catch((error) => {threwError = true; alert(error.message)});
        if(!threwError){
            alert("Change password email sent!");
            navigation.navigate("Login");
        }
    }

    return (
        <KeyboardAvoidingView style={styles.cotainer}>
            <Animatable.Text style={{fontSize: 22, marginBottom: 20, fontWeight: "300"}} animation="bounceInDown">Forgot your password?</Animatable.Text>

            <View style={styles.inputContainer}>
                <Animatable.View animation="bounceInRight" duration={1800}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                </Animatable.View>
            </View>

            <Animatable.View style={styles.buttonContainer} animation="fadeIn" duration={1800}>
                <TouchableOpacity 
                    onPress={handleForgot}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Send email</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}

export default ForgotScreen

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button:{
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})