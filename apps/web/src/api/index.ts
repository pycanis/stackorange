import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL
})