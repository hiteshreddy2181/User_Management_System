import axios from "axios";

const BASE_URL = 'http://localhost:5000/'

export const recruiterLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}recruiter/login`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const recruiterRegister = async (payload) => {
    console.log("inside post")
    try {
        const response = await axios.post(`${BASE_URL}recruiter/register`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const getRecruiterDetails = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}recruiterdetails`, { headers: payload })
        return response.data
    } catch (err) {
        console.error(err)
    }
}