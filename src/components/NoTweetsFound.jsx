import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const NoTweetsFound = ({ text }) => {
  return (
    <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
      <FaPlayCircle size={45} className="text-cyan-500" />
      <p className="mt-4 text-lg">There are no tweets available here.</p>
      <p className="">{text && text}</p>
    </div>
  );
};

export default NoTweetsFound;
