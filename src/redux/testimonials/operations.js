import { createAsyncThunk } from "@reduxjs/toolkit";
import { testimonialsFetch } from "../../api/testimonialsApi";
import {handleError} from "../utils";


export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (options = {}, {rejectWithValue }) => {
    try {
      return await testimonialsFetch({
        ...options,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

