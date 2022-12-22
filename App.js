import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddBookScreen from "./screens/AddBookScreen";
import BookPage from "./screens/BookPage";
import FilterPage from "./screens/FilterPage";
import IntroScreen from "./screens/IntroScreen";
import ForgotScreen from "./screens/ForgotScreen";
import MessagesPage from "./screens/MessagesScreen";
import ChatScreen from "./screens/Chat";
import OthersProfileScreen from "./screens/OthersProfileScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Intro"
          component={IntroScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Forgot"
          component={ForgotScreen}
        />
        <Stack.Screen name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Add"
          options={{ headerShown: false }}
          component={AddBookScreen}
        />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen 
          name="OthersProfile"
          options={{ headerShown: false }}
          component={OthersProfileScreen}
        />
        <Stack.Screen
          name="BookPage"
          options={{ headerShown: false }}
          component={BookPage}
        />
        <Stack.Screen
          name="Filter"
          options={{ headerShown: false }}
          component={FilterPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          height: "10%",
          left: 22,
          right: 22,
          bottom: 16,
          borderRadius: 16,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let icoName;

          if (route.name === "Home") {
            icoName = focused ? "home" : "home-outline";
          } else if (route.name === "Chats") {
            icoName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Profile") {
            icoName = focused ? "person" : "person-outline";
          } else if (route.name === "AddBookTab") {
            icoName = "add-circle";
          }

          return <Ionicons name={icoName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={MessagesPage} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
