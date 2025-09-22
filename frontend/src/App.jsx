import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { ShopContext } from "./context/ShopContext";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Verify from "./pages/Verify";

const App = () => {
  const { token } = useContext(ShopContext);
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-slate-900 dark:text-white">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/orders" element={token ? <Orders /> : <Login />} />
        <Route path="/verify" element={token ? <Verify /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
