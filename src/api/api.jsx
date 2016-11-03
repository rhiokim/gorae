import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.__API__}/api/`
});

export const api = axios.create({
  baseURL: process.env.__API__
});
