import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";

const ChatsScreen = ({navigation}) => {
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
            <Text style={styles.welcomeFont}>Chats, {userData.firstname}!</Text>
            <Button title="Inapoi" onPress={()=>{navigation.navigate("Login")}}></Button>
        </SafeAreaView>
    )
}

export default ChatsScreen

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
    bottomButtons: {
        backgroundColor: "#0782F9",
        borderTopWidth: 1,
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    bottomImgs: {
        width: 45,
        height: 45,
        resizeMode: "stretch",
    }
})