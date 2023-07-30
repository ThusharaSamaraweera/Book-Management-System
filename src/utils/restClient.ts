import axios from "axios";
export const BASE_URL = "http://localhost:8080/v1";

export enum HTTPS_METHODS {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
}

export const restClient = async (method: HTTPS_METHODS, url: string, body = {}, contentType = "application/json") => {
  const token = sessionStorage.getItem("token");

  return await axios({
    method,
    baseURL: `${BASE_URL}`,
    url,
    data: body,
    headers: {
      "auth-token": `Bearer ${token}`,
      Accept: contentType,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
