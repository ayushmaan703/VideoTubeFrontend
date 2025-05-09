import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelSubscribersListOfTheUser } from "../../store/slices/subscriptionSlice";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const subscribers = useSelector(
    (state) => state.subscription.channelSubscribers.data
  );
  useEffect(() => {
    if (channelId) {
      dispatch(getChannelSubscribersListOfTheUser(channelId));
    }
  }, [dispatch, channelId]);
  return (
    <>
      {subscribers?.map((subscriber) => (
        <Link
          key={subscriber?.subscribedUser?._id}
          className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
        >
          <div className="flex gap-3 items-center">
            <Avatar
              src={subscriber?.subscribedUser?.avatar}
              channelName={subscriber?.subscribedUser?.username}
            />
            <div>
              <h5 className="text-sm">{subscriber?.subscribedUser?.userName}</h5>
              <span className="text-xs text-slate-400">
                {subscriber?.subscribedUser?.subscribercount} Subscribers
              </span>
            </div>
          </div>
          <div>
            {/* <Button className="bg-cyan-500 text-black text-xs py-1 px-2">
              {subscriber?.subscribedUser?.subscribercount
                ? "Subscribed"
                : "subscribe"}
            </Button> */}
          </div>
        </Link>
      ))}
    </>
  );
}

export default ChannelSubscribers;
