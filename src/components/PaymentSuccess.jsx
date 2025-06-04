import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment successful! Lesson booked.");
    navigate("/dashboard", { replace: true });
  }, []);

  return null;
};

export default PaymentSuccess;
