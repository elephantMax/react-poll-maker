import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import store from './store'
import { Provider } from 'react-redux'
import 'firebase/auth'
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyAFqP1uB0mBL5jjv8f2fJBbxLsdOgXju_k",
  authDomain: "poll-maker-585a7.firebaseapp.com",
  databaseURL: "https://poll-maker-585a7-default-rtdb.firebaseio.com",
  projectId: "poll-maker-585a7",
  storageBucket: "poll-maker-585a7.appspot.com",
  messagingSenderId: "1089980979398",
  appId: "1:1089980979398:web:5dfdbe1849d31d5cca5fc7"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
})


