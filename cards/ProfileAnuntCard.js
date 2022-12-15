import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
  } from "react-native";
  
  const icon_writer = "https://cdn-icons-png.flaticon.com/512/1948/1948210.png";
  const icon_booktype = "https://cdn-icons-png.flaticon.com/512/5768/5768762.png";
  const icon_user = "https://cdn-icons-png.flaticon.com/512/3078/3078882.png";
  
  export function Imagine_Carte({ img_url }) {
    return (
      <View style={styles.la_img}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={{
              uri: img_url,
            }}
          ></Image>
        </View>
      </View>
    );
  }
  
  export function Rand_Date({ iconuri, detailName }) {
    return (
      <View style={styles.rand_date}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri: iconuri,
          }}
        ></Image>
        <View style={styles.pt_designbar}>
          <ImageBackground
            style={styles.designbar_properties}
            source={require("../assets/restu_design.png")}
          >
            <Text style={styles.detalii_text_properties}>{detailName}</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
  
  export function Detalii_Carte({ numecarte, numeautor, gencarte, numeuser }) {
    return (
      <View style={styles.details_container}>
        <View style={styles.title_text_container}>
          <Text style={styles.title_text_properties}>{numecarte}</Text>
        </View>
        <Rand_Date iconuri={icon_writer} detailName={numeautor} />
        <Rand_Date iconuri={icon_booktype} detailName={gencarte} />
      </View>
    );
  }
  
  export default function CardAnunt({
    numeCarte,
    numeAutor,
    genCarte,
    imageuri,
    numeUser,
    navigation,
    undeNavighez,
  }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        {/*pe ce pagina intri dupa ce apesi anuntul*/}
        <Imagine_Carte img_url={imageuri} />
        {/*asta e partea cu imaginea cartii ce o sa fie uploadata de user*/}
        <Detalii_Carte
          numecarte={numeCarte}
          numeautor={numeAutor}
          gencarte={genCarte}
          numeuser={numeUser}
        />
        {/*asta e partea cu detaliile despre carte*/}
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      width: "90%",
      height: 200,
      backgroundColor: "#7088e6",
      borderRadius: 15,
      elevation: 10,
      padding: 10,
      justifyContent: "space-between",
    },
    la_img: {
      alignItems: "center",
      justifyContent: "center",
      width: "35%",
      height: "100%",
      //backgroundColor: "black",
    },
    image_container: {
      width: "80%",
      height: "80%",
      borderRadius: 10,
      borderWidth: 2,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    details_container: {
      width: "65%",
      height: "100%",
      borderRadius: 10,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    rand_date: {
      flexDirection: "row",
      width: "100%",
      height: "20%",
      borderRadius: 5,
      justifyContent: "space-between",
    },
    pt_designbar: {
      width: "85%",
      height: "100%",
      alignItems: "flex-end",
    },
    title_text_container: {
      width: "100%",
      height: "25%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: "#749efc",
    },
    title_text_properties: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#08021a",
      fontStyle: "italic",
    },
    designbar_properties: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    detalii_text_properties: {
      fontWeight: "bold",
      color: "white",
    },
  });
  