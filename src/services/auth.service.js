import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

class AuthService {
  /* Peticion al backend para iniciar sesion */
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  /* Cierra sesion */
  logout() {
    localStorage.removeItem('user');
  }

  /* Peticion con axios para crear un nuevo 
  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }*/
}

export default new AuthService();