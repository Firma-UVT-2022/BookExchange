import { GiftedChat } from 'react-native-gifted-chat'
import { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { firestore, auth, firebase } from '../firebase';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const route = useRoute();

    const [user, setUser] = useState('');

    useEffect(() => {
        firestore.collection("users")
            .doc(auth.currentUser.uid).get()
            .then(snapshot => {
                if (snapshot.exists) {
                    setUser(snapshot.data())
                }
            })
    }, [])

    const currUserId = auth.currentUser.uid
    const destUserId = route.params.id
    const onSend = (msgArray) => {
        const msg = msgArray[0];
        const usermsg = {
            ...msg,
            sentBy: currUserId,
            sentTo: destUserId,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, usermsg))
        const chatid = destUserId > currUserId ? currUserId + "-" + destUserId : destUserId + "-" + currUserId
        firestore.collection('Chats')
            .doc(chatid)
            .collection('messages')
            .add({ ...usermsg });
        firestore.collection('Chats')
            .doc(chatid)
            .set({ da: new Date() });
    }

    const getAllMessages = async () => {
        const chatid = destUserId > currUserId ? currUserId + "-" + destUserId : destUserId + "-" + currUserId
        const msgResponse = await firestore.collection('Chats')
            .doc(chatid)
            .collection('messages')
            .orderBy('createdAt', "desc")
            .get()
        const allTheMsgs = msgResponse.docs.map(doc => {
            return {
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate()
            }
        })
        setMessages(allTheMsgs)
    }

    useEffect(() => {
        getAllMessages()
    }, []);

    return (
        <GiftedChat
            style={{ flex: 1 }}
            messages={messages}
            onSend={text => onSend(text)}
            user={{
                _id: currUserId,
                avatar: user.pfp,
            }}
        />
    )
}

