import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../store/slices/tweetSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import Container from "../components/Container";
import NoTweetsFound from "../components/NoTweetsFound";
import TweetsList from "../components/TweetList";
import { makeTweetsNull } from "../store/slices/tweetSlice";
import { tweetLikeToggle } from "../store/slices/likeSlice";
function Tweets() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweet?.tweets?.docs);
  const likesOnATweet = useSelector((state) => state.likes);
  window.scrollTo(0, 0);
  useEffect(() => {
    dispatch(getAllTweets({}));

    return () => dispatch(makeTweetsNull());
  }, [dispatch]);

  

  if (tweets?.length == 0) {
    return <NoTweetsFound />;
  }

  return (
    <>
      <Container>
        {tweets?.map((tweet) => (
          <TweetsList
            key={tweet?._id}
            avatar={tweet?.ownerDetails?.avatar}
            content={tweet?.tweetContent}
            createdAt={tweet?.createdAt}
            likesCount={tweet?.likes}
            tweetId={tweet?._id}
            username={tweet?.ownerDetails?.userName}
            isLiked={tweet?.isLiked}
          />
        ))}
      </Container>
    </>
  );
}

export default Tweets;
