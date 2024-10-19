import axios from "axios";

const BASE_URL = 'http://localhost:5000/'

export const jobseekerLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}jobseeker/login`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const jobseekerRegister = async (payload) => {
    console.log("inside post")
    try {
        const response = await axios.post(`${BASE_URL}jobseeker/register`, payload)
        return response.data
    } catch (err) {
        console.error(err)
    }
}


export const jobseekerDetails = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}jobseekerdetails`, { headers: payload })
        return response.data
    } catch (err) {
        console.error(err)
    }
}