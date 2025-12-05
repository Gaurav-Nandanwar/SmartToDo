import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../redux/hooks';
import { lightTheme, darkTheme, priorityColors } from '../theme';
import { Task, Priority } from '../types';
import { formatDate, formatTime } from '../utils/helpers';
import { isTaskOverdue, formatDeadlineText } from '../utils/taskUtils';

interface TaskCardProps {
    task: Task;
    onPress: () => void;
    onToggleComplete: () => void;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onPress,
    onToggleComplete,
    onDelete,
}) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getPriorityColor = () => {
        const colors = priorityColors[task.priority];
        return isDark ? colors.dark : colors.light;
    };

    const getPriorityTextColor = () => {
        return priorityColors[task.priority].text;
    };

    const getPriorityLabel = () => {
        return task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    };

    const overdue = isTaskOverdue(task);
    const deadlineText = formatDeadlineText(task);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            marginBottom: theme.spacing.md,
            ...theme.shadows.md,
            borderLeftWidth: 4,
            borderLeftColor: task.completed
                ? theme.colors.success
                : overdue
                    ? theme.colors.error
                    : getPriorityTextColor(),
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: theme.spacing.sm,
        },
        titleContainer: {
            flex: 1,
            marginRight: theme.spacing.sm,
        },
        title: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
            textDecorationLine: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.6 : 1,
        },
        description: {
            fontSize: 14,
            color: theme.colors.onSurface,
            lineHeight: 20,
            opacity: task.completed ? 0.5 : 1,
        },
        checkboxContainer: {
            marginTop: 2,
        },
        checkbox: {
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: task.completed ? theme.colors.success : theme.colors.border,
            backgroundColor: task.completed ? theme.colors.success : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        },
        metaContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: theme.spacing.sm,
            gap: theme.spacing.sm,
        },
        priorityBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: getPriorityColor(),
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 4,
            borderRadius: theme.borderRadius.sm,
        },
        priorityText: {
            fontSize: 12,
            fontWeight: '600',
            color: getPriorityTextColor(),
            marginLeft: 4,
        },
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        dateText: {
            fontSize: 12,
            color: theme.colors.onSurface,
            marginLeft: 4,
        },
        deadlineContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        deadlineText: {
            fontSize: 12,
            fontWeight: '600',
            color: task.completed
                ? theme.colors.success
                : overdue
                    ? theme.colors.error
                    : theme.colors.warning,
            marginLeft: 4,
        },
        categoryContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.primary + '20',
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: 4,
            borderRadius: theme.borderRadius.sm,
        },
        categoryText: {
            fontSize: 12,
            color: theme.colors.primary,
            marginLeft: 4,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
        },
        deleteButton: {
            padding: theme.spacing.xs,
        },
    });

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2}>
                                {task.title}
                            </Text>
                            {task.description && (
                                <Text style={styles.description} numberOfLines={2}>
                                    {task.description}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={onToggleComplete}
                            style={styles.checkboxContainer}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <View style={styles.checkbox}>
                                {task.completed && (
                                    <Icon name="checkmark" size={18} color="#FFFFFF" />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.metaContainer}>
                        <View style={styles.priorityBadge}>
                            <Icon
                                name="flag"
                                size={12}
                                color={getPriorityTextColor()}
                            />
                            <Text style={styles.priorityText}>{getPriorityLabel()}</Text>
                        </View>

                        <View style={styles.dateContainer}>
                            <Icon
                                name="calendar-outline"
                                size={12}
                                color={theme.colors.onSurface}
                            />
                            <Text style={styles.dateText}>{formatDate(task.date)}</Text>
                        </View>

                        <View style={styles.deadlineContainer}>
                            <Icon
                                name={overdue ? 'alert-circle' : 'time-outline'}
                                size={12}
                                color={
                                    task.completed
                                        ? theme.colors.success
                                        : overdue
                                            ? theme.colors.error
                                            : theme.colors.warning
                                }
                            />
                            <Text style={styles.deadlineText}>{deadlineText}</Text>
                        </View>

                        {task.category && (
                            <View style={styles.categoryContainer}>
                                <Icon name="pricetag" size={12} color={theme.colors.primary} />
                                <Text style={styles.categoryText}>{task.category}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={onDelete}
                            style={styles.deleteButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Icon name="trash-outline" size={20} color={theme.colors.error} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default TaskCard;
