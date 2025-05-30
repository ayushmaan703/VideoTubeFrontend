import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
import { baseUrl } from "../../cosntants";
const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
    nextCursor: null,
  },
  video: null,
  publishToggled: false,
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      const url = new URL(`${baseUrl}/video`);
      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
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

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("discription", data.description);
  formData.append("videoFile", data.videoFile[0]);
  formData.append("thumbnail", data.thumbnail[0]);
  try {
    const response = await axiosInstance.post("/video/publish-video", formData);
    toast.success(response?.data?.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const updateAVideo = createAsyncThunk(
  "updateAVideo",
  async ({ videoId, data }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("discription", data.discription);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axiosInstance.patch(
        `/video/update/${videoId}`,
        formData
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const deleteAVideo = createAsyncThunk(
  "deleteAVideo",
  async (videoId) => {
    try {
      const response = await axiosInstance.delete(
        `/video/delete-video/${videoId}`
      );
      toast.success(response?.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getVideoById = createAsyncThunk(
  "getVideoById",
  async ({ videoId }) => {
    try {
      const response = await axiosInstance.get(`/video/get-video/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const togglePublishStatus = createAsyncThunk(
  "togglePublishStatus",
  async (videoId) => {
    try {
      const response = await axiosInstance.patch(
        `/video/toggle/publish/${videoId}`
      );
      toast.success(response.data.message);
      return response.data.data.isPublished;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.docs = [...state.videos.docs, ...action.payload.docs];
      state.videos.hasNextPage = action.payload.hasNextPage;
    });
    builder.addCase(publishAvideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(publishAvideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(updateAVideo.pending, (state) => {
      state.uploading = true;
    });
    builder.addCase(updateAVideo.fulfilled, (state) => {
      state.uploading = false;
      state.uploaded = true;
    });
    builder.addCase(deleteAVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAVideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
    });
    builder.addCase(togglePublishStatus.fulfilled, (state) => {
      state.publishToggled = !state.publishToggled;
    });
  },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;
