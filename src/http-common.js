import axios from "axios";
//const token = localStorage.getItem("accessToken");
//const TOKEN = 'Token';


export default axios.create({
  baseURL: "http://localhost:5000/pedidos",
  headers: {
    "Content-type": "application/json",
  //  "Authorization": 'Bearer ' + token
  }
});