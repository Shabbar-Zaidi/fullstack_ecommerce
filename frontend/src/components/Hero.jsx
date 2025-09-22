import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0  dark:bg-slate-900 dark:text-white">
        <div className="text-[#414141]  dark:bg-slate-900 dark:text-white">
          <div className="flex items-center gap-2 ">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-white"></p>
            <p className="text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm-py-3 lg:text-5xl leading-relaxed dark:bg-slate-900 dark:text-white">Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">Shop Now</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141] dark:bg-white dark:text-white"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
};

export default Hero;
