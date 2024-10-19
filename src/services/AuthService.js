import axios from "axios";

const BASE_URL = 'http://localhost:5000/'

export const clientLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}client/login`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const clientRegister = async (payload) => {
    console.log("inside post")
    try {
        const response = await axios.post(`${BASE_URL}client/register`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const getUserDetails = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}userdetails`, { headers: payload })
        return response.data
    } catch (err) {
        console.error(err)
    }
}