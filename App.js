import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatsScreen from './screens/ChatsScreen';
import AddBookScreen from './screens/AddBookScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Add" options={{headerShown: false}} component={AddBookScreen} />
        <Stack.Screen name="Tabs" options={{headerShown: false}} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs()
{
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({route}) => ({
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

        tabBarIcon: ({color, size, focused}) => {
          let icoName;

          if(route.name === "Home"){
            icoName = focused ? "home" : "home-outline";
          } else if(route.name === "Chats"){
            icoName = focused ? "chatbox" : "chatbox-outline";
          } else if(route.name === "Profile"){
            icoName = focused ? "person" : "person-outline";
          } else if(route.name === "AddBookTab"){
            icoName = "add-circle";
          }

          return <Ionicons name={icoName} color={color} size={size}/>
        },
      })}
    >
      <Tab.Screen name = "Home" component={HomeScreen} />
      <Tab.Screen name = "Chats" component={ChatsScreen} />
      <Tab.Screen name = "Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}