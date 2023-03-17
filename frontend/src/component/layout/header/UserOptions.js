import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import SpeedDial from '@mui/material/SpeedDial';
// import Backdrop from '@mui/material/Backdrop';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../actions/UserAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard },);
    }

    function dashboard() {
        navigate('/dashboard');
    }

    function orders() {
        navigate('/orders');
    }

    function account() {
        navigate('/account');
    }
    function cart() {
        navigate('/cart');
    }

    function logoutUser() {
        dispatch(logOut());
        alert.success("Logout Successfully");
    }
    return (
        <Fragment>
            {/* <Backdrop open={true} style={{ zIndex: "10" }} /> */}
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url}
                    alt='Profile'
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions