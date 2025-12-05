import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../../services/api';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '../../types';

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await apiService.login(credentials.email, credentials.password);
            // Store token and user data
            await AsyncStorage.setItem('token', response.access_token);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const response = await apiService.register(
                credentials.email,
                credentials.password,
                credentials.name
            );
            // Store token and user data
            await AsyncStorage.setItem('token', response.access_token);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const loadStoredAuth = createAsyncThunk(
    'auth/loadStored',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userStr = await AsyncStorage.getItem('user');

            if (token && userStr) {
                const user = JSON.parse(userStr);
                return { access_token: token, user };
            }
            return null;
        } catch (error) {
            return rejectWithValue('Failed to load stored auth');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.access_token;
            state.user = action.payload.user;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Register
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.access_token;
            state.user = action.payload.user;
            state.error = null;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Load stored auth
        builder.addCase(loadStoredAuth.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = action.payload.access_token;
                state.user = action.payload.user;
            }
        });

        // Logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
