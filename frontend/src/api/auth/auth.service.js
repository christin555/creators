import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${process.env['REACT_APP_API_HOST']}/auth`;
const baseQuery = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
        ...authHeader(),
    },
});

class AuthService {
    login({ email, password }) {
        return baseQuery
            .post('/login', { email, password })
            .then(({ data }) => data);
    }

    logout() {
        return baseQuery.post('/logout', {}).then(({ data }) => data);
    }

    register({ email, password, roleTypeId }) {
        return baseQuery
            .post('/register', { email, password, roleTypeId })
            .then(({ data }) => data);
    }

    getCurrentUser() {
        return baseQuery.get('/getCurrentUser').then(({ data }) => data);
    }
}

export default new AuthService();
