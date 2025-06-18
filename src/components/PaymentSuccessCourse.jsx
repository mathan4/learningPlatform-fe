import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import courseServices from "../services/courseService";  // Assuming courseService exists

const PaymentSuccessCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const courseId = sessionStorage.getItem("pendingCourse");

        if (!courseId) {
          console.error("No pending course found");
          toast.error("No pending course found. Please contact support.");
          navigate("/dashboard", { replace: true });
          return;
        }

        console.log("Processing successful payment for course:", courseId);
        console.log("Stripe session ID:", sessionId);

        // Enroll the student in the course
        await courseServices.enrollStudentInCourse(courseId);

        // Clean up session storage
        sessionStorage.removeItem("pendingCourse");

        console.log("Student successfully enrolled in the course");
        toast.success("Payment successful! You are now enrolled in the course.");

      } catch (error) {
        console.error("Error processing successful payment:", error);
        toast.error("Payment was successful, but there was an issue enrolling you in the course. Please contact support.");
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
          <p className="text-gray-600">Enrolling you in the course...</p>
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
