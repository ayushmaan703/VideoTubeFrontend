import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/slices/videoSlice";
import {
  CommentList,
  TweetAndComment,
  Video,
  Description,
  Spinner,
  InfiniteScroll,
  Navbar,
} from "../components/index";
import {
  cleanUpComments,
  getVideoComment,
} from "../store/slices/commentSlice";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const comments = useSelector((state) => state.comment?.comment);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const loading = useSelector((state) => state.comment?.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComment({ videoId }));
    }

    return () => dispatch(cleanUpComments());
  }, [dispatch, videoId]);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, loading, hasNextPage, dispatch, videoId]);

  return (
    <>
      <Navbar />
      <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
      <Description
        avatar={video?.owner?.avatar}
        channelName={video?.owner?.userName}
        createdAt={video?.createdAt}
        description={video?.discription}
        isSubscribed={video?.owner?.isSubscribed}
        likesCount={video?.likesCount}
        subscribersCount={video?.owner?.subscriberCount}
        title={video?.title}
        views={video?.views}
        key={video?._id}
        isLiked={video?.isLiked}
        videoId={video?._id}
        channelId={video?.owner?._id}
      />
      <div className="text-white font-semibold sm:px-5 px-3">
        {totalComments} Comments
      </div>
      <TweetAndComment comment={true} videoId={video?._id} />
      <InfiniteScroll fetchMore={fetchMoreComments} hasNextPage={hasNextPage}>
        <div className="w-full sm:max-w-4xl">
          {comments?.map((comment) => (
            <CommentList
              key={comment?._id}
              avatar={comment?.owner?.avatar}
              commentId={comment?._id}
              content={comment?.content}
              createdAt={comment?.createdAt}
              fullName={comment?.owner?.fullName}
              isLiked={comment?.isLiked}
              likesCount={comment?.likeCount}
              username={comment?.owner?.userName}
            />
          ))}
          {loading && (
            <div className="w-full flex justify-center items-center">
              <Spinner width={10} />
            </div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default VideoDetail;
