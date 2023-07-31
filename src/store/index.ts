import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, LoginPayload, LoginPayload } from "../modal";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface InitialState {
  user: IUser | null;
  token: string | null;
}

const initialState: InitialState = {
  user: null,
  token: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginPayload>) => {
      localStorage.setItem("token", action.payload?.token || "");
      return {
        ...state,
        user: action.payload?.user,
        token: action.payload?.token,
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      };
    }
  },
});


export const { setUser, logout } = globalSlice.actions;
export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 