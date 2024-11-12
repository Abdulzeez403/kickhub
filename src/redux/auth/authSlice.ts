import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser, login, logout, register, updateProfile } from "./auth";
import { User } from "./type";

// Initial state
interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  loading: false,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle signup
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;

        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to sign up";
      })

      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;

        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message || "Failed to log in";
      })

      // Current User
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(currentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message || "Failed to fetch user";
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;

          state.user = action.payload;
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      });
  },
});

export default authSlice.reducer;