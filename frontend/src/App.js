import React, { useEffect, useState } from 'react';
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
import ConfirmOrder from './component/cart/ConfirmOrder';
import axios from 'axios';
import config from './config';
import Payment from './component/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/cart/OrderSuccess';
import MyOrders from './component/order/MyOrders';
import OrderDetails from './component/order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const data = await axios.get(`${config.URL}/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
    console.log(data.data, "data")
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
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

        <Route extact path='/order/confirm' element={<Protected Component={ConfirmOrder} />} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route extact path='/process/payment' element={<Protected Component={Payment} />} />
          </Elements>
        )}

        <Route extact path='/success' element={<Protected Component={OrderSuccess} />} />

        <Route extact path='/orders' element={<Protected Component={MyOrders} />} />

        <Route extact path='/order/:id' element={<Protected Component={OrderDetails} />} />

        {/* ///////////////////////// Admin Dashboard Routes  //////////////////////////////////////////// */}

        <Route isAdmin={true} extact path='/admin/dashboard' element={<Protected Component={Dashboard} />} />
        {/* <Route extact path='/admin/dashboard' element={<Protected isAdmin={true} Component={Dashboard} />} /> */}

        <Route isAdmin={true} extact path='/admin/products' element={<Protected Component={ProductList} />} />

        <Route isAdmin={true} extact path='/admin/product' element={<Protected Component={NewProduct} />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
