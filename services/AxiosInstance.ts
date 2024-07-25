import axios from 'axios';
import https from 'https'

const AxiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default AxiosClient;