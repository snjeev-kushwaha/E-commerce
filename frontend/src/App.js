import React, { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/header/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from 'webfontloader'


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
