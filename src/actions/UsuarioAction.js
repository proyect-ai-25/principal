import HttpCliente from "../service/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;


export const getUsuarioById = (id) => {
  return new Promise((resolve) => {
    instancia.get(`/api/usuario/account/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//export const agregarRole = (id, role, dispatch) => {
export const agregarRole = (id, role) => {
  return new Promise((resolve) => {
    HttpCliente.put(`/api/usuario/role/${id}`, role)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getUsuarios = (request) => {

  let url=`/api/usuario/pagination?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}`;
  if (request.local) {
    url += `&local=${request.local}`;
  }
  if (request.email) {
    url += `&email=${request.email}`;
  }
  console.log('uls', url)
  return new Promise((resolve) => {
    instancia.get(
      url
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

//export const actualizarUsuario = async (id, usuario, dispatch) => {
export const actualizarUsuario = async (id, usuario) => {
  return new Promise((resolve) => {
    instancia.put(`/api/usuario/actualizar/${id}`, usuario
    )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log('errpr', error)
        resolve(error.response);
      });
  });
};

//export const registrarUsuario = (usuario, dispatch) => {
export const registrarUsuario = (usuario) => {
  return new Promise((resolve) => {
    instancia
      .post("/api/usuario/registrar", usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.error("Error en registrarUsuario:", error);
        resolve(error.response);
      });
  });
};

//export const loginUsuario = (usuario, dispatch) => {
export const loginUsuario = (usuario) => {
  console.log('instancia', instancia)
  return new Promise((resolve) => {
    instancia
      .post("/api/usuario/login", usuario)
      .then((response) => {
        /*dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });*/
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getUsuario = (dispatch) => {
  return new Promise((resolve) => {
    HttpCliente.get("/api/usuario")
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });

        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
