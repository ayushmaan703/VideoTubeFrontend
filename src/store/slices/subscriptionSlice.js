import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
const initialState = {
  loading: false,
  subscribed: null,
  channelSubscribers: [],
  mySubscriptions: [],
};
export const toggleSubscription = createAsyncThunk(
  "toggleSubscription",
  async (channelId) => {
    try {
      const response = await axiosInstance.post(
        `/subscription/toggle/${channelId}`
      );
      return response.data.data.subscribed;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getChannelSubscribersListOfTheUser = createAsyncThunk(
  "getChannelSubscribersListOfTheUser",
  async (channelId) => {
    try {
      const response = await axiosInstance.get(`/subscription/u/${channelId}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getSubscribedChannels = createAsyncThunk(
  "getSubscribedChannels",
  async (subscriberId) => {
    try {
      const response = await axiosInstance.get(
        `/subscription/c/${subscriberId}`
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toggleSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribed = action.payload;
    });
    builder.addCase(getChannelSubscribersListOfTheUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getChannelSubscribersListOfTheUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.channelSubscribers = action.payload;
      }
    );
    builder.addCase(getSubscribedChannels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
      state.loading = false;
      state.mySubscriptions = action.payload.data.filter(
        (subscription) => subscription?.subscribedChannel
      );
      //  (
      //   action.payload.data.filter(
      //     (subscription) => subscription?.subscribedChannel
      //   )
      // );
    });
  },
});
export default subscriptionSlice.reducer;
