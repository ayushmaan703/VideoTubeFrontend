import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js";
import commentSliceReducer from "./slices/commentSlice.js";
import dashboardSliceReducer from "./slices/dashboardSlice.js";
import likeSliceReducer from "./slices/likeSlice.js";
import playlistSliceReducer from "./slices/playlistSlice.js";
import subscriptionSliceReducer from "./slices/subscriptionSlice.js";
import tweetSliceReducer from "./slices/tweetSlice.js";
import userSliceReducer from "./slices/userSlice.js";
import videoSliceReducer from "./slices/videoSlice.js";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    comment: commentSliceReducer,
    dashboard: dashboardSliceReducer,
    likes: likeSliceReducer,
    playlist: playlistSliceReducer,
    subscription: subscriptionSliceReducer,
    tweet: tweetSliceReducer,
    user: userSliceReducer,
    video: videoSliceReducer,
  },
});
export default store;
