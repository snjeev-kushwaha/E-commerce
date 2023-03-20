import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDER_FAIL,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../constants/orderConstants';
import axios from 'axios';
import config from '../config';

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const configs = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`${config.URL}/order/new`, order, configs)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// MY Order
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_SUCCESS })

        const { data } = await axios.get(`${config.URL}/order/me/my`)
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get Order Details 
export const getorderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`${config.URL}/order/${id}`)

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
};