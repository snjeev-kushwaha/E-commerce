import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import './dashboard.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/ProductAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUser } from '../../actions/UserAction';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    // const { orders } = useSelector((state) => state.getAllOrders)
    // const { users } = useSelector((state) => state.getAllUser)


    let outofStock = 0;
    products && products.forEach((item) => {
        if (item.stock === 0) {
            outofStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());

        dispatch(getAllOrders())

        dispatch(getAllUser())
    }, [dispatch]);

    const options1 = {
        title: "TOTAL AMOUNT",
        pieHole: 0.4,
        is3D: false,
    }

    // const data = [outofStock, products.length - outofStock];
    const data = [outofStock, 20000];
    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <div className='dashboard'>
            <Sidebar />

            <div className='dashboardContainer'>
                <Typography component="h1">Dashboard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br /> ₹2000
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <span>Product</span>
                            <span>{products && products.length}</span>
                        </Link>
                        <Link to="/admin/orders">
                            <span>Orders</span>
                            {/* <span>{orders && orders.length}</span> */}
                        </Link>
                        <Link to="/admin/users">
                            <span>Users</span>
                            {/* <span>{users && users.legendToggle}</span> */}
                        </Link>
                    </div>
                </div>

                <Chart
                    chartType="ScatterChart"
                    data={[["", ""], ["Initial Amount", 0], ["Amount Earned", 2000]]}
                    width="80%"
                    height="400px"
                    // margin="auto"
                    legendToggle
                    options={options1}
                />

                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />

            </div>
        </div>
    )
}

export default Dashboard