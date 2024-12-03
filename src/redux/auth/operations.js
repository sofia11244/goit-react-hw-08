import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistToken, getTokenFromStorage } from '../redux-persist'; //CREATE FOLDER


axios.defaults.baseURL = 'https://connections-api.goit.global/'; // API ana URL'nizi ekleyin.



// Kullanıcı kaydı
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', credentials);
      persistToken(response.data.token); // Token'ı yerel depoda sakla
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Kullanıcı girişi
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      persistToken(response.data.token); // Token'ı yerel depoda sakla
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Kullanıcı çıkışı
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      persistToken(null); // Token'ı temizle
      return;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Kullanıcı bilgisini yenileme
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const token = getTokenFromStorage(); // Yerel depodan token al
      if (!token) {
        return thunkAPI.rejectWithValue('Unable to fetch user'); // Token yoksa hata döndür
      }

      const response = await axios.get('/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);