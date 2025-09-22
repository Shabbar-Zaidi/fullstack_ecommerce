import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px] " src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600  dark:text-white">Our Store</p>
          <p className="text-gray-500 dark:text-white">
            Street 11/12, Gobind Garh,
            <br />
            Islamia College Road, Gujranwala
          </p>
          <p className="text-gray-500 dark:text-white">
            Phone: 03265569693 <br />
            Email: shabbar5zaidi@gmail.com
          </p>
          <p className="text-gray-600 dark:text-white font-semibold text-xl">Careers at Foreever</p>
          <p className="text-gray-500 dark:text-white">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-400 dark:hover:text-black">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox />
    </>
  );
};

export default Contact;
