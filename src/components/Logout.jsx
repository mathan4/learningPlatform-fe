import { useEffect } from "react";
import { useNavigate } from "react-router";
import authServices from "../services/authServices";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    authServices
      .logout()
      .then(() => {
        toast.success("Logged out successfully");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
