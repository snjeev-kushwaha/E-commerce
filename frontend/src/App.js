import React, { useEffect } from 'react';
import './App.css';
import Header1 from "./component/layout/header/Header1";
import { Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
import Footer from './component/layout/footer/Footer';
import Home from './component/home/Home';
import ProductDetails from './component/product/ProductDetails';
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignup from './component/user/LoginSignup';
import store from './store';
import { loadUser } from './actions/UserAction';
import UserOptions from './component/layout/header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/user/Profile';
// import ProtectedRoute from './component/route/ProtectedRoute';
import Protected from './component/route/ProtectedRoute';
import UpdateProfile from './component/user/UpdatePofile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)

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

        <Route extact path='/account' element={<Protected Component={Profile} />} />

        <Route extact path='/me/update' element={<Protected Component={UpdateProfile} />} />

        <Route extact path='/password/update' element={<Protected Component={UpdatePassword} />} />

        <Route extact path='/password/forgot' element={<ForgotPassword />} />

        <Route extact path='/password/reset/:token' element={<ResetPassword />} />

        <Route extact path='/cart' element={<Cart />} />

        <Route extact path='/shipping' element={<Protected Component={Shipping} />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
