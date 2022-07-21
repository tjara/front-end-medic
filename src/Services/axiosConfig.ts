import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});