import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View
        , Image } from "react-native";
import { useState } from "react";
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        let threwError = false;
        await auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            threwError = true;
        });

        if(!threwError)
        {
            if(!auth.currentUser.emailVerified){
                alert("Verify your email to continue");
            }
            else{
                navigation.navigate("Tabs");
            }
        }
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
        >
            <Image source={require("../assets/logo.png")}/>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                    onPress={() => {navigation.navigate("Register")}}
                    style={{margin: 15}}
                >
                    <Text style={styles.signUpText}>Create a new account</Text>
                </TouchableOpacity>
                
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
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
    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonOutLineText:{
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
    signUpText: {
        color: "#0872F9",
        fontWeight: "320",
        fontSize: 16,
    },
})