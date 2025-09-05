import HttpCliente from "../service/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const actualizarPropiedad = async (id, propiedad) => {
  return new Promise((resolve) => {
    HttpCliente.put(`/api/propiedad/${id}`, propiedad)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarPropiedad = async (propiedad) => {
  console.log("llega propiedad", propiedad);
  return new Promise((resolve) => {
    instancia
      .post("/api/propiedad", propiedad)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getAllPropiedads = (request) => {
  console.log("request", request);
  return new Promise((resolve) => {
    instancia
      .get(
        `/api/propiedad?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}&estado=${request.estado}&sort=${request.sort}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getPropiedads = (request) => {
  console.log("request", request);
  return new Promise((resolve) => {
    instancia
      .get(
        `/api/propiedad?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}&estado=${request.estado}&sort=${request.sort}&terrenoApto=${request.terrenoApto}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getPropiedad = (id) => {
  return new Promise((resolve) => {
    instancia
      .get(`/api/propiedad/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
