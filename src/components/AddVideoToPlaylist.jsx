import React, { useEffect, useState } from "react";
import {
  getUserPlaylists,
  addVideoToPlaylist,
} from "../store/slices/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function AddVideoToPlaylist() {
  const dispatch = useDispatch();
  const [userPlaylist, setUserPlaylist] = useState(null);
  const videoId = useParams();
  const userId = useSelector((state) => state.auth.userData?._id);
  const addingVideoToPlaylist = (data) => {
    dispatch(
      addVideoToPlaylist({ playlistId: data, videoId: videoId.videoId })
    );
  };

  useEffect(() => {
    const get = async () => {
      const playlist = await dispatch(getUserPlaylists(userId));
      setUserPlaylist(playlist?.payload?.data);
    };
    get();
  }, [videoId]);
  if (userPlaylist?.length == 0) {
    return (
      <>
        {" "}
        <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-20 rounded-md">
          <ul>
            <li className="hover:bg-slate-700 rounded-md px-10 py-0.5 cursor-pointer  ">No playlist found</li>
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-20 rounded-md">
        <ul>
          {userPlaylist?.map((playlists) => (
            <li
              key={playlists?._id}
              className="hover:bg-slate-700 rounded-md px-10 py-0.5 cursor-pointer  "
              onClick={() => addingVideoToPlaylist(playlists?._id)}
            >
              {playlists?.playlistName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default AddVideoToPlaylist;
