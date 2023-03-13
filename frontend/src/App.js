import React, { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/header/Header.js";
import { Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/footer/Footer';
import Home from './component/home/Home.js';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products.js';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <>
      <Header />
      
      {/* <Routes>
        <Route extact path='/' element={<Home />} />
        <Route extact path='/product/:id' element={<ProductDetails />} />
        <Route extact path='/products' element={<Products />} />
      </Routes> */}

      <Footer />
    </>
  );
}

export default App;
