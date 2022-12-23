import React, { useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image, ScrollView, StatusBar, Platform, FlatList } from "react-native";
import { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";

import CardAnunt from "../cards/OthersProfileAnuntCard";
import { useRoute } from "@react-navigation/native";

const OthersProfileScreen = ({navigation, ownerId}) => {
    const [otherUserData, setData] = useState('');
    const [posts, setPosts] = useState([]);

    const route = useRoute();

    useEffect(() => {
        firestore.collection("users")
        .doc(route.params.ownerId).get()
        .then(snapshot => {
            if(snapshot.exists){
                setData(snapshot.data());
            }
        });
    });

    useEffect(() => {
        firestore.collection("books")
        .onSnapshot(querrySnapshot => {
          const tempPosts = [];
    
          querrySnapshot.forEach(documentSnapshot => {
              const buffer = documentSnapshot.data();
              if(buffer.ownerID === route.params.ownerId){
                tempPosts.push({
                  ...buffer
                });
              }
          });
    
          setPosts(tempPosts);
        });
      }, []);

    return (
        <SafeAreaView style={styles.cotainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={()=>{}}>
                        <Image style={styles.pfp} source={{uri: otherUserData.pfp}}/>
                    </TouchableOpacity>

                    <Text style={styles.name}>{otherUserData.firstname} {otherUserData.lastname}</Text>
                </View>

                <FlatList 
                    style={{marginBottom: 100, marginTop: 10}}
                    contentContainerStyle={{marginBottom:100}}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={{alignItems:"center", padding: 10}}>
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
    )
}

export default OthersProfileScreen

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight, 
        //justifyContent: "center",
        //alignItems: "center",
    },
    topContainer:{
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
        color: "white",
        left: 10,
        top: -5,
    },
    pfp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: "#07d9f9",
        borderWidth: 2
    },
    button:{
        backgroundColor: "#5792F9",
        width: "50%",
        left: "25%",
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        elevation: 10,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})