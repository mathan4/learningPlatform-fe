// components/PaymentModal.jsx
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import Modal from "./Modal";
import paymentService from "../services/paymentService";

const Payment = ({ lesson, onClose, fetchLessons }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const paymentDetails = {
        studentId: lesson.studentId,
        mentorId: lesson.mentorId._id,
        amount: lesson.price, 
        lessonId: lesson._id,
      };

      const response = await paymentService.createPaymentIntent(paymentDetails);
     
      const { clientSecret } = response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        fetchLessons();
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Pay for Lesson</h2>
        <CardElement className="p-2 border rounded mb-4" />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handlePayment}
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : `Pay $${lesson.price}`}
        </button>
      </div>
    </Modal>
  );
};

export default Payment;
