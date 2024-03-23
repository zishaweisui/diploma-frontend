import serviceApi from "./api";
import store from "store"
import { setTokens, clearTokens } from "slicers/auth";

// const signIn = (email, password) => serviceApi.post("auth/login", { email, password }).then((data) => {
//   store.dispatch(setTokens({ access: data.access_token, refresh: data.refresh_token }))
// })

const signIn = () => store.dispatch(setTokens({ access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmYwYzY4NzUwZjhjYmI3MzhmY2FiMyIsInVzZXJfaWQiOiI2MTdmY2Q2M2Q5ZWQ0ZmIzNjQ1YjgzMWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTEyMTM2NzIuNzM4Njc3LCJleHAiOjE3MTEyMjA4NzIuNzM4Njc3LCJwdXJwb3NlIjoiYWNjZXNzIn0.FavnfFDuBeYUbS7gD43_G4tPw6fEyagIB4zso2h-nb8", refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmYwYzY4NzUwZjhjYmI3MzhmY2FiMyIsInVzZXJfaWQiOiI2MTdmY2Q2M2Q5ZWQ0ZmIzNjQ1YjgzMWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTEyMTM2NzIuNzM4ODUwOCwiZXhwIjoxNzI2NzY1NjcyLjczODg1MDgsInB1cnBvc2UiOiJyZWZyZXNoIn0.hezHccBoCz-QivmVF_Vz8HLejJZLlMFanKaMPQC6TgA" }))

// const signUp = async (email, password, nickname, firstName, lastName) => {
//   try {
//     await serviceApi.post("signup", { email, password, nickname, first_name: firstName, last_name: lastName })
//   } catch (e) {
//     return Promise.reject({})
//   }
//   return signIn(email, password)
// }

const signUp = signIn

// const signOut = () => serviceApi.post("auth/logout").then(() => store.dispatch(clearTokens()))

const signOut = () => store.dispatch(clearTokens())

const getValueFromTokenPayload = (token, key) => JSON.parse(atob(token.split(".")[1]))[key];

const getRole = () => store.getState().auth.access ? getValueFromTokenPayload(store.getState().auth.access, "role") : ""

const isAuthed = (token) => {
  if (!token) {
    return false;
  }
  return new Date() < new Date(getValueFromTokenPayload(token, "exp") * 1000);
};

const service = {
  signIn,
  signUp,
  signOut,
  getRole,
  isAuthed
};

export default service;
