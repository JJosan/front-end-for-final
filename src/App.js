import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import MainPage from './Components/MainPage/MainPage';
import ShoppingPage from './Components/ShoppingPage/ShoppingPage';
import MyNavbar from './Components/MyNavbar/MyNavbar.js';
import About from './Components/About/About';
import HowTo from './Components/HowTo/HowTo';
function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={ <MainPage  /> } />
        <Route path='/shoppingpage' element={ <ShoppingPage testID="" /> } /> 
        <Route path='/about' element={ <About/> } /> 
        <Route path='/HowTo' element={ <HowTo /> } /> 
      </Routes>
      
    </div>
  );
}

export default App;