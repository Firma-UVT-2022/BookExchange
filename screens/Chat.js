import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firestore, auth, firebase } from "../firebase";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native";

export default function ChatScreen() {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const route = useRoute();

  const [user, setUser] = useState("");

  const [destUserData, setDestUser] = useState([]);

  const currUserId = auth.currentUser.uid;
  const destUserId = route.params.id;

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

    firestore
      .collection("users")
      .doc(destUserId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setDestUser(snapshot.data());
        }
      });
  }, []);

  const onSend = (msgArray) => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: currUserId,
      sentTo: destUserId,
      createdAt: new Date(),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, usermsg)
    );
    const chatid =
      destUserId > currUserId
        ? currUserId + "-" + destUserId
        : destUserId + "-" + currUserId;
    firestore
      .collection("Chats")
      .doc(chatid)
      .collection("messages")
      .add({ ...usermsg });
    firestore
      .collection("Chats")
      .doc(chatid)
      .set({ da: new Date(), msg: msg.text, whosent: msg.user._id });
  };

  const getAllMessages = async () => {
    const chatid =
      destUserId > currUserId
        ? currUserId + "-" + destUserId
        : destUserId + "-" + currUserId;
    const msgResponse = await firestore
      .collection("Chats")
      .doc(chatid)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .get();
    const allTheMsgs = msgResponse.docs.map((doc) => {
      return {
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      };
    });
    setMessages(allTheMsgs);
  };

  useEffect(() => {
    getAllMessages();
    const chatid =
      destUserId > currUserId
        ? currUserId + "-" + destUserId
        : destUserId + "-" + currUserId;
    const unsubscribe = firestore
      .collection("Chats")
      .doc(chatid)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          };
        });
        setMessages(newMessages);
      });

    // Unsubscribe from updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name={"arrow-back-outline"} size={40} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("OthersProfile", { ownerId: destUserId }) }}>
          <Text style={styles.name}>{destUserData.firstname} {destUserData.lastname}</Text>
        </TouchableOpacity>
      </View>

      <GiftedChat
        style={{ flex: 1 }}
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: currUserId,
          avatar: user.pfp,
        }}
        onPressAvatar={() => { navigation.navigate("OthersProfile", { ownerId: destUserId }) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    backgroundColor: "#2490ef",
    padding: 10,
    alignItems: "center",
    //justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 20,
    flexDirection: "row",
  },
  name: {
    fontSize: 25,
    fontWeight: "500",
    left: 10,
    top: 0,
  },
})