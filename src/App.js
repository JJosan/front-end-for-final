import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import RedirectPage from './Components/RedirectPage/RedirectPage'
import MainPage from './Components/MainPage/MainPage';
import ShoppingPage from './Components/ShoppingPage/ShoppingPage';
import MyNavbar from './Components/MyNavbar/MyNavbar.js';

function App() {
  
  return (
    <div className='app'>
      <MyNavbar />
      <Routes>
        <Route path="/" element={ <RedirectPage /> }/>
        <Route path='/mainpage' element={ <MainPage  /> } />
        <Route path='/shoppingpage' element={ <ShoppingPage testID="" /> } /> 
      </Routes>
      
    </div>
  );
}

export default App;
