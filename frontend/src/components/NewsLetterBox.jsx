const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center dark:bg-slate-900 dark:text-white">
      <p className="text-2xl font-medium text-gray-800 dark:text-white">Subscribe Now & get 20% off</p>
      <p className="text-gray-400 mt-3 dark:text-white">Join our newsletter for the latest updates</p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3" action="">
        <input className="w-full outline-none dark:bg-slate-900 dark:placeholder:text-white" type="email" name="" id="" placeholder="Enter your Email" required />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-400 dark:bg-white dark:text-black">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
