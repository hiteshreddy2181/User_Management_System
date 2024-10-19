import axios from "axios";

const BASE_URL = 'http://localhost:5000/'

export const adminLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}admin/login`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const addUser = async (payload) => {
    console.log("inside post")
    try {
        const response = await axios.post(`${BASE_URL}admin/add-user`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const getAdminDetails = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}admindetails`, { headers: payload })
        return response.data
    } catch (err) {
        console.error(err)
    }
}