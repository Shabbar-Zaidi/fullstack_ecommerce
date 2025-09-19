import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";


const Product = ({}) => {
  const { productId } = useParams();
  // console.log(productId)

  const { products, currency, addToCart, getCartCount } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img key={index} src={item} alt={`Product Image ${index + 1}`} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" onClick={() => setImage(item)} />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w3" />
            <img src={assets.star_icon} alt="" className="w3" />
            <img src={assets.star_icon} alt="" className="w3" />
            <img src={assets.star_icon} alt="" className="w3" />
            <img src={assets.star_dull_icon} alt="" className="w3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${size === item ? "border-orange-500" : ""}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Add to cart */}
          <button onClick={() => addToCart(productData.id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 flex-col flex mt-8">
            <p>100% Original product</p>
            <p>Free delivery on orders over $50</p>
            <p>Easy 30 days returns and exchanges</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum exercitationem, quis perferendis nam vitae in consequatur odit officia sit libero. Non esse mollitia, quos deserunt quas dolore culpa dolor nostrum?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, eius aut delectus, ratione tempora quam veniam ab sed sapiente minus eligendi consequuntur quisquam similique aspernatur deleniti iste, ducimus quibusdam placeat. Quod eveniet vel voluptas nulla non laboriosam porro error eius assumenda distinctio magnam, rerum labore aut odit. Exercitationem nam pariatur eligendi eius.</p>
        </div>
      </div>

      {/* Display related projects */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
