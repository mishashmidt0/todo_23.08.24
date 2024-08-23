import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilterName = 'all' | 'done' | 'undone';

interface FilterState {
  filter: FilterName;
}

const initialState: FilterState = {
  filter: 'all',
};

const filterTaskSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterName>) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterTaskSlice.actions;
export default filterTaskSlice.reducer;
