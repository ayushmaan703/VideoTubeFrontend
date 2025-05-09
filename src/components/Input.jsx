import React, { forwardRef, useId } from "react";
const Input = forwardRef(function Input(
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 bg-[#1d2020] text-white outline-none focus:border-gray-500 duration-200 border border-[#0E0F0F] w-full  rounded-full${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});
export default Input;
