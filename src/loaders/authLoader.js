import authServices from "../services/authServices";

const authLoader = async () => {
    try {
        const response = await authServices.me();
        const user= response.data
        return {user}
    } catch (error) {
        return null;
    }
}

export default authLoader;