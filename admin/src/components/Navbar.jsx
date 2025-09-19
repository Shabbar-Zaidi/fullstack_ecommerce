import { assets } from "../assets/assets.js";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="flex justify-between items-center py-2 px-[4%] shadow-md">
      <img className="w-[140px]" src={assets.logo} alt="" />
      <button onClick={handleLogout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
