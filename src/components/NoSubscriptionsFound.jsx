import React from "react";
import { TbUserCheck } from "react-icons/tb";

const NoSubscriptionsFound = ({ text }) => {
  return (
    <div className="flex flex-col pb-20 items-center justify-center text-white h-screen">
      <TbUserCheck size={45} className="text-cyan-500" />
      <p className="mt-4 text-lg">You have not subscribed anyone.</p>
      <p className="">{text && text}</p>
    </div>
  );
};

export default NoSubscriptionsFound;
