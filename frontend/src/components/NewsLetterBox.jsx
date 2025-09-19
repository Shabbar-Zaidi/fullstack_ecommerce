const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Subscribe Now & get 20% off</p>
      <p className="text-gray-400 mt-3">Join our newsletter for the latest updates</p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3" action="">
        <input className="w-full outline-none" type="email" name="" id="" placeholder="Enter your Email" required />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer hover:bg-gray-800">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
