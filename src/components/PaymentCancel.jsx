import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleCancel = async () => {
   const lessonId= sessionStorage.getItem("pendingLesson");
   await lessonServices.cancelLesson(lessonId)
   sessionStorage.removeItem("pendingLesson");
  }; // cancelLesson

  useEffect(() => {
    
    handleCancel()
    toast.error("Payment was cancelled.");
    navigate("/dashboard", { replace: true });
  }, []);

  return null;
};

export default PaymentCancel;
