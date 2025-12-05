import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: string;
    rightIcon?: string;
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    secureTextEntry,
    ...props
}) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const styles = StyleSheet.create({
        container: {
            marginBottom: theme.spacing.md,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            borderWidth: 1,
            borderColor: error ? theme.colors.error : theme.colors.border,
            paddingHorizontal: theme.spacing.md,
            ...theme.shadows.sm,
        },
        input: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            fontSize: 16,
            color: theme.colors.text,
        },
        icon: {
            marginRight: theme.spacing.sm,
        },
        rightIcon: {
            marginLeft: theme.spacing.sm,
        },
        error: {
            fontSize: 12,
            color: theme.colors.error,
            marginTop: theme.spacing.xs,
        },
    });

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && (
                    <Icon
                        name={icon}
                        size={20}
                        color={theme.colors.onSurface}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.colors.placeholder}
                    secureTextEntry={isSecure}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Icon
                            name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={theme.colors.onSurface}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <TouchableOpacity onPress={onRightIconPress}>
                        <Icon
                            name={rightIcon}
                            size={20}
                            color={theme.colors.onSurface}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default Input;
