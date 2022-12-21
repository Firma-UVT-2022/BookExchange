import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

export function Header({ bookName }) {
  return (
    <View style={styles.header}>
      <View style={styles.header_parteImagine}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/207/207114.png",
          }}
        />
      </View>
      <View style={styles.header_parteText}>
        <Text style={styles.book_title}>{bookName}</Text>
      </View>
    </View>
  );
}

export function ImagineCarte({ imgurl }) {
  return (
    <View style={styles.parte_imagine}>
      <Image
        style={{ width: "20%", height: 100 }}
        source={require("../assets/arrow_dreapta.png")}
      />
      <View style={styles.imagine_carte}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: imgurl,
          }}
        />
      </View>
      <Image
        style={{ width: "20%", height: 100 }}
        source={require("../assets/arrow_stanga.png")}
      />
    </View>
  );
}

export function Chenare({ numeAutor, genCarte }) {
  return (
    <View style={styles.rand_chenare}>
      <View style={styles.chenar}>
        <View style={styles.chenar_icon}>
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1948/1948164.png",
            }}
          />
        </View>
        <View style={styles.chenar_text}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{numeAutor}</Text>
        </View>
      </View>
      <View style={styles.chenar}>
        <View style={styles.chenar_icon}>
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5766/5766921.png",
            }}
          />
        </View>
        <View style={styles.chenar_text}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{genCarte}</Text>
        </View>
      </View>
    </View>
  );
}

export function User({ numeUser, pfpOwner }) {
  return (
    <View style={styles.user_rand}>
      <View style={styles.user_chenar}>
        <View style={styles.imagine_profil_user}>
          <View style={styles.stil_imgprofil}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: pfpOwner,
              }}
            />
          </View>
        </View>
        <View style={styles.numeUser_parte}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{numeUser}</Text>
        </View>
      </View>
    </View>
  );
}

export function DetaliiCarte({
  imgCarte,
  numeAutor,
  genCarte,
  numeUser,
  pfpOwner,
  locatie,
}) {
  return (
    <View style={styles.detalii}>
      <View style={styles.rand_centru}>
        <Locatie locatie={locatie} />
      </View>
      <ImagineCarte imgurl={imgCarte} />
      {/* <View style={{ height: 10 }}></View> */}
      <Chenare numeAutor={numeAutor} genCarte={genCarte} />
      {/* <View style={{ height: 10 }}></View> */}
      <User numeUser={numeUser} pfpOwner={pfpOwner} />
    </View>
  );
}

export function Locatie({ locatie }) {
  return (
    <View style={styles.locatie_container}>
      <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/9203/9203728.png",
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "500" }}>{locatie}</Text>
    </View>
  );
}

export default function BookPage({
  numeCarte,
  imgCarte,
  numeAutor,
  genCarte,
  numeUser,
  pfpOwner,
  locatie,
  ownerID,
}) {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header bookName={route.params.numeCarte}></Header>
      {/* <View style={{ height: "5%" }}></View> */}
      <DetaliiCarte
        imgCarte={route.params.imgCarte}
        numeAutor={route.params.numeAutor}
        genCarte={route.params.genCarte}
        numeUser={route.params.numeUser}
        pfpOwner={route.params.pfpOwner}
        locatie={route.params.locatie}
      />
      {/* <View style={{ height: "5%" }}></View> */}
      <TouchableOpacity
        style={styles.buton_mesaj}
        onPress={() => {
          navigation.navigate("Chat", { id: route.params.ownerID });
        }}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png",
          }}
        ></Image>
        <View style={{ width: 10 }}></View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Message User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#5792F9",
    width: "100%",
    height: "10%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 10,
  },
  header_parteText: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  header_parteImagine: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  book_title: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  detalii: {
    justifyContent: "space-evenly",
    width: "95%",
    height: "70%",
    backgroundColor: "#87a0f5",
    borderRadius: 15,
    elevation: 10,
  },
  buton_mesaj: {
    marginBottom: 10,
    flexDirection: "row",
    width: "50%",
    height: "10%",
    backgroundColor: "#5792F9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 10,
    padding: 5,
  },
  parte_imagine: {
    flexDirection: "row",
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  imagine_carte: {
    width: "50%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 4,
    overflow: "hidden",
  },
  rand_chenare: {
    flexDirection: "row",
    width: "100%",
    height: "12%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  chenar: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#9aa5fc",
    elevation: 5,
  },
  chenar_icon: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chenar_text: {
    width: "75%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  user_rand: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  user_chenar: {
    flexDirection: "row",
    width: "90%",
    height: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#9aa5fc",
    elevation: 5,
  },
  imagine_profil_user: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stil_imgprofil: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    overflow: "hidden",
  },
  numeUser_parte: {
    width: "75%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  locatie_container: {
    flexDirection: "row",
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#87a0f5",
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
  },
  rand_centru: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
});