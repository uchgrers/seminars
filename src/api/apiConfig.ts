import axios from "axios";

export const baseRequestParams = axios.create({
    withCredentials: true
})

export const seminarsURL = '/seminars'