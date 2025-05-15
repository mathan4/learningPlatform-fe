import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectEmail, selectPassword, setEmail, setPassword } from "../redux/features/loginSlice";
import authServices from "../services/authServices";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const LoginPage = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    authServices.login({ email, password })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(setEmail(""));
        dispatch(setPassword(""));
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Login to MentorBridge
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full p-3 bg-white/10 border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="w-full p-3 bg-white/10 border border-white/20 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-3 rounded-full font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
