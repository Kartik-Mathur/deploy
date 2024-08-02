import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test-ochre-six-90.vercel.app/',
    withCredentials: true
});


export default instance;