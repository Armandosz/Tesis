import http from "../http-common";

class TutorialDataService {
  getAll(config) {
    return http.get("http://localhost:5000/inventario/",config);
  }
  
  getAllUsers(config) {
    return http.get("http://localhost:5000/usuarios/",config);
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  singIn(user) {
    return http.post("http://localhost:5000/api/auth/signin",user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(nombre) {
    return http.get(`/tutorials?title=${nombre}`);
  }
}

export default new TutorialDataService();
