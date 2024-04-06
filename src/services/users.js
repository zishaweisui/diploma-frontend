import serviceApi from "./api";
import store from "store"
import { setTokens } from "slicers/auth";

const all = () => serviceApi.get('all_users')

// const all = () => {
//   return Promise.resolve( [
//     { id: 1, profile: { last_name: 'Snow', first_name: 'Jon' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 2, profile: { last_name: 'Lannister', first_name: 'Cersei' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 3, profile: { last_name: 'Lannister', first_name: 'Jaime' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 4, profile: { last_name: 'Stark', first_name: 'Arya' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 5, profile: { last_name: 'Targaryen', first_name: 'Daenerys' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 6, profile: { last_name: 'Melisandre', first_name: null }, email: "first@email.com", nickname: "snowjon" },
//     { id: 7, profile: { last_name: 'Clifford', first_name: 'Ferrara' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 8, profile: { last_name: 'Frances', first_name: 'Rossini' }, email: "first@email.com", nickname: "snowjon" },
//     { id: 9, profile: { last_name: 'Roxie', first_name: 'Harvey' }, email: "first@email.com", nickname: "snowjon" },
//   ])
// }

const getMe = () => serviceApi.get("me");

// const getMe = () => {
//   return Promise.resolve( [
//     { id: 1, profile: { last_name: 'Snow', first_name: 'Jon' }, email: "first@email.com", nickname: "snowjon" }
//   ])
// }


const update = (email, nickname, first_name, last_name, id) => {
  const data = {
    email,
    nickname,
    profile: {
      first_name,
      last_name,
    },
  };
  return serviceApi.put(`users/${id}`, data);
};


// const update = () => {
//   return Promise.resolve( [
//     { id: 1, profile: { last_name: 'Snow', first_name: 'Jon' }, email: "first@email.com", nickname: "snowjon" }
//   ])
// }


const _delete = (id) => serviceApi.delete(`users/${id}`);

const updatePassword = (old_password, new_password, id) => serviceApi.post(`users/${id}/change_password`, { old_password, new_password })
  .then((data) => {
  store.dispatch(setTokens({ 
    access: data.access_token,
    refresh: data.refresh_token 
  }))
})

const service = {
  all,
  getMe,
  update,
  delete: _delete,
  updatePassword,
}

export default service
