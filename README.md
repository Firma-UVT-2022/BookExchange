## Book Exchange
BookExchange is a mobile application built with React Native and Expo that enables book enthusiasts to exchange books they've read with 
other books they'd like to read. It utilizes Firebase as a backend service to store and retrieve data.

## Features
- User authentification: Users can sign up and login to th app using their email and passwod
- User profile: Users can edit their profile by adding a profile picture
- Book posting: Users can post books they've read by adding the book title, author, genre and a photo of the book cover
- Book searching: You can find books for your liking by scrolling through your feed, and if that is too much, you can apply different filters to help you find a nice book faster
- Chatting: Users can chat with other users to establish details of the exchange

## Get it running:
To get thhis project to work, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/en/) and [ExpoCLI](https://docs.expo.dev/workflow/expo-cli/) installed
2. Clone the repository:
```
git clone https://github.com/Firma-UVT-2022/BookExchange
```
3. Install the required packages:
```
npm install
```
4. Set up your own Firebase account and modify the firebase.js with your own and also make sure to add your Firebase details into RegisterScreen.js and ForgotScreen.js
5. Start the app by running:
```
npm start
```

Great! Now you can either get the app on your own phone or use an emulator
