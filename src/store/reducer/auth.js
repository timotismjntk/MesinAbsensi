import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';
import QueryString from 'qs';

const initialState = {
  mesinAbsen: {},
  isLoadingMesinAbsen: false,
  mulaiAbsen: {},
  failedAbsen: false,
  dataAbsenGagal: [],
  isLoadingMulaiAbsen: false,
  isLoginMesinModalSuccessOpen: true,
};

export const loginMesinAbsen = createAsyncThunk(
  'auth/loginMesinAbsen',
  async kodeAkses => {
    const {data} = await http().get(`cekKodeAkses?kode_akses=${kodeAkses}`);
    return data;
  },
);
export const scanRFID = createAsyncThunk('auth/mulaiAbsen', async val => {
  const {data} = await http().get(`doAbsen?${QueryString.stringify(val)}`);
  return data;
});
const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutMesinAbsen: (state, action) => {
      return {
        ...state,
        mesinAbsen: {},
        isLoginMesinModalSuccessOpen: true,
      };
    },
    clearStateMesinAbsen: (state, action) => {
      return {
        ...state,
        mesinAbsen: {},
        isLoadingMesinAbsen: false,
      };
    },
    showModalSuccess: (state, {payload}) => {
      return {
        ...state,
        isLoginMesinModalSuccessOpen: payload.value || false,
      };
    },
    saveToDbAbsenFailed: (state, {payload}) => {
      console.log([...state.dataAbsenGagal, payload]);
      return {
        ...state,
        dataAbsenGagal: [...state.dataAbsenGagal, payload],
      };
    },
    clearFailedAbsenFromDb: state => {
      return {
        ...state,
        dataAbsenGagal: [],
        failedAbsen: false,
      };
    },
    clearStatusFailedAbsen: state => {
      return {
        ...state,
        failedAbsen: false,
      };
    },
    clearMulaiAbsen: (state, action) => {
      return {
        ...state,
        mulaiAbsen: {},
        isLoadingMulaiAbsen: false,
      };
    },
  },
  extraReducers: {
    [loginMesinAbsen.pending]: state => {
      return {
        ...state,
        isLoadingMesinAbsen: true,
        isLoginMesinModalSuccessOpen: true,
      };
    },
    [loginMesinAbsen.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingMesinAbsen: false,
        mesinAbsen: payload,
      };
    },
    [loginMesinAbsen.rejected]: state => {
      return {
        ...state,
        isLoadingMesinAbsen: false,
        isLoginMesinModalSuccessOpen: false,
      };
    },
    [scanRFID.pending]: state => {
      return {
        ...state,
        isLoadingMulaiAbsen: true,
        failedAbsen: false,
      };
    },
    [scanRFID.fulfilled]: (state, {payload}) => {
      return {
        ...state,
        isLoadingMulaiAbsen: false,
        mulaiAbsen: payload,
        failedAbsen: false,
      };
    },
    [scanRFID.rejected]: state => {
      return {
        ...state,
        isLoadingMulaiAbsen: false,
        failedAbsen: true,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  logoutMesinAbsen,
  clearStateMesinAbsen,
  clearMulaiAbsen,
  showModalSuccess,
  saveToDbAbsenFailed,
  clearFailedAbsenFromDb,
  clearStatusFailedAbsen,
} = authSlicer.actions;

export default authSlicer.reducer;
