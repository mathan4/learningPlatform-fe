import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import courseServices from "../services/courseService";

const PaymentSuccessCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const courseId = sessionStorage.getItem("pendingCourse");

        if (!courseId) {
          toast.error("Missing course info. Please contact support.");
          return navigate("/dashboard", { replace: true });
        }

        // Optionally confirm payment session with backend here

        sessionStorage.removeItem("pendingCourse");
        toast.success("Payment complete! You're now enrolled.");
      } catch (error) {
        console.error("Error after payment:", error);
        toast.error("Payment succeeded but enrollment failed. Please contact support.");
      } finally {
        setIsProcessing(false);
        setTimeout(() => navigate("/dashboard", { replace: true }), 2000);
      }
    };

    handleSuccess();
  }, [navigate, sessionId]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Finalizing your enrollment...</p>
          {sessionId && (
            <p className="text-sm text-gray-500 mt-2">Session: {sessionId.slice(-8)}</p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccessCourse;
