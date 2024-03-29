import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
      state.otp.email = "";
    },
    setOtpEmail: (state, action) => {
      const { email, hash } = action.payload;
      state.otp.email = email;
      state.otp.hash = hash;
      state.otp.phone = "";
    },
  },
});

export const { setAuth, setOtp, setOtpEmail } = authSlice.actions;

export default authSlice.reducer;
