import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    const lessonId = sessionStorage.getItem("pendingLesson");
    await lessonServices.scheduleZoomMeeting(lessonId);
    sessionStorage.removeItem("pendingLesson");
  }


  useEffect(() => {
    toast.success("Payment successful! Lesson booked.");
    navigate("/dashboard", { replace: true });
  }, []);

  return null;
};

export default PaymentSuccess;
