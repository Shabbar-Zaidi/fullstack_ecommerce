import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); // login, signup, otp, reset
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{currentState === "Login" ? "Login" : "Sign Up"}</p>
        <hr className="w-8 border-none h-[1.5px] bg-gray-700" />
      </div>
      {currentState === "Login" ? "" : <input className="w-full px-3 py-2 border border-gray-800" type="text" placeholder="Name" required />}

      <input className="w-full px-3 py-2 border border-gray-800" type="email" placeholder="Email" required />
      
      
      <div className="relative w-full">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
      />
      <span
        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p className="cursor-pointer" onClick={() => setCurrentState("Sign Up")}>
            Create new account
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => setCurrentState("Login")}>
            Already have an account?
          </p>
        )}
      </div>
      <button className="py-2 mt-4 bg-black px-8 text-white">{currentState === "Login" ? "Login" : "Sign Up"}</button>
    </form>
  );
};

export default Login;
