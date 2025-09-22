const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3  dark:bg-slate-900 dark:text-white">
      <p className="text-gray-500 dark:bg-slate-900 dark:text-white">
        {text1} <span className="text-gray-700 font-medium dark:text-white">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 dark:bg-white"></p>
    </div>
  );
};

export default Title;
