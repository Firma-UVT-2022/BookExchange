import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button,
     TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from "react-native";
import { useState, useEffect } from "react";

import * as ImagePicker from 'expo-image-picker';
import { SelectList } from "react-native-dropdown-select-list";

import { firestore } from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";

const AddBookScreen = ({navigation}) => {
    const [userData, setData] = useState('');

    useEffect(() => {
        firestore.collection("users")
        .doc(auth.currentUser.uid).get()
        .then(snapshot => {
            if(snapshot.exists){
                setData(snapshot.data());
            }
        });
    }, []);

    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');

    const [county, setCounty] = useState('');
    const [genre, setGenre] = useState('');

    const [imguri, setImguri] = useState("https://firebasestorage.googleapis.com/v0/b/bookexchange-d2fd4.appspot.com/o/images%2FdefaultAddImg.png?alt=media&token=e864561a-52e0-4209-bc1b-528cfcbcf2bd");
    const [imgPicked, setImgPicked] = useState(false);

    const pickImage = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(granted){
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                //aspect: [4, 3],
                quality: 1,
            });
    
            if(!result.canceled){
                setImguri(result.assets[0].uri);
                setImgPicked(true);
            }
        } else {
            alert("E nevoie de permisiuni");
        }
    }

    const genres = [
        { key: '1', value: 'Fantasy' },
        { key: '2', value: 'Adventure' },
        { key: '3', value: 'Romance' },
        { key: '4', value: 'Mystery' },
        { key: '5', value: 'Horror' },
        { key: '6', value: 'Thriller' },
        { key: '7', value: 'Paranormal' },
        { key: '8', value: 'Science Fiction' },
        { key: '9', value: 'Art' },
        { key: '10', value: 'Self Development' },
        { key: '11', value: 'Health' },
        { key: '12', value: 'Travel' },
        { key: '13', value: 'Humor' },
        { key: '14', value: 'Guide' },
    ];

    const counties = [
        { key: '1', value: 'Alba' }, { key: '2', value: 'Arad' }, { key: '3', value: 'Arges' },
        { key: '4', value: 'Bacau' }, { key: '5', value: 'Bihor' }, { key: '6', value: 'Bistrita-Nasaud' },
        { key: '7', value: 'Botosani' }, { key: '8', value: 'Brasov' }, { key: '9', value: 'Braila' },
        { key: '10', value: 'Bucuresti' }, { key: '11', value: 'Buzau' }, { key: '12', value: 'Caras-Severin' },
        { key: '13', value: 'Calarasi' }, { key: '14', value: 'Cluj' }, { key: '15', value: 'Constanta' },
        { key: '16', value: 'Covasna' }, { key: '17', value: 'Dambovita' }, { key: '18', value: 'Dolj' },
        { key: '19', value: 'Galati' }, { key: '20', value: 'Giurgiu' }, { key: '21', value: 'Gorj' },
        { key: '22', value: 'Harghita' }, { key: '23', value: 'Hunedoara' }, { key: '24', value: 'Ialomita' },
        { key: '25', value: 'Iasi' }, { key: '26', value: 'Ilfov' }, { key: '27', value: 'Maramures' },
        { key: '28', value: 'Mehedinti' }, { key: '29', value: 'Mures' }, { key: '30', value: 'Neamt' },
        { key: '31', value: 'Olt' }, { key: '32', value: 'Prahova' }, { key: '33', value: 'Satu Mare' },
        { key: '34', value: 'Salaj' }, { key: '35', value: 'Sibiu' }, { key: '36', value: 'Suceava' },
        { key: '37', value: 'Teleorman' }, { key: '38', value: 'Timis' }, { key: '39', value: 'Tulcea' },
        { key: '40', value: 'Vaslui' }, { key: '41', value: 'Valcea' }, { key: '42', value: 'Vrancea' },
    ]

    const checkForErrors = () => {
        if(imgPicked == false){
            alert("Please upload a picture of your book");
            return false;
        }
        if(bookName.length == 0){
            alert("Please enter book name");
            return false;
        }
        if(authorName.length == 0){
            alert("Please author name");
            return false;
        }
        if(genre.length == 0){
            alert("Please enter book genre");
            return false;
        }
        if(county.length == 0){
            alert("Please enter your county");
            return false;
        }
        return true;
    }

    const postBook = async () => {
        if(!checkForErrors()) { return; }

        // upload book data
        const doc = await firestore.collection("books")
        .add({
            bookName: bookName,
            authorName: authorName,
            genre: genre,
            county: county,
            ownerID: userData.userId,
            ownerName: userData.firstname + "  " + userData.lastname,
        })
        .catch(error => {
           alert(error.message);
        })
        doc.update({postId: doc.id});
        
        // upload img
        const response = await fetch(imguri);
        const blob = await response.blob();

        let ref = storage.ref().child("images/" + doc.id);
        await ref.put(blob);

        let imgAddress = await storage.ref("images/" + doc.id).getDownloadURL();

        // update img url into database
        doc.update({imgUrl: imgAddress});

        navigation.navigate("Profile");
    }

    return (
        <KeyboardAvoidingView style={styles.cotainer}>

            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.imgContainer} onPress={pickImage}>
                    <Image style={styles.img} source={{uri: imguri}}/>
                </TouchableOpacity>
                <Text style={styles.textImg}>Tap to add an image of the book</Text>
            </View>


            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Book name"
                    value={bookName}
                    onChangeText={text => setBookName(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Author name"
                    value={authorName}
                    onChangeText={text => setAuthorName(text)}
                    style={styles.input}
                />
            </View>

            <View style={styles.dropDownContainer}>
                <SelectList 
                    boxStyles={{backgroundColor: "white"}}
                    dropdownStyles={{backgroundColor: "white", borderColor: "#2490ef"}}
                    setSelected={setGenre} 
                    save="value"
                    data={genres}
                    placeholder={"Select book genre"}
                />
                <SelectList 
                    boxStyles={{marginTop: 10, backgroundColor: "white"}}
                    dropdownStyles={{backgroundColor: "white", borderColor: "#2490ef"}}
                    setSelected={setCounty} 
                    save="value"
                    data={counties}
                    placeholder={"Select your county"}
                />
           </View>

           <TouchableOpacity 
                    onPress={postBook}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add a new book!</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}

export default AddBookScreen

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    
    topContainer:{
        width: "50%",
        alignItems: "center",
        marginBottom: 20,
    },
    imgContainer: {
        padding: 15,
        width: "80%",
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#2490ef",
        alignItems: "center",
    },
    img: {
        width: "100%",
        height: 180,
        resizeMode: "contain",
    },
    textImg: {
        marginTop: 3,
        fontWeight: "700",
        color: "#2490ef",
    },

    inputContainer: {
        width: "80%",
        marginTop: 5
    },
    input: {
        backgroundColor: "white",
        height: 50,
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    dropDownContainer: {
        width: "80%",
        paddingVertical: 15,
    },

    button:{
        backgroundColor: "#0782F9",
        width: "40%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        elevation: 20,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})