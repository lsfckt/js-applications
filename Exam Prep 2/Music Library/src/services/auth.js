import { endpoints } from "./data.js";
import * as api from '../services/api.js';

export async function fetchLogin(data) {
    return api.post(endpoints.login, data);
}

export async function fetchRegister(data) {
    return api.post(endpoints.register, data);
}

export async function fetchLogout() {
    return api.get('/users/logout');
}
