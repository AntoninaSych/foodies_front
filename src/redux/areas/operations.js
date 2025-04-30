import { createAsyncThunk } from '@reduxjs/toolkit';
import { areasFetch } from '../../api/areasApi';
import { handleError } from '../utils';

export const fetchAreas = createAsyncThunk(
  'areas/fetchAll',
  async (options = {}, { rejectWithValue }) => {
    try {
      return await areasFetch({
        ...options,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
