import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full my-3">
      <div className="animate-spin border-red-400 rounded-full border-l-2 border-t-2 w-10 h-10"></div>
    </div>
  );
};

export default Loader;
