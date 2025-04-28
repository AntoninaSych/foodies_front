import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchCurrentUser} from "../../api/usersApi";
import {handleError} from "../utils";


export const fetchUser = createAsyncThunk(
  "user/fetch",
  async ({id, options = {}}, {rejectWithValue }) => {
    try {
      return await fetchCurrentUser(id, options);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

