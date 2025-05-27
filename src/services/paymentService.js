import { authInstance } from "./instance";


const paymentService = {
    createPaymentIntent: async (data) => {
        return await authInstance.post('/payments/create-payment-intent', data);
    },
}

export default paymentService