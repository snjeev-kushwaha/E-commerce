import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import SpeedDial from '@mui/material/SpeedDial';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../actions/UserAction';

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
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
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions