import axios from 'axios';

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}?userId=${id}`);

const updateUser = (url, id, obj) => axios.put(`${url}?id=${id}`, obj);

const deleteUser = (url, id) => axios.delete(`${url}?id=${id}`);

export { getAll, getById, updateUser, deleteUser};
