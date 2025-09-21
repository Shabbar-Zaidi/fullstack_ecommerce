import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes)); // JSON.stringify to convert array to string
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });
      // console.log(response.data);
      if (response.data.success) {
        toast.success("Product added:", response.data.message);
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error("Error adding product:", response.data.message);
      }

    } catch (error) {
      console.error("Error:", error);
    }

    // console.log({ image1, image2, image3, image4, name, description, category, subCategory, price, sizes, bestseller });
  };
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-3 items-start">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-3">
          <label className="cursor-pointer" htmlFor="image1">
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            <img className="w-20" src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" id="image1" />
          </label>
          <label className="cursor-pointer" htmlFor="image2">
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            <img className="w-20" src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" id="image2" />
          </label>
          <label className="cursor-pointer" htmlFor="image3">
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            <img className="w-20" src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" id="image3" />
          </label>
          <label className="cursor-pointer" htmlFor="image4">
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            <img className="w-20" src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" id="image4" />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" name="" id="" />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" placeholder="Write here..." name="" id=""></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2" name="" id="">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2" name="" id="">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="px-3 py-2 w-full sm:w-1/2" type="number" placeholder="+92" name="" id="" />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes((prev) => (prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"]))}>
            <p className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes((prev) => (prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]))}>
            <p className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes((prev) => (prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]))}>
            <p className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes((prev) => (prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]))}>
            <p className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes((prev) => (prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"]))}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} type="checkbox" name="" id="bestseller" checked={bestseller} />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
};

export default Add;
