import axios from "axios";

const BASE_URL = 'http://localhost:5000/'

export const studentLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}student/login`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const addStudent = async (payload) => {
    console.log("inside post")
    try {
        const response = await axios.post(`${BASE_URL}student/add-student`, payload)
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