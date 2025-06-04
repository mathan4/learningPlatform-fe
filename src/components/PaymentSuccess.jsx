import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import lessonServices from "../services/lessonService";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const lessonId = sessionStorage.getItem("pendingLesson");
        
        if (!lessonId) {
          console.error("No pending lesson found");
          toast.error("No pending lesson found. Please contact support.");
          navigate("/dashboard", { replace: true });
          return;
        }

        console.log("Processing successful payment for lesson:", lessonId);
        console.log("Stripe session ID:", sessionId);

        // Schedule the Zoom meeting
        await lessonServices.scheduleZoomMeeting(lessonId);
        
        // Clean up session storage
        sessionStorage.removeItem("pendingLesson");
        
        console.log("Zoom meeting scheduled successfully");
        toast.success("Payment successful! Lesson booked and meeting scheduled.");
        
      } catch (error) {
        console.error("Error processing successful payment:", error);
        toast.error("Payment was successful, but there was an issue scheduling your lesson. Please contact support.");
      } finally {
        setIsProcessing(false);
        // Add delay to ensure toast is visible before navigation
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      }
    };

    handleSuccess();
  }, [navigate, sessionId]);

  // Show loading state while processing
  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Setting up your lesson and scheduling meeting...</p>
          {sessionId && (
            <p className="text-sm text-gray-500 mt-2">Session: {sessionId.slice(-8)}</p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;