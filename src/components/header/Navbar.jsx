import React, { useState } from "react";
import { IoLogoYoutube } from "react-icons/io";
import Search from "./Search";
import Button from "../Button";
import { SlMenu } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { BiLike } from "react-icons/bi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/slices/authSlice";
import SearchForSmallScreen from "../SearchForSmallScreen";
import { FaThreads } from "react-icons/fa6";

function Navbar() {

  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const profileImg = useSelector((state) => state.auth.userData?.avatar);
  const username = useSelector((state) => state.auth?.userData?.userName);
  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <IoLogoYoutube size={35} color="cyan" />
          <span className="font-bold text-white">VIDEOTUBE</span>
        </div>

        {/* search for large screens */}
        <div className="w-full sm:w-1/3 hidden sm:block  ">
          <Search />
        </div>

        {/* search for small screens */}
        <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
          <CiSearch
            size={30}
            fontWeight={"bold"}
            onClick={() => setOpenSearch((prev) => !prev)}
          />
          {openSearch && (
            <SearchForSmallScreen
              open={openSearch}
              setOpenSearch={setOpenSearch}
            />
          )}
        </div>

        {/* login and signup buutons */}
        {authStatus ? (
          <div className="rounded-full sm:block hidden">
            <img
              src={profileImg}
              alt="profileImg"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
        ) : (
          <div className="space-x-2 sm:block hidden">
            <NavLink to="/login">
              <Button className=" border hover:bg-[#222222] border-[#0E0F0F] sm:px-4 sm:py-2 p-2">
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button className="font-semibold border hover:bg-[#222222] border-[#0E0F0F] sm:px-4 sm:py-2 ">
                Sign up
              </Button>
            </NavLink>
          </div>
        )}

        {/* 3 dot type icon for smaller screens */}
        <div className="sm:hidden block">
          <div className="text-white ">
            <SlMenu size={30} onClick={() => setToggleMenu((prev) => !prev)} />
          </div>
        </div>

        {/* Side panel for smaller screens */}
        {toggleMenu && (
          <div
            className="fixed right-0 top-0 text-white flex flex-col border-l h-full w-5/6 bg-[#0F0F0F] sm:hidden rounded-lg outline-none 
              overflow-y-auto z-50"
          >
            <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
              <div className="flex items-center gap-2">
                <IoLogoYoutube size={35} color="cyan" />
                <span className="text-lg font-bold">YOUTUBE</span>
              </div>
              <IoCloseCircleOutline
                size={35}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            </div>

            <div className="flex flex-col justify-between flex-grow py-5 px-3">
              <div className="space-y-5">
                <NavLink to="/liked-videos" className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-[#222222] rounded-lg">
                  <div className="flex items-center gap-5">
                    <BiLike size={25} />
                    <span className="text-lg">Liked Videos</span>
                  </div>
                </NavLink>
                <NavLink to={`/channel/${username}`} className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-[#222222] rounded-lg">
                  <div className="flex items-center gap-5">
                    <HiOutlineVideoCamera size={25} />
                    <span className="text-lg">My Content</span>
                  </div>
                </NavLink>
                <NavLink to="/tweets" className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-[#222222] rounded-lg">
                  <div className="flex items-center gap-5">
                    <FaThreads size={25} />
                    <span className="text-lg">Tweets</span>
                  </div>
                </NavLink>
              </div>

              {!authStatus ? (
                <div className="flex flex-col space-y-5 mb-3 mt-10">
                  <NavLink to="/login">
                    <Button className="bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button className="font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                      Sign up
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <div
                  onClick={() => logout()}
                  className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#222222] cursor-pointer py-1 px-2 border border-[#0E0F0F] rounded-lg mt-10" 
                >
                  <IoMdLogOut size={25} />
                  <span className="text-base hidden sm:block">Logout</span>
                </div>
              )}
            </div>
          </div>

        )}
      </nav>
    </>
  );
}

export default Navbar;
