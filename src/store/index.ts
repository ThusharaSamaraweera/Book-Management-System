import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../modal";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = {
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});


export const { setUser } = globalSlice.actions;
export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 