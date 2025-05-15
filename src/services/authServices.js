
import  { authInstance } from "./instance";

const authServices = {
   
    register: async (userData) => {
        return await authInstance.post('/auth/register', userData);
    },
    login: async (userData) => {
        return await authInstance.post('/auth/login', userData);
    },
    logout: async () => {
        return await authInstance.post('/auth/logout');
    },
    me: async () => {
        return await authInstance.get('/auth/me');
    }
}

export default authServices;