function Button({
  children,
  type = "button",
  bgColor = "blue",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${className} ${type} ${bgColor} ${textColor} hover:scale-110 duration-100 ease-in rounded-full`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
