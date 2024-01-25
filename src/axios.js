import axios from "axios";

const instance=axios.create({
    baseURL:"https://restro-app-usf0.onrender.com/"
});
export default instance;