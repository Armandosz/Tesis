import http from "../http-common";

class TutorialDataService {
  /* Peticion al servidor para obtener todos los inmuebles del excel */
  getAll(config) {
    return http.get("http://localhost:5000/inventario/",config);
  }
  /* Peticion al back para obtener todos los usuarios(Custodios) */
  getAllUsers(config) {
    return http.get("http://localhost:5000/usuarios/",config);
  }

  /* Se utiliza para crear una cuenta de usuario/custodio */
  singUp(data){
    return http.post("http://localhost:5000/api/auth/signup", data)
  }
  
  /* Se utiliza para actualizar la contraseña de un usuario */
  updateUser(id,data) {
    return http.put(`/${id}` ,data);
  }
 /*
  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }
  */

  /* Peticion para obtener el token al iniciar sesion
  singIn(user) {
    return http.post("http://localhost:5000/api/auth/signin",user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
 */

  

  /*
  logout() {
    localStorage.removeItem('user');
  }
  */

  /*
  update(id, data) {
    return http.put(`/${id}`, data);
  }
  */



  /*
  updatePassword(id,data) {
    return http.put(`/${id}` ,data);
  }
  */
  /*
  getGeneralPassword(id) {
    return http.get(`/${id}`);
  }
  */

  /*
  update2(id, data) {
    return http.put(`/${id}`, data);
  }
  */

  /*
  delete(id) {
    return http.delete(`/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }
  */
}

export default new TutorialDataService();
