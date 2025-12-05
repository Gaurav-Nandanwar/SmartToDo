import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Alert,
    ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, TaskFilter, SortOption } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    fetchTasks,
    deleteTask,
    toggleTaskComplete,
    setFilter,
    setSortBy,
} from '../redux/slices/tasksSlice';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { lightTheme, darkTheme } from '../theme';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { filterTasks, sortTasks } from '../utils/taskUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { tasks, isLoading, filter, sortBy } = useAppSelector((state) => state.tasks);
    const { user } = useAppSelector((state) => state.auth);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const [refreshing, setRefreshing] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            await dispatch(fetchTasks()).unwrap();
        } catch (error: any) {
            Alert.alert('Error', error || 'Failed to load tasks');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    const handleDeleteTask = (taskId: string) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(deleteTask(taskId)).unwrap();
                        } catch (error: any) {
                            Alert.alert('Error', error || 'Failed to delete task');
                        }
                    },
                },
            ]
        );
    };

    const handleToggleComplete = async (task: any) => {
        try {
            await dispatch(toggleTaskComplete(task)).unwrap();
        } catch (error: any) {
            Alert.alert('Error', error || 'Failed to update task');
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(logout());
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    // Apply filters and sorting
    const filteredTasks = filterTasks(tasks, filter);
    const sortedTasks = sortTasks(filteredTasks, sortBy);

    const filterOptions = [
        { label: 'All', value: TaskFilter.ALL, icon: 'apps' },
        { label: 'Pending', value: TaskFilter.PENDING, icon: 'hourglass-outline' },
        { label: 'Completed', value: TaskFilter.COMPLETED, icon: 'checkmark-circle' },
        { label: 'High Priority', value: TaskFilter.HIGH_PRIORITY, icon: 'alert-circle' },
        { label: 'Medium Priority', value: TaskFilter.MEDIUM_PRIORITY, icon: 'alert' },
        { label: 'Low Priority', value: TaskFilter.LOW_PRIORITY, icon: 'information-circle' },
        { label: 'Upcoming', value: TaskFilter.UPCOMING, icon: 'calendar' },
    ];

    const sortOptions = [
        { label: 'Smart Sort', value: SortOption.SMART, icon: 'sparkles' },
        { label: 'Date (Newest)', value: SortOption.DATE_DESC, icon: 'arrow-down' },
        { label: 'Date (Oldest)', value: SortOption.DATE_ASC, icon: 'arrow-up' },
        { label: 'Deadline (Soon)', value: SortOption.DEADLINE_ASC, icon: 'time' },
        { label: 'Deadline (Later)', value: SortOption.DEADLINE_DESC, icon: 'time-outline' },
        { label: 'Priority', value: SortOption.PRIORITY, icon: 'flag' },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            backgroundColor: theme.colors.card,
            paddingTop: 50,
            paddingBottom: 16,
            paddingHorizontal: 20,
            ...theme.shadows.sm,
        },
        headerTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        greeting: {
            fontSize: 28,
            fontWeight: '800',
            color: theme.colors.text,
        },
        headerActions: {
            flexDirection: 'row',
            gap: 12,
        },
        iconButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
        },
        statsContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        statCard: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            padding: 12,
            borderRadius: theme.borderRadius.md,
            alignItems: 'center',
        },
        statNumber: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.primary,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: theme.colors.onSurface,
        },
        filterBar: {
            backgroundColor: theme.colors.card,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        filterRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        filterButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: theme.borderRadius.sm,
        },
        filterButtonActive: {
            backgroundColor: theme.colors.primary,
        },
        filterText: {
            fontSize: 14,
            color: theme.colors.text,
            marginLeft: 6,
            fontWeight: '600',
        },
        filterTextActive: {
            color: '#FFFFFF',
        },
        filterOptions: {
            marginTop: 12,
        },
        filterChipsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 8,
        },
        filterChip: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: theme.borderRadius.sm,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        filterChipActive: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        filterChipText: {
            fontSize: 12,
            color: theme.colors.text,
            marginLeft: 4,
        },
        filterChipTextActive: {
            color: '#FFFFFF',
        },
        content: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 16,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: 12,
        },
        fab: {
            position: 'absolute',
            right: 20,
            bottom: 20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            ...theme.shadows.lg,
        },
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.greeting}>
                        Hi, {user?.name || 'User'}! 👋
                    </Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => dispatch(toggleTheme())}
                        >
                            <Icon
                                name={isDark ? 'sunny' : 'moon'}
                                size={20}
                                color={theme.colors.text}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                            <Icon name="log-out-outline" size={20} color={theme.colors.error} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{totalTasks}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{pendingTasks}</Text>
                        <Text style={styles.statLabel}>Pending</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{completedTasks}</Text>
                        <Text style={styles.statLabel}>Done</Text>
                    </View>
                </View>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                <View style={styles.filterRow}>
                    <TouchableOpacity
                        style={[styles.filterButton]}
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <Icon name="filter" size={16} color={theme.colors.text} />
                        <Text style={styles.filterText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton]}
                        onPress={() => {
                            const currentIndex = sortOptions.findIndex((o) => o.value === sortBy);
                            const nextIndex = (currentIndex + 1) % sortOptions.length;
                            dispatch(setSortBy(sortOptions[nextIndex].value));
                        }}
                    >
                        <Icon name="swap-vertical" size={16} color={theme.colors.text} />
                        <Text style={styles.filterText}>
                            {sortOptions.find((o) => o.value === sortBy)?.label}
                        </Text>
                    </TouchableOpacity>
                </View>

                {showFilters && (
                    <View style={styles.filterOptions}>
                        <View style={styles.filterChipsContainer}>
                            {filterOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.filterChip,
                                        filter === option.value && styles.filterChipActive,
                                    ]}
                                    onPress={() => dispatch(setFilter(option.value))}
                                >
                                    <Icon
                                        name={option.icon}
                                        size={12}
                                        color={
                                            filter === option.value ? '#FFFFFF' : theme.colors.text
                                        }
                                    />
                                    <Text
                                        style={[
                                            styles.filterChipText,
                                            filter === option.value && styles.filterChipTextActive,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>

            {/* Task List */}
            <FlatList
                data={sortedTasks}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => navigation.navigate('EditTask', { taskId: item._id })}
                        onToggleComplete={() => handleToggleComplete(item)}
                        onDelete={() => handleDeleteTask(item._id)}
                    />
                )}
                contentContainerStyle={[
                    styles.content,
                    sortedTasks.length === 0 && { flex: 1 },
                ]}
                ListEmptyComponent={
                    <EmptyState
                        icon="clipboard-outline"
                        title="No Tasks Found"
                        message={
                            filter === TaskFilter.ALL
                                ? "You don't have any tasks yet. Tap the + button to create one!"
                                : 'No tasks match your current filter. Try changing the filter.'
                        }
                        action={
                            filter !== TaskFilter.ALL ? (
                                <Button
                                    title="Clear Filter"
                                    onPress={() => dispatch(setFilter(TaskFilter.ALL))}
                                    variant="outline"
                                />
                            ) : undefined
                        }
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.primary}
                    />
                }
            />

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateTask')}
                activeOpacity={0.8}
            >
                <Icon name="add" size={30} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
