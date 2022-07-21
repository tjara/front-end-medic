import { api } from "./axiosConfig";

export const loginUser = async (userData: Object) => {
    try {
        const response = await api.post('/data/users/login/', userData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}