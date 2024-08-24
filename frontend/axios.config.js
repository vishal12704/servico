import axios from "axios";
const hostname = 'http://localhost:8000';
axios.defaults.baseURL = hostname;
export default axios;