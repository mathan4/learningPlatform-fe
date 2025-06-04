import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment was cancelled.");
    navigate("/dashboard", { replace: true });
  }, []);

  return null;
};

export default PaymentCancel;
