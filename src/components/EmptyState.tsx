import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme } from '../theme';

interface EmptyStateProps {
    icon?: string;
    title: string;
    message: string;
    action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'folder-open-outline',
    title,
    message,
    action,
}) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing.xl,
        },
        iconContainer: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: theme.colors.primary + '15',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
            textAlign: 'center',
        },
        message: {
            fontSize: 16,
            color: theme.colors.onSurface,
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: theme.spacing.lg,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={60} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {action}
        </View>
    );
};

export default EmptyState;
