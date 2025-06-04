import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCancel = async () => {
      try {
        const lessonId = sessionStorage.getItem("pendingLesson");
        
        if (lessonId) {
          console.log("Cancelling lesson:", lessonId);
          await lessonServices.cancelLesson(lessonId);
          sessionStorage.removeItem("pendingLesson");
          console.log("Lesson cancelled successfully");
        } else {
          console.log("No pending lesson found to cancel");
        }
        
        toast.error("Payment was cancelled. Your lesson booking has been removed.");
        
      } catch (error) {
        console.error("Error cancelling lesson:", error);
        toast.error("Payment was cancelled, but there was an issue cleaning up the booking. Please contact support if needed.");
      } finally {
        setIsProcessing(false);
        // Add a small delay to ensure toast is shown before navigation
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      }
    };

    handleCancel();
  }, [navigate]); // Add navigate to dependencies

  // Show loading state while processing
  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing cancellation...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentCancel;  