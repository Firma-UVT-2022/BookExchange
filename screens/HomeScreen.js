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
  StatusBar,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";

import CardAnunt from "../cards/FeedAnuntCard";
import BookPage from "./BookPage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { RefreshControl } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filtered, setFiltered] = useState(false);

  let county = null;
  let genre = null;

  if (route.params !== undefined) {
    county = route.params.county;
    genre = route.params.genre;
  }

  useEffect(() => {
    firestore.collection("books").onSnapshot((querrySnapshot) => {
      const tempPosts = [];
      querrySnapshot.forEach((documentSnapshot) => {
        const buffer = documentSnapshot.data();
        if (
          buffer.ownerID !== auth.currentUser.uid &&
          (buffer.county === county || county == null || county == "All counties") &&
          (buffer.genre === genre || genre == null || genre == "All genres")
        ) {
          tempPosts.push({
            ...buffer,
          });
        }
      });
      setPosts(tempPosts);
    });
    setFiltered("False");
  }, [county, genre, filtered]);

  const Filtrare = () => {
    setFiltered(true);
  };

  return (
    <SafeAreaView style={styles.cotainer}>
      <View style={styles.topBar}>
        <FeedName />
        <View style={styles.feed_filter}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter");
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2676/2676818.png",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{ marginBottom: 100, marginTop: 10 }}
        data={posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={Filtrare} />
        }
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", padding: 10 }}>
            <CardAnunt
              numeCarte={item.bookName}
              numeAutor={item.authorName}
              genCarte={item.genre}
              imageuri={item.imgUrl}
              numeUser={item.ownerName}
              navigation={navigation}
              pfpOwner={item.pfpOwner}
              locatie={item.county}
              ownerID={item.ownerID}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

export function FeedName() {
  return (
    <View style={styles.feed_name}>
      <Image
        style={{
          width: 40,
          height: 40,
        }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/5868/5868234.png",
        }}
      />
      <Text style={{ fontSize: 25, padding: 10, fontWeight: "bold", }}>
        Feed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  topBar: {
    width: "100%",
    backgroundColor: "#2490ef",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 20,
    flexDirection: "row",
  },
  feed_name: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  feed_filter: {
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
