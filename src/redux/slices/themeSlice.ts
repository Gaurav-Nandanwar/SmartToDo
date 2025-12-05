import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
    isDark: boolean;
}

const initialState: ThemeState = {
    isDark: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            AsyncStorage.setItem('theme', state.isDark ? 'dark' : 'light');
        },
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload;
            AsyncStorage.setItem('theme', action.payload ? 'dark' : 'light');
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
