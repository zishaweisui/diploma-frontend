import axios from "axios";
// import serviceAuth from "services/auth";
import store from "store";

const makeRequest = ({ headers = {}, ...config }) =>
  axios({
    ...config,
    url: process.env.REACT_APP_API_URL + config.url,
    headers: {
      ...headers,
      Authorization: `Token ${store.getState().auth.access}`,
      "Content-Type": "application/json",
    },
  })
    .then(({ data }) => data)

const post = async (url, data = {}, params = {}) =>
  makeRequest({ method: "POST", url, data, params });

const get = async (url, params) => makeRequest({ method: "GET", url, params });

const service = {
  post,
  get,
};

export default service;
