import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import courseServices from "../services/courseService";  // Assuming courseService exists

const PaymentCancelCourse = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCancel = async () => {
      try {
        const courseId = sessionStorage.getItem("pendingCourse");

        if (courseId) {
          console.log("Cancelling course:", courseId);
          await courseServices.cancelCourse(courseId);  // Call the course cancellation service
          sessionStorage.removeItem("pendingCourse");
          console.log("Course cancelled successfully");
        } else {
          console.log("No pending course found to cancel");
        }

        toast.error("Payment was cancelled. Your course booking has been removed.");

      } catch (error) {
        console.error("Error cancelling course:", error);
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

export default PaymentCancelCourse;
