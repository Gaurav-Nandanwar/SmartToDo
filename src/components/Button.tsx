import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    gradient?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    style,
    textStyle,
    gradient = false,
}) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: theme.borderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        };

        // Size
        const sizeStyles: Record<string, ViewStyle> = {
            small: { paddingVertical: 8, paddingHorizontal: 16 },
            medium: { paddingVertical: 12, paddingHorizontal: 24 },
            large: { paddingVertical: 16, paddingHorizontal: 32 },
        };

        // Variant
        const variantStyles: Record<string, ViewStyle> = {
            primary: {
                backgroundColor: theme.colors.primary,
            },
            secondary: {
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: theme.colors.primary,
            },
            danger: {
                backgroundColor: theme.colors.error,
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            opacity: disabled ? 0.5 : 1,
        };
    };

    const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
            fontWeight: '600',
        };

        const sizeStyles: Record<string, TextStyle> = {
            small: { fontSize: 14 },
            medium: { fontSize: 16 },
            large: { fontSize: 18 },
        };

        const variantStyles: Record<string, TextStyle> = {
            primary: { color: '#FFFFFF' },
            secondary: { color: theme.colors.text },
            outline: { color: theme.colors.primary },
            danger: { color: '#FFFFFF' },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    const buttonContent = (
        <>
            {loading && (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'secondary' ? theme.colors.primary : '#FFFFFF'}
                    style={{ marginRight: 8 }}
                />
            )}
            <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
    );

    if (gradient && variant === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.7}
                style={style}
            >
                <LinearGradient
                    colors={['#6366F1', '#8B5CF6', '#EC4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[getButtonStyle(), { backgroundColor: 'transparent' }]}
                >
                    {buttonContent}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[getButtonStyle(), style]}
        >
            {buttonContent}
        </TouchableOpacity>
    );
};

export default Button;
