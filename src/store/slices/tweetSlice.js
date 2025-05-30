import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
import { baseUrl } from "../../cosntants";
const initialState = {
  loading: false,
  tweets: [],
};
export const createTweet = createAsyncThunk("createTweet", async (content) => {
  try {
    const response = await axiosInstance.post("/tweet", content);
    toast.success(response.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const editTweet = createAsyncThunk(
  "editTweet",
  async ({ tweetId, content }) => {
    try {
      const response = await axiosInstance.patch(`/tweet/update/${tweetId}`, {
        content,
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
  try {
    const response = await axiosInstance.delete(`/tweet/delete/${tweetId}`);
    toast.success(response.data.message);
    return response.data.data.tweetId;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const getAllTweets = createAsyncThunk(
  "getAllTweets",
  async ({ page = 1, limit = 10, sortBy, sortType }) => {
    try {
      const url = new URL(`${baseUrl}/tweet/get-tweets`);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response = await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const getUserTweets = createAsyncThunk(
  "getUserTweets",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/tweet/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    makeTweetsNull: (state) => {
      state.tweets = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });
    builder.addCase(getUserTweets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTweets.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      state.tweets = state.tweets.filter(
        (tweet) => tweet._id !== action.payload
      );
    });
  },
});

export const { addTweet, makeTweetsNull } = tweetSlice.actions;

export default tweetSlice.reducer;
