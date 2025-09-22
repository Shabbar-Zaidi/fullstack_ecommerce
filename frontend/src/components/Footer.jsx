import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="w-32 mb-5" src={assets.logo} alt="image" />
          <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos cum quisquam quibusdam vitae. Facere saepe deserunt, ratione</p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/"><li>Home</li></Link>
            <Link to="/collection"><li>Collection</li></Link>
            <Link to="/about"><li>About Us</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-132-145</li>
            <li>info@example.com</li>
            <li>123 Main St, Anytown, USA</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center m-auto">© 2025 forever.com - All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
