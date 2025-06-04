// api/Api.ts
import axios from 'axios';
// import { BASE_URL } from '@/contans/env';
const Api = axios.create({
    // baseURL: BASE_URL,
    baseURL: 'https://newsapi.org/v2/',
});
export default Api;
