import React from "react";
import { RiHome6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoFolderOutline } from "react-icons/io5";
import { TbUserCheck } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/slices/authSlice";
import { FaThreads } from "react-icons/fa6";
import Navbar from "./Navbar";
function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.userName);
  const authStatus = useSelector((state) => state.auth.status);
  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };
  return (
    <>
      <div className="text-white sm:block hidden sm:w-44 w-16 sm:p-3 p-2 border-[#0E0F0F] border-r xl:space-y-60 space-y-32 h-[93vh]">
        <div className="space-y-4 sm:pt-4 pt-1">
          <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#222222] cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <RiHome6Line size={25} />
            <NavLink to="/">
              <span className="text-base hidden sm:block ">Home</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F]  rounded-lg">
            <BiLike size={25} />
            <NavLink to="/liked-videos">
              <span className="text-base hidden sm:block">Liked Videos</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F]  rounded-lg">
            <FaThreads size={25} />
            <NavLink to="/tweets">
              <span className="text-base hidden sm:block">Tweets</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <BiHistory size={25} />
            <NavLink to="/history">
              <span className="text-base hidden sm:block">History</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <HiOutlineVideoCamera size={25} />
            <NavLink to={`/channel/${username}`}>
              <span className="text-base hidden sm:block">My Content</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <IoFolderOutline size={25} />
            <NavLink to="/collections">
              <span className="text-base hidden sm:block">Collections</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <TbUserCheck size={25} />
            <NavLink to="/subscriptions">
              <span className="text-base hidden sm:block">Subscriptions</span>
            </NavLink>
          </div>
        </div>

        <div className="space-y-4">
          {authStatus && (
            <div
              onClick={() => logout()}
              className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg"
            >
              <IoMdLogOut size={25} />
              <span className="text-base hidden sm:block">Logout</span>
            </div>
          )}
          <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#222222]  cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg">
            <CiSettings size={25} />
            <span className="text-base hidden sm:block">Settings</span>
          </div>
        </div>
      </div>

      {/* for mobile sidebar is bottom bar*/}
      <div className="border-t-2  text-white h-16 sm:hidden p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F] z-20">
        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
          <RiHome6Line size={25} />
          <NavLink to="/">
            <span className="text-sm">Home</span>
          </NavLink>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
          <BiHistory size={25} />
          <NavLink to="/history">
            <span className="text-sm">History</span>
          </NavLink>{" "}
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
          <IoFolderOutline size={25} />
          <NavLink to="/collections">
            <span className="text-sm">Collections</span>
          </NavLink>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
          <TbUserCheck size={25} />
          <NavLink to="/subscriptions">
            <span className="text-sm">Subscriptions</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
