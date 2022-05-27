
import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import ShoppingPage from './Components/ShoppingPage/ShoppingPage';
import MyNavbar from './Components/MyNavbar/MyNavbar.js';

const tempID = "628c6c0f3b8adbfca80804b9"

const apiVersion = "v1"

const test = () => {
  console.log("host new group")
  fetch(`http://localhost:3000/api/${apiVersion}/trips/add`,{
    method: "POST"
})
.then(response => {
  response.json().then((data) => {
      console.log(JSON.stringify(data.ID))
      document.getElementById("joinID").innerText=`Join ID: ${data.ID}`;
  }).catch((err) => {
      console.log(err)
  })
})
}

const signIn = () => {
  fetch("signin")
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res}))
    .catch(err => 
      console.log(err))
}

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={ <MainPage  /> } />
        <Route path='/shoppingpage' element={ <ShoppingPage testID="" /> } /> 
      </Routes>
      
    </div>
  );
}

export default App;
