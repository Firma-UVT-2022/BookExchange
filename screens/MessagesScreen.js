import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';

import { firestore, auth } from '../firebase';

export default function MessagesPage({ navigation }) {
    const [user, setUser] = useState('');
    const [users, setUsers] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [daca, setDaca] = useState(false);

    useEffect(() => {
        firestore.collection("users")
            .doc(auth.currentUser.uid).get()
            .then(snapshot => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                }
            })
    }, [])

    const getUsers = async () => {
        if (!user) return;
        const chatQuerySnap = await firestore.collection("Chats")
            .get();
        const chatIds = chatQuerySnap.docs.map(doc => doc.id);
        const idsarray = [];
        const arrayids = [];
        for (let i in chatIds) {
            idsarray.push(chatIds[i]);
            let temporar = chatIds[i].split("-");
            if (temporar[0] === auth.currentUser.uid ||
                temporar[1] === auth.currentUser.uid) {
                arrayids.push(temporar[0]);
                arrayids.push(temporar[1]);
            }
        }
        if (arrayids.length > 0) {
            const querySnap = await firestore.collection('users')
                .where("userId", "in", arrayids)
                .where("userId", "!=", auth.currentUser.uid)
                .get()

            const allUsers = querySnap.docs.map(doc => doc.data())
            const sortedUsers = await Promise.all(allUsers.map(async (a) => {
                const chatida = a.userId > auth.currentUser.uid ? auth.currentUser.uid + "-" + a.userId : a.userId + "-" + auth.currentUser.uid;
                const cola = await firestore.collection('Chats').doc(chatida).get();
                return { ...a, da: cola.data().da };
            })).then((allUsers) => allUsers.sort((a, b) => b.da.seconds - a.da.seconds))

            setUsers(sortedUsers);
        }
        else {
            setUsers(null);
        }
        if (users === null)
            setDaca(true);

    }
    useEffect(() => {
        getUsers()
        setRefreshing(false);
    }, [user, refreshing, daca])


    const Refresher = () => {
        setRefreshing(true);
    }

    //const chatid = users > currUserId ? currUserId + "-" + destUserId : destUserId + "-" + currUserId
    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.userId}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={Refresher} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Chat", { id: item.userId })}>
                        <View style={styles.card} >
                            <Image style={{ width: 30, height: 30 }} source={{ uri: item.pfp }} />
                            <View style={styles.textArea}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }} >{item.firstname + " " + item.lastname}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        paddingTop: 30,
    },
    card: {
        marginTop: 10,
        width: "95%",
        height: 50,
        flexDirection: "row",
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    textArea: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center"
    }
});