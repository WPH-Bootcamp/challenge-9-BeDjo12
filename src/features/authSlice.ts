import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api/axios";

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  errors: any | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,
  errors: null,
};


export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Registration Failed" },
      );
    }
  },
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const token = response.data?.token || response.data?.data?.token;
      if (token) localStorage.setItem("token", token);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Login Failed" });
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.errors = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload?.token || action.payload?.data?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      // Handle Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const { clearErrors, logout } = authSlice.actions;
export default authSlice.reducer;
