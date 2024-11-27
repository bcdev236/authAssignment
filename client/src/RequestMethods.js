import axios from 'axios';

const BASE_URL = "https://auth-assignment-server-pi.vercel.app";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});