import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar, NoSubscriptionsFound } from "../components/index";

function MySubscriptions() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription?.mySubscriptions
  );
  const subscriberId = useSelector((state) => state.auth?.userData?._id);
  useEffect(() => {
    if (subscriptions) {
      dispatch(getSubscribedChannels(subscriberId));
    }
  }, [dispatch, subscriberId]);
  window.scrollTo(0, 0);
  if (subscriptions.length == 0) {
    return <NoSubscriptionsFound />;
  }
  return (
    <>
      <div className="flex gap-3 p-2 text-white items-center bg-[#222222]">
        {subscriptions?.map((subscription) => (
          <div
            key={subscription?.subscribedChannel?._id}
            className="flex flex-col items-center overflow-x-auto"
          >
            <Avatar
              src={subscription?.subscribedChannel?.avatar}
              channelName={subscription?.subscribedChannel?.userName}
            />
            <h5 className="text-xs">
              {subscription?.subscribedChannel?.userName}
            </h5>
          </div>
        ))}
      </div>
      <div className="text-white mb-20 sm:mb-0 w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y">
        {subscriptions?.map(
          (subscription) =>
            subscription?.subscribedChannel?.latestVideo && (
              <Link
                to={`/watch/${subscription?.subscribedChannel?.latestVideo?._id}`}
                key={subscription?.subscribedChannel?._id}
              >
                {subscription?.subscribedChannel?.latestVideo && (
                  <VideoList
                    key={subscription?.subscribedChannel?._id}
                    avatar={subscription?.subscribedChannel?.avatar}
                    duration={
                      subscription?.subscribedChannel?.latestVideo?.duration
                    }
                    title={subscription?.subscribedChannel?.latestVideo?.title}
                    thumbnail={
                      subscription?.subscribedChannel?.latestVideo?.thumbnail
                        ?.url
                    }
                    createdAt={
                      subscription?.subscribedChannel?.latestVideo?.createdAt
                    }
                    views={subscription?.subscribedChannel?.latestVideo?.views}
                    channelName={subscription?.subscribedChannel?.userName}
                    videoId={subscription?.subscribedChannel?.latestVideo?._id}
                    isPublished={
                      subscription?.subscribedChannel?.latestVideo?.isPublished
                    }
                  />
                )}
              </Link>
            )
        )}
      </div>
    </>
  );
}

export default MySubscriptions;
