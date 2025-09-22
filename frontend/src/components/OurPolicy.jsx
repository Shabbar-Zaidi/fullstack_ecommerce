import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 py-20 text-center text-xs sm:text-sm md:text-base text-gray-700">
      <div className="dark:text-white">
        <img src={assets.exchange_icon} className="dark:filter dark:invert w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400 dark:text-white">Hassle-free exchanges within 30 days</p>
      </div>
      <div className="dark:text-white">
        <img src={assets.quality_icon} className="dark:filter dark:invert w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Quality Guarantee</p>
        <p className="text-gray-400 dark:text-white">100% satisfaction guaranteed</p>
      </div>
      <div className="dark:text-white">
        <img src={assets.support_img} className="w-12 m-auto mb-5 dark:filter dark:invert " alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400 dark:text-white">We are here to help you 24/7</p>
      </div>
    </div>
  );
};

export default OurPolicy;
