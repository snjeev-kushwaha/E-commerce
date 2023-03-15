import React, { useEffect } from 'react';
import './App.css';
import Header1 from "./component/layout/header/Header1.js";
import { Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/footer/Footer';
import Home from './component/home/Home.js';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products.js';
import Search from './component/product/Search.js';
import LoginSignup from './component/user/LoginSignup';
import store from './sotre';
import { loadUser } from './actions/UserAction';
import UserOptions from './component/layout/header/UserOptions.js';
import { useSelector } from 'react-redux';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <Header1 />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route extact path='/' element={<Home />} />
        <Route extact path='/product/:id' element={<ProductDetails />} />
        <Route extact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />

        <Route extact path='/search' element={<Search />} />
        <Route extact path='/login' element={<LoginSignup />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
