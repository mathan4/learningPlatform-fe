import { authInstance } from "./instance";


const paymentService = {
    createCheckoutSession: async (data) => {
        return await authInstance.post('/payments/checkout-session', data);
    },
}

export default paymentService