import React, { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/header/Header.js";
import { Route, Routes } from "react-router-dom";
import WebFont from 'webfontloader'
import Footer from './component/layout/footer/Footer'
import Home from './component/home/Home.js'

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
        <Routes>
          <Route extact path='/' element={<Home />} />
        </Routes>

        <Footer />
    </>
  );
}

export default App;
