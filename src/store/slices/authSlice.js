import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
import axios from "axios";
const initialState = {
  loading: false,
  status: false,
  userData: null,
};
export const createAccount = createAsyncThunk("createAccount", async (data) => {
  const formData = new FormData();
  formData.append("userName", data.userName);
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar[0]);
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage[0]);
  }
  try {
    const response = await axiosInstance.post("/user/register", formData);
    toast.success("Registered Succcessfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/user/login", data, {
      withCredentials: true,
    });
    toast.success("Logged in successfully");
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    toast.success("User logged out");
    return response.data?.message;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const userRefreshToken = createAsyncThunk(
  "refreshToken",
  async (data) => {
    try {
      const response = await axiosInstance.post("/user/refresh-token", data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/user/change-password", data);
      toast.success("Password changed successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
export const currentUserInfo = createAsyncThunk("currentUserInfo", async () => {
  try {
    const response = await axiosInstance.post("/user/current-user",{}, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
});
export const updateAvatar = createAsyncThunk("updateAvatar", async (data) => {
  try {
    const response = await axiosInstance.post("user/update-avatar", data);
    toast.success("Avatar updated successfully");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});
export const updateCoverImage = createAsyncThunk(
  " updateCoverImage",
  async (data) => {
    try {
      const response = await axiosInstance.post("user/update-coverImage", data);
      toast.success("Cover image updated successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);
export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async (data) => {
    try {
      const response = await axiosInstance.patch("/user/update-details", data);
      toast.success("Details updated sucessfully");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    // builder.addCase(createAccount.rejected, (state) => {
    //   state.loading = false;
    // });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(currentUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(currentUserInfo.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCoverImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImage.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
  },
});
export default authSlice.reducer;
