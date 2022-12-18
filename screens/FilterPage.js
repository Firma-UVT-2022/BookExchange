import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import { useRoute, useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

const genres = [
  { key: "0", value: "All genres" },
  { key: "1", value: "Fantasy" },
  { key: "2", value: "Adventure" },
  { key: "3", value: "Romance" },
  { key: "4", value: "Mystery" },
  { key: "5", value: "Horror" },
  { key: "6", value: "Thriller" },
  { key: "7", value: "Paranormal" },
  { key: "8", value: "Science Fiction" },
  { key: "9", value: "Art" },
  { key: "10", value: "Self Development" },
  { key: "11", value: "Health" },
  { key: "12", value: "Travel" },
  { key: "13", value: "Humor" },
  { key: "14", value: "Guide" },
];

const counties = [
  { key: "0", value: "All counties" },
  { key: "1", value: "Alba" },
  { key: "2", value: "Arad" },
  { key: "3", value: "Arges" },
  { key: "4", value: "Bacau" },
  { key: "5", value: "Bihor" },
  { key: "6", value: "Bistrita-Nasaud" },
  { key: "7", value: "Botosani" },
  { key: "8", value: "Brasov" },
  { key: "9", value: "Braila" },
  { key: "10", value: "Bucuresti" },
  { key: "11", value: "Buzau" },
  { key: "12", value: "Caras-Severin" },
  { key: "13", value: "Calarasi" },
  { key: "14", value: "Cluj" },
  { key: "15", value: "Constanta" },
  { key: "16", value: "Covasna" },
  { key: "17", value: "Dambovita" },
  { key: "18", value: "Dolj" },
  { key: "19", value: "Galati" },
  { key: "20", value: "Giurgiu" },
  { key: "21", value: "Gorj" },
  { key: "22", value: "Harghita" },
  { key: "23", value: "Hunedoara" },
  { key: "24", value: "Ialomita" },
  { key: "25", value: "Iasi" },
  { key: "26", value: "Ilfov" },
  { key: "27", value: "Maramures" },
  { key: "28", value: "Mehedinti" },
  { key: "29", value: "Mures" },
  { key: "30", value: "Neamt" },
  { key: "31", value: "Olt" },
  { key: "32", value: "Prahova" },
  { key: "33", value: "Satu Mare" },
  { key: "34", value: "Salaj" },
  { key: "35", value: "Sibiu" },
  { key: "36", value: "Suceava" },
  { key: "37", value: "Teleorman" },
  { key: "38", value: "Timis" },
  { key: "39", value: "Tulcea" },
  { key: "40", value: "Vaslui" },
  { key: "41", value: "Valcea" },
  { key: "42", value: "Vrancea" },
];

export default function FilterPage() {
  const [county, setCounty] = useState(null);
  const [genre, setGenre] = useState(null);

  const navigation = useNavigation();

  const handleApplyFilter = () => {
    const selectedCounty = county;
    const selectedGenre = genre;
    //console.log(selectedCounty, selectedGenre);
    navigation.navigate("Home", {
      county: selectedCounty,
      genre: selectedGenre,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32, padding: 10, fontWeight: "300"}}>
        Filter books
      </Text>

      <View style={styles.dropDownContainer}>
        <SelectList
          boxStyles={{ backgroundColor: "white" }}
          dropdownStyles={{ backgroundColor: "white", borderColor: "#2490ef" }}
          setSelected={setGenre}
          onValueChange={(val) => setGenre(val)}
          save="value"
          data={genres}
          placeholder={"Pick a genre you like:"}
        />
        <SelectList
          boxStyles={{ marginTop: 10, backgroundColor: "white" }}
          dropdownStyles={{ backgroundColor: "white", borderColor: "#2490ef" }}
          setSelected={setCounty}
          onValueChange={(val) => setCounty(val)}
          save="value"
          data={counties}
          placeholder={"Select the county you are in:"}
        />
      </View>
      <View style={{ height: 20 }}></View>
      <TouchableOpacity style={styles.buton_mesaj} onPress={handleApplyFilter}>
        <Image
          style={{ width: 35, height: 35 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/7728/7728658.png",
          }}
        ></Image>
        <View style={{ width: 10 }}></View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Save Preferences
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownContainer: {
    width: "80%",
    paddingVertical: 15,
  },
  buton_mesaj: {
    flexDirection: "row",
    width: "70%",
    height: 80,
    backgroundColor: "#5792F9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 15,
    padding: 5,
  },
});
