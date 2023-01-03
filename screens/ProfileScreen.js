import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";

import { firestore } from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";

import Ionicons from "react-native-vector-icons/Ionicons";

import { RefreshControl } from "react-native";

import CardAnunt from "../cards/ProfileAnuntCard";

const ProfileScreen = ({ navigation }) => {
  const [userData, setData] = useState("");
  const [posts, setPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [changedPfp, setChanged] = useState(false);

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
    setChanged(false);
  }, [changedPfp]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("books")
      .where("ownerID", "==", auth.currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const tempPosts = [];
        querySnapshot.forEach((doc) => {
          tempPosts.push(doc.data());
        });
        setPosts(tempPosts);
      });

    return () => unsubscribe();
  }, []);

  let imguri = null;

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        imguri = result.assets[0].uri;
        await uploadImage();
      }
    } else {
      alert("E nevoie de permisiuni");
    }
  };

  const uploadImage = async () => {
    let filename = userData.userId;

    const response = await fetch(imguri);
    const blob = await response.blob();

    let ref = storage.ref().child("pfps/" + userData.userId);
    await ref.put(blob);

    const newPfpURL = await storage.ref("pfps/" + filename).getDownloadURL();

    await firestore
      .collection("users")
      .doc(userData.userId)
      .update({ pfp: newPfpURL });
    changedPfpFunc();
  };

  const changedPfpFunc = () => {
    setChanged(true);
  };

  return (
    <SafeAreaView style={styles.cotainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.pfp} source={{ uri: userData.pfp }} />
        </TouchableOpacity>

        <Text style={styles.name}>
          {userData.firstname} {userData.lastname}
        </Text>

        <TouchableOpacity
          onPress={() => {
            auth.signOut();
            navigation.navigate("Login");
          }}
          style={styles.logOut}
        >
          <Ionicons name={"log-out-outline"} size={45} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Add");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add a new book!</Text>
      </TouchableOpacity>

      <FlatList
        style={{ marginBottom: 100, marginTop: 10 }}
        contentContainerStyle={{ marginBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={changedPfp} onRefresh={changedPfpFunc} />
        }
        data={posts}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", padding: 10 }}>
            <CardAnunt
              numeCarte={item.bookName}
              numeAutor={item.authorName}
              genCarte={item.genre}
              imageuri={item.imgUrl}
              numeUser={item.ownerName}
              bookId={item.postId}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    //justifyContent: "center",
    //alignItems: "center",
  },
  topContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: "#2490ef",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
    left: 10,
    top: -5,
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
  },
  logOut: {
    position: "absolute",
    right: 15,
    top: 25,
  },
  button: {
    backgroundColor: "#5792F9",
    width: "50%",
    left: "25%",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
