import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { currentUserInfo } from "./store/slices/authSlice.js";
import Layout from "./Layout.jsx";
import Homepage from "./pages/Homepage.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/header/Login.jsx";
import Channel from "./pages/channel/Channel.jsx";
import TermsAndConditions from "./pages/TermsAndConditon.jsx";
import SignUp from "./components/SignUp.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import History from "./pages/History.jsx";
import ChannelVideos from "./pages/channel/ChannelVideo.jsx";
import ChannelPlaylist from "./pages/channel/ChannelPlaylist.jsx";
import ChannelTweets from "./pages/channel/ChannelTweet.jsx";
import ChannelSubscribers from "./pages/channel/ChannelSubscribers.jsx";
import Tweets from "./pages/Tweets.jsx";
import EditChannel from "./pages/EditChannel.jsx";
import EditPersonalInfo from "./components/EditPersonalInfo.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import SearchVideos from "./pages/SearchVideos.jsx";
import VideoDetail from "./pages/VideoDetails.jsx";
import MySubscriptions from "./pages/MySubscriptions.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Playlist from "./pages/Playlist.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserInfo());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <AuthLayout authentication={false}>
                <Homepage />
              </AuthLayout>
            }
          />
          <Route
            path="/search/:query"
            element={
              <AuthLayout authentication={false}>
                <SearchVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/channel/:username"
            element={
              <AuthLayout authentication>
                <Channel />
              </AuthLayout>
            }
          >
            <Route
              path="videos"
              element={
                <AuthLayout authentication>
                  <ChannelVideos />
                </AuthLayout>
              }
            />
            <Route
              path="playlists"
              element={
                <AuthLayout authentication>
                  <ChannelPlaylist />
                </AuthLayout>
              }
            />
            <Route
              path="tweets"
              element={
                <AuthLayout authentication>
                  <ChannelTweets />
                </AuthLayout>
              }
            />
            <Route
              path="subscribed"
              element={
                <AuthLayout authentication>
                  <ChannelSubscribers />
                </AuthLayout>
              }
            />
          </Route>
          <Route
              path="playlist/:playlistId"
              element={
                <AuthLayout authentication>
                  <Playlist />
                </AuthLayout>
              }
            />
          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <LikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <MySubscriptions />
              </AuthLayout>
            }
          />
          <Route
            path="/tweets"
            element={
              <AuthLayout authentication>
                <Tweets />
              </AuthLayout>
            }
          />
          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <History />
              </AuthLayout>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthLayout authentication>
                <EditChannel />
              </AuthLayout>
            }
          >
            <Route
              path="personalInfo"
              element={
                <AuthLayout authentication>
                  <EditPersonalInfo />
                </AuthLayout>
              }
            />
            <Route
              path="password"
              element={
                <AuthLayout authentication>
                  <ChangePassword />
                </AuthLayout>
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="/watch/:videoId"
          element={
            <AuthLayout authentication>
              <VideoDetail />
            </AuthLayout>
          }
        />
        <Route
          path="/collections"
          element={
            <AuthLayout authentication>
              <AdminDashboard />
            </AuthLayout>
          }
        />
        <Route
          path="/terms&conditions"
          element={
            <AuthLayout authentication>
              <TermsAndConditions />
            </AuthLayout>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
