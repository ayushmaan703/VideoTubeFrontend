import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../store/slices/tweetSlice";
import TweetAndComment from "../../components/TweetAndComment";
import TweetsList from "../../components/TweetList";

function ChannelTweets() {

  const dispatch = useDispatch();
  const authId = useSelector((state) => state.auth?.userData?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId));
  }, [dispatch, userId]);

  return (
    <>
      {authId === userId && <TweetAndComment tweet={true} userId={userId} />}
      {tweets?.map((tweet) => (
        <TweetsList
          key={tweet?._id}
          avatar={tweet?.ownerDetails?.avatar}
          content={tweet?.tweetContent}
          createdAt={tweet?.createdAt}
          likesCount={tweet?.likes}
          tweetId={tweet?._id}
          username={tweet?.ownerDetails[0]?.userName}
          isLiked={tweet?.isLiked}
        />
      ))}
    </>
  );
}

export default ChannelTweets;
