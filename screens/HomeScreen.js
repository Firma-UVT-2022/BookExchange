import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";

import CardAnunt from "../cards/FeedAnuntCard";

const HomeScreen = ({ navigation }) => {
  const [userData, setData] = useState("");

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });
  }, []);

  return (
    // <SafeAreaView style={styles.cotainer}>
    //     <Text style={styles.welcomeFont}>Salut, {userData.firstname}!</Text>
    //     <Button title="Inapoi" onPress={()=>{navigation.navigate("Login")}}></Button>

    // </SafeAreaView>
    <View style={styles.cotainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <CardAnunt
          numeCarte="JFK"
          numeAutor="Stephen King"
          genCarte="Drama"
          numeUser="Sebastian Bitica"
          imageuri="https://imagini.printrecarti.ro/images/products/originals/141/stephen-king-jfk_141248.jpg"
          navigation={navigation}
        />
        <View style={{ height: 30 }} />
        <CardAnunt
          numeCarte="Interpretarea Viselor"
          numeAutor="Sigmund Freud"
          genCarte="Scientific"
          numeUser="Todea Tudor"
          imageuri="https://i.ytimg.com/vi/OtS9pVQ_eZk/hqdefault.jpg"
          navigation={navigation}
        />
        <View style={{ height: 30 }} />
        <CardAnunt
          numeCarte="Biblia"
          numeAutor="Dumnezeu"
          genCarte="Religioasa"
          numeUser="Calin Bordeanu"
          imageuri="https://edituraagapis.ro/wp-content/uploads/2021/05/carti-agapis-mock-up-personal-biblia-.jpeg"
          navigation={navigation}
        />
        <View style={{ height: 30 }} />
        <CardAnunt
          numeCarte="A tour of C++"
          numeAutor="Bjarne Stroustrup"
          genCarte="Programare"
          numeUser="Bonchis Cosmin"
          imageuri="https://di2ponv0v5otw.cloudfront.net/posts/2022/02/10/620532ec800f64ea3b2b0e77/m_620532f3c693bdca6fb23279.jpg"
          navigation={navigation}
        />
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
  welcomeFont: {
    fontSize: 20,
    fontWeight: "200",
  },
  scroll: {
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: 100,
  },
});
