import axios from "axios";
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          // console.log("cartItems[items][item]: ", cartItems[items][item]);
          // console.log("items: ", items);
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            // console.log("itemInfo", itemInfo);

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];

              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log("Order Items:", orderItems);
      // console.log("Cart Items:", cartItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          // Cash on Delivery
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: {
              token: token,
            },
          });
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          // Stripe Payment
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
            headers: {
              token: token,
            },
          });
          if (responseStripe.data.success) {
            const session_url = responseStripe.data.session_url;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error preparing order items:", error);
      toast.error("Failed to prepare order items. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            id="firstName"
            placeholder="First Name"
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
        <input onChange={onChangeHandler} value={formData.email} name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" id="email" placeholder="Email Address" />
        <input onChange={onChangeHandler} value={formData.street} name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" id="street" placeholder="Street Address" />
        <div className="flex gap-3">
          <input onChange={onChangeHandler} value={formData.city} name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" id="city" placeholder="City" />
          <input onChange={onChangeHandler} value={formData.state} name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" id="state" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} value={formData.zipCode} name="zipCode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" id="zipCode" placeholder="ZipCode" />
          <input onChange={onChangeHandler} value={formData.country} name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" id="country" placeholder="Country" />
        </div>
        <input onChange={onChangeHandler} value={formData.phone} name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" id="phone" placeholder="Phone" />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-blue-500" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-blue-500" : ""}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-blue-500" : ""}`}></p>
              <p className="">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="cursor-pointer bg-black text-white py-3 px-16 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
