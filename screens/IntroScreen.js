import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";

const IntroScreen = ({navigation}) => {

    setTimeout(() => {
        navigation.navigate("Login");
       }, 1800); 

    return (
        <View style={styles.cotainer}>
            <Image source={require("../assets/splashScreen.png")} style={{width: "100%", resizeMode: "contain"}}/>
        </View>
    )
}

export default IntroScreen

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