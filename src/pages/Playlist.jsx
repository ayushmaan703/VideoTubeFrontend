import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import VideoList from "../components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylistById,
  deletePlaylist,
  updatePlaylist,
} from "../store/slices/playlistSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import Input from "../components/Input";
import { DeleteConfirmation } from "../components";
function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const playlistDiscription = useSelector(
    (state) => state.playlist?.playlist?.playlistDiscription
  );
  const loading = useSelector((state) => state.playlist?.loading);
  const videos = useSelector(
    (state) => state.playlist?.playlist?.playlistVideo
  );
  const authId = useSelector((state) => state.auth.userData?._id);
  const userId = useSelector((state) => state.user.profileData?._id);
  const username = useSelector(
    (state) => state.playlist?.playlist?.owner?.userName
  );

  const [updatingThePlaylist, setUpdatingThePlaylist] = useState(false);
  const [deleteTheP, setDeleteTheP] = useState(false);

  useEffect(() => {
    dispatch(getPlaylistById(playlistId));
  }, [dispatch]);

  window.scrollTo(0, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updatingPlaylist = (data) => {
    dispatch(
      updatePlaylist({
        name: data.name,
        description: data.description,
        playlistId,
      })
    );
    setUpdatingThePlaylist((prev) => !prev);
  };

  const deleteThePlaylist = () => {
    dispatch(deletePlaylist(playlistId));
    setDeleteTheP(false);
    navigate(`/channel/${username}/playlists`);
  };
  if (loading) {
    return <HomeSkeleton />;
  }

  if (videos?.length == 0 || videos == undefined) {
    return (
      <>
        {authId === userId && (
          <div className="w-full flex justify-evenly mt-5 mb-5">
            <Button
              className="bg-cyan-500 text-sm p-2"
              onClick={() => setUpdatingThePlaylist((prev) => !prev)}
            >
              Update Playlist
            </Button>
            <Button
              className="bg-cyan-500 text-sm p-2 "
              onClick={() => {
                setDeleteTheP(true);
              }}
            >
              Delete Playlist
            </Button>
          </div>
        )}
        <div className="text-white bg-[#1D2020] rounded-lg pt-2 pb-2 pl-5 text-lg mb-5">
          {" "}
          {playlistDiscription}{" "}
        </div>
        <div className=" text-white">
          {deleteTheP && (
            <DeleteConfirmation
              playlist={true}
              onCancel={() => setDeleteTheP((prevState) => !prevState)}
              onDelete={deleteThePlaylist}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Container>
        {authId === userId && (
          <div className="w-full flex justify-evenly mt-5 mb-5">
            <Button
              className="bg-cyan-500 text-sm p-2"
              onClick={() => setUpdatingThePlaylist((prev) => !prev)}
            >
              Update Playlist
            </Button>
            <Button
              className="bg-cyan-500 text-sm p-2 "
              onClick={() => {
                setDeleteTheP(true);
              }}
            >
              Delete Playlist
            </Button>
          </div>
        )}
        <div className=" text-white">
          {deleteTheP && (
            <DeleteConfirmation
              playlist={true}
              onCancel={() => setDeleteTheP((prevState) => !prevState)}
              onDelete={deleteThePlaylist}
            />
          )}
        </div>
        {updatingThePlaylist && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-transparent z-40 text-white">
            <div className="relative w-full max-w-sm border bg-black">
              <form
                onSubmit={handleSubmit(updatingPlaylist)}
                className="w-full space-y-5 p-4"
              >
                <h2 className="text-2xl font-bold">Update Playlist</h2>
                <IoCloseCircleOutline
                  size={30}
                  className="absolute -top-2 right-4 cursor-pointer"
                  onClick={() => setUpdatingThePlaylist((prev) => !prev)}
                />
                <Input
                  label="Name: "
                  placeholder="Enter new playlist name"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}

                <Input
                  label="Description: "
                  placeholder="Enter description for your playlist"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}

                <Button
                  className="bg-cyan-500 text-sm p-2 w-full"
                  type="submit"
                >
                  Update playlist
                </Button>
              </form>
            </div>
          </div>
        )}
        <div className="text-white bg-[#1D2020] rounded-lg pt-2 pb-2 pl-5 text-lg mb-5">
          {" "}
          {playlistDiscription}{" "}
        </div>
        <div className="grid max-h-screen mb-20 sm:m-0 overflow-y lg:grid-cols-3 sm:grid-cols-2 text-white ">
          {videos.map((video) => (
            <VideoList
              key={video._id}
              avatar={video.videoOwnerDetails?.avatar}
              duration={video.duration}
              title={video.title}
              thumbnail={video.thumbnail?.url}
              createdAt={video.createdAt}
              views={video.views}
              channelName={video.videoOwnerDetails.userName}
              videoId={video._id}
              isPublished={video.isPublished}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default History;
