import { Theme } from '../types';

export const lightTheme: Theme = {
    dark: false,
    colors: {
        primary: '#6366F1', // Indigo
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#1E293B',
        border: '#E2E8F0',
        notification: '#EF4444',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        info: '#3B82F6',
        surface: '#FFFFFF',
        onSurface: '#64748B',
        disabled: '#CBD5E1',
        placeholder: '#94A3B8',
        backdrop: 'rgba(0, 0, 0, 0.5)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
        },
    },
};

export const darkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#818CF8', // Lighter Indigo for dark mode
        background: '#0F172A',
        card: '#1E293B',
        text: '#F1F5F9',
        border: '#334155',
        notification: '#F87171',
        error: '#F87171',
        success: '#34D399',
        warning: '#FBBF24',
        info: '#60A5FA',
        surface: '#1E293B',
        onSurface: '#94A3B8',
        disabled: '#475569',
        placeholder: '#64748B',
        backdrop: 'rgba(0, 0, 0, 0.7)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
        },
    },
};

// Priority colors
export const priorityColors = {
    high: {
        light: '#FEE2E2',
        dark: '#7F1D1D',
        text: '#DC2626',
    },
    medium: {
        light: '#FEF3C7',
        dark: '#78350F',
        text: '#F59E0B',
    },
    low: {
        light: '#DBEAFE',
        dark: '#1E3A8A',
        text: '#3B82F6',
    },
};

// Category colors
export const categoryColors = [
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
];
