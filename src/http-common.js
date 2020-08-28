import axios from "axios";
const token = JSON.parse(localStorage.getItem('user'))['accessToken']


console.log(token)
export default axios.create({
  baseURL: "http://localhost:5000/usuarios",
  headers: {
    "Content-type": "application/json",
    "Authorization": 'Bearer ' + token
  }
});