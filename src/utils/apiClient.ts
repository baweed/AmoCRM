import axios from 'axios';
import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const { SUBDOMAIN } = process.env;

const apiClient = axios.create({
  baseURL: `https://${SUBDOMAIN}.amocrm.ru`,
  timeout: 15000,
});

export default apiClient;