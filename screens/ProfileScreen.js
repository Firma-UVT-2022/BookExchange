import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";

const ProfileScreen = ({navigation}) => {
    const [userData, setData] = useState('');
    
    useEffect(() => {
        firestore.collection("users")
        .doc(auth.currentUser.uid).get()
        .then(snapshot => {
            if(snapshot.exists){
                setData(snapshot.data())
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.cotainer}>
            <Text style={styles.welcomeFont}>Profil, {userData.firstname}!</Text>
            <Button title="Inapoi" onPress={()=>{navigation.navigate("Login")}}></Button>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeFont: {
        fontSize: 20,
        fontWeight: "200",
    },
})