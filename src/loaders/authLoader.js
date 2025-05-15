import authServices from "../services/authServices";

const authLoader = async () => {
    try {
        const response = await authServices.me();
        return response.data;
    } catch (error) {
        return null;
    }
}

export default authLoader;