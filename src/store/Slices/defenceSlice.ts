import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../services/AuthService";
import { DefenceResponse } from "../types/Defence";

export const fetchDefenceData = createAsyncThunk(
  "defence/fetchData",
  async (id: number | null) => {
    const response = await axios.get(API_URL + `/secretary/team/${id}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
    return response.data;
  }
);

interface DefenceState {
  data: DefenceResponse | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DefenceState = {
  data: null,
  loading: "idle",
  error: null,
};

const defenceSlice = createSlice({
  name: "defence",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDefenceData.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(fetchDefenceData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
    });

    builder.addCase(fetchDefenceData.rejected, (state, action) => {
      state.loading = "failed";
      state.error =
        action.error.message ?? "An error occurred while fetching the data";
    });
  },
});

export default defenceSlice.reducer;
