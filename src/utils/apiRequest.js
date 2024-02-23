import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api";

const ApiRequest = axios.create({
    baseURL: BACKEND_URL
});

export default ApiRequest;