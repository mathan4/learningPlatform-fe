import { authInstance } from "./instance";


const reviewService = {
    createReview: async (data) => {
        return await authInstance.post('/reviews', data);
    },
    getReviews: async (mentorId) => {
        return await authInstance.get(`/reviews/mentor/${mentorId}`);
    }
}

export default reviewService