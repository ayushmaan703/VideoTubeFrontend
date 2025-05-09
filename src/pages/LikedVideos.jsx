import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/slices/likeSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import Container from "../components/Container";
import NoVideosFound from "../components/NoVideoFound";
import VideoList from "../components/VideoList";
import { makeVideosNull } from "../store/slices/videoSlice";

function LikedVideos() {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.likes?.likedVideos?.data);
  const loading = useSelector((state) => state.likes?.loading);
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getLikedVideos());

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (likedVideos?.length == 0) {
    return <NoVideosFound />;
  }

  return (
    <>
      <Container>
        <div className="grid max-h-screen overflow-y lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
          {likedVideos?.map((video) => (
            <VideoList
              key={video.likedVideo._id}
              avatar={video.likedVideo.ownerDetails?.avatar}
              duration={video.likedVideo.duration}
              title={video.likedVideo.title}
              thumbnail={video.likedVideo.thumbnail?.url}
              createdAt={video.likedVideo.createdAt}
              views={video.likedVideo.views}
              channelName={video.likedVideo.ownerDetails?.userName}
              videoId={video.likedVideo._id}
              isPublished={video.likedVideo.isPublished}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default LikedVideos;
