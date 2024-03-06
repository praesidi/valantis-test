import axios from 'axios';
import generateAuthToken from '@/utils/generateAuthToken';
import { API_URL, API_PASSWORD } from '@/variables';

const api = axios.create({
	baseURL: API_URL,
	timeout: 8000,
	headers: {
		'X-Auth': generateAuthToken(API_PASSWORD),
		'Content-Type': 'application/json;charset=utf-8',
	},
});

export default api;
