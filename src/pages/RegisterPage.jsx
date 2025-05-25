import { useDispatch, useSelector } from "react-redux";
import authServices from "../services/authServices";
import { toast } from "react-toastify";
import {
  selectFirstName,
  selectLastName,
  setFirstName,
  setLastName,
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../redux/features/registerSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    authServices
      .register({ firstName,lastName, email, password })
      .then((response) => {
        toast.success(response.data.message);

        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blackCustom via-indigoCustom to-blackCustom flex items-center justify-center text-white px-4">
       <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full max-w-mdbackdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md shadow-2xl"
            >
      <div className="">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            className="bg-white/20 placeholder-white text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={firstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            className="bg-white/20 placeholder-white text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={lastName}
            onChange={(e) => dispatch(setLastName(e.target.value))}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="bg-white/20 placeholder-white text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-white/20 placeholder-white text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button
            type="submit"
            className=" bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg mt-2 transition-all duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-200 underline hover:text-white">
            Login here
          </Link>
        </p>
      </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
