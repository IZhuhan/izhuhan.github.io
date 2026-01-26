import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const res = await axios.get('/users');
  return res.data;
}