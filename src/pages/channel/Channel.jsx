import React, { useEffect } from "react";
import ChannelHeader from "../../components/channel/ChannelHeader.jsx";
import ChannelNavigate from "../../components/channel/ChannelNavigate.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelProfile } from "../../store/slices/userSlice.js";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
  const dispatch = useDispatch();
  const { username } = useParams();
  useEffect(() => {
    dispatch(getUserChannelProfile(username));
  }, [dispatch, username]);
  const channel = useSelector((state) => state.user?.profileData);
  window.scrollTo(0, 0);

  return (
    <>
      {channel && (
        <ChannelHeader
          username={username}
          coverImage={channel?.coverImage}
          avatar={channel?.avatar}
          subscribedCount={channel?.channelSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subscriberCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
        />
      )}
      <ChannelNavigate username={username} />
      <div className="overflow-y h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
}

export default Channel;
