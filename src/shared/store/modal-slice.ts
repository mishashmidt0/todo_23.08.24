import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalName = 'NewTaskModal' | 'DetailsTaskModal' | '';

interface ModalState {
  name: ModalName;
  state?: any;
}

const initialState: ModalState = {
  name: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: ModalName; state?: any }>) => {
      state.name = action.payload.name;
      state.state = action.payload.state;
    },
    closeModal: (state) => {
      state.name = '';
      state.state = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
