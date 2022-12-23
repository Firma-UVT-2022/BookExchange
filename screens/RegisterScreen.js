import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";

import { auth } from "../firebase";
import { firestore } from "../firebase";

import * as Animatable from 'react-native-animatable';

const HomeScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFName] = useState('');
    const [lastname, setLName] = useState('');

    const handleSignUp = () => {
        if(firstname.length === 0) { alert("Please enter your first name"); return; }
        if(lastname.length === 0) { alert("Please enter last name"); return; }
        if(email.length === 0) { alert("Please enter your email"); return; }
        if(password.length === 0) { alert("Please enter your password"); return; }

        let signUpError = false;

        auth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            signUpError = true;
        })
        .then(() => {
            if(!signUpError){
                auth.currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    //url: "https://bookexchange-d2fd4.firebaseapp.com"
                    url: "https://book-exchange-3ce95.firebaseapp.com"
                })
                .then(() => {
                    alert("Verification email sent");
                });
            }
        })
        .then(() => {
            firestore.collection("users")
                .doc(auth.currentUser.uid).set({
                    userId: auth.currentUser.uid,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    pfp: "https://firebasestorage.googleapis.com/v0/b/bookexchange-d2fd4.appspot.com/o/pfps%2Fdefaultpfp.jpg?alt=media&token=2f420b16-28bc-4fb3-9bc9-fbae069da98f",
                })
            .catch(error => {
                alert(error.message);
            })
        })
        
        auth.signOut();
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <Animatable.Text style={styles.headerText} animation="bounceInDown">Create a new account</Animatable.Text>

            <Animatable.View style={styles.inputContainer} animation="wobble" duration={2000}>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    value={firstname}
                    onChangeText={text => setFName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    value={lastname}
                    onChangeText={text => setLName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
            </Animatable.View>

            <Animatable.View style={styles.buttonContainer} animation="rubberBand">
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 35,
        marginBottom: 55,
        fontWeight: "100",
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
        marginTop: 45,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})