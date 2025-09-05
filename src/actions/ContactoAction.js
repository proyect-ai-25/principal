import HttpCliente from "../service/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const actualizarContacto = async (id, contacto) => {
  return new Promise((resolve) => {
    HttpCliente.put(`/api/contacto/${id}`, contacto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarContacto = async (contacto) => {
  return new Promise((resolve) => {
    instancia
      .post("/api/contacto", contacto)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getAllContactos = (request) => {
  return new Promise((resolve) => {
    instancia
      .get(
        `/api/contacto?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}&estado=${request.estado}&sort=${request.sort}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getContactos = (request) => {
  return new Promise((resolve) => {
    instancia
      .get(
        `/api/contacto?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}&estado=${request.estado}&sort=${request.sort}&tipo=${request.tipo}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getContacto = (id) => {
  return new Promise((resolve) => {
    instancia
      .get(`/api/contacto/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
