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
  FlatList,
  StatusBar
} from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";

import CardAnunt from "../cards/FeedAnuntCard";

const HomeScreen = ({ navigation }) => {
  const [userData, setData] = useState("");
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    firestore.collection("books")
    .onSnapshot(querrySnapshot => {
      const tempPosts = [];

      querrySnapshot.forEach(documentSnapshot => {
          const buffer = documentSnapshot.data();
          tempPosts.push({
              ...buffer
          });
      });

      setPosts(tempPosts);
    });
  }, []);


  return (
    <View style={styles.cotainer}>
      <View style={styles.topBar}>
          <Text style={{fontSize: 30, fontWeight: "400"}}>Feed</Text>
      </View>

      <FlatList 
          style={{marginBottom: 100, marginTop: 10}}
          data={posts}
          renderItem={({item}) => (
            <View style={{alignItems:"center", padding: 10}}>
              <CardAnunt
                numeCarte={item.bookName}
                numeAutor={item.authorName}
                genCarte={item.genre}
                imageuri={item.imgUrl}
                numeUser={item.ownerName}
                navigation={navigation}
              />
            </View>
            )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cotainer: {
    paddingTop: StatusBar.currentHeight, 
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
  topBar:{
    width: "100%",
    backgroundColor: "#5792F9",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
