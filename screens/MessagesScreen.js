import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { firestore, auth } from "../firebase";

export default function MessagesPage({ navigation }) {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      });
  }, []);

  const getUsers = async () => {
    if (!user) return;
    const chatQuerySnap = await firestore.collection("Chats").get();
    const chatIds = chatQuerySnap.docs.map((doc) => doc.id);
    const idsarray = [];
    const arrayids = [];
    for (let i in chatIds) {
      idsarray.push(chatIds[i]);
      let temporar = chatIds[i].split("-");
      if (
        temporar[0] === auth.currentUser.uid ||
        temporar[1] === auth.currentUser.uid
      ) {
        arrayids.push(temporar[0]);
        arrayids.push(temporar[1]);
      }
    }
    if (arrayids.length > 0) {
      const querySnap = await firestore
        .collection("users")
        .where("userId", "in", arrayids)
        .where("userId", "!=", auth.currentUser.uid)
        .get();
      const allUsers = querySnap.docs.map((doc) => doc.data());
      const sortedUsers = await Promise.all(
        allUsers.map(async (a) => {
          const chatida =
            a.userId > auth.currentUser.uid
              ? auth.currentUser.uid + "-" + a.userId
              : a.userId + "-" + auth.currentUser.uid;
          const cola = await firestore.collection("Chats").doc(chatida).get();
          const locatieUser = await firestore
            .collection("users")
            .doc(cola.data().whosent)
            .get();
          const numeleUserului = locatieUser.data().firstname;
          return {
            ...a,
            da: cola.data().da,
            ultimMesaj: cola.data().msg,
            deLa: numeleUserului,
          };
        })
      ).then((allUsers) =>
        allUsers.sort((a, b) => b.da.seconds - a.da.seconds)
      );
      setUsers(sortedUsers);
    } else {
      setUsers(null);
    }
  };

  const isFocused = useIsFocused();

  const isFocusedRef = useRef(false);
  const handleFocus = () => {
    isFocusedRef.current = true;
  };
  const handleBlur = () => {
    isFocusedRef.current = false;
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", handleFocus);
    const unsubscribeBlur = navigation.addListener("blur", handleBlur);

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocusedRef.current) {
      getUsers();
      setRefreshing(false);
    }
  }, [isFocusedRef.current, user, refreshing]);

  const Refresher = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Messages</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={Refresher} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { id: item.userId })}
          >
            <View style={styles.card}>
              <View style={styles.imageArea}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                  source={{ uri: item.pfp }}
                />
              </View>
              <View style={styles.textArea}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.firstname + " " + item.lastname}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  {item.deLa + ": " + item.ultimMesaj}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  header: {
    width: "100%",
    backgroundColor: "#2490ef",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 20,
  },
  card: {
    marginTop: 10,
    width: "100%",
    height: 80,
    flexDirection: "row",
    //backgroundColor: "blue",
    //alignItems: "center",
    //justifyContent: "center",
    borderRadius: 5,
  },
  textArea: {
    width: "60%",
    //salignItems: "center",
    justifyContent: "center",
  },
  imageArea: {
    width: "20%",
    //backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  ultimaOra: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
