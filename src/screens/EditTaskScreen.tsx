import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, Priority, UpdateTaskDto } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateTask } from '../redux/slices/tasksSlice';
import { lightTheme, darkTheme, priorityColors } from '../theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { formatDate, formatTime } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

const EditTaskScreen: React.FC<Props> = ({ navigation, route }) => {
    const { taskId } = route.params;
    const dispatch = useAppDispatch();
    const { tasks, isLoading } = useAppSelector((state) => state.tasks);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const task = tasks.find((t) => t._id === taskId);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
    const [category, setCategory] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDate(new Date(task.date));
            setDeadline(new Date(task.deadline));
            setPriority(task.priority);
            setCategory(task.category || '');
        }
    }, [task]);

    const validateForm = (): boolean => {
        let valid = true;

        if (!title.trim()) {
            setTitleError('Title is required');
            valid = false;
        } else {
            setTitleError('');
        }

        if (!description.trim()) {
            setDescriptionError('Description is required');
            valid = false;
        } else {
            setDescriptionError('');
        }

        return valid;
    };

    const handleUpdateTask = async () => {
        if (!validateForm()) return;

        const taskData: UpdateTaskDto = {
            title: title.trim(),
            description: description.trim(),
            date: date.toISOString(),
            deadline: deadline.toISOString(),
            priority,
            category: category.trim() || undefined,
        };

        try {
            await dispatch(updateTask({ id: taskId, data: taskData })).unwrap();
            Alert.alert('Success', 'Task updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error || 'Failed to update task');
        }
    };

    if (!task) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 16,
            backgroundColor: theme.colors.card,
            ...theme.shadows.sm,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.text,
        },
        content: {
            padding: 20,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: 12,
        },
        dateButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
            padding: 16,
            borderRadius: theme.borderRadius.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            ...theme.shadows.sm,
        },
        dateButtonText: {
            flex: 1,
            fontSize: 16,
            color: theme.colors.text,
            marginLeft: 12,
        },
        priorityContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        priorityButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: theme.borderRadius.md,
            borderWidth: 2,
            borderColor: theme.colors.border,
        },
        priorityButtonActive: {
            borderWidth: 2,
        },
        priorityText: {
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 6,
        },
        textArea: {
            height: 100,
            textAlignVertical: 'top',
        },
    });

    const getPriorityColor = (p: Priority) => {
        return priorityColors[p].text;
    };

    const getPriorityBg = (p: Priority) => {
        return isDark ? priorityColors[p].dark : priorityColors[p].light;
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Task</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Input
                    label="Task Title"
                    placeholder="Enter task title"
                    value={title}
                    onChangeText={setTitle}
                    icon="create-outline"
                    error={titleError}
                />

                <Input
                    label="Description"
                    placeholder="Enter task description"
                    value={description}
                    onChangeText={setDescription}
                    icon="document-text-outline"
                    multiline
                    numberOfLines={4}
                    style={styles.textArea}
                    error={descriptionError}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Task Date</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Icon name="calendar" size={20} color={theme.colors.primary} />
                        <Text style={styles.dateButtonText}>
                            {formatDate(date)} at {formatTime(date)}
                        </Text>
                        <Icon name="chevron-forward" size={20} color={theme.colors.onSurface} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deadline</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDeadlinePicker(true)}
                    >
                        <Icon name="time" size={20} color={theme.colors.warning} />
                        <Text style={styles.dateButtonText}>
                            {formatDate(deadline)} at {formatTime(deadline)}
                        </Text>
                        <Icon name="chevron-forward" size={20} color={theme.colors.onSurface} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Priority</Text>
                    <View style={styles.priorityContainer}>
                        {[Priority.HIGH, Priority.MEDIUM, Priority.LOW].map((p) => (
                            <TouchableOpacity
                                key={p}
                                style={[
                                    styles.priorityButton,
                                    priority === p && {
                                        ...styles.priorityButtonActive,
                                        backgroundColor: getPriorityBg(p),
                                        borderColor: getPriorityColor(p),
                                    },
                                ]}
                                onPress={() => setPriority(p)}
                            >
                                <Icon
                                    name="flag"
                                    size={16}
                                    color={priority === p ? getPriorityColor(p) : theme.colors.onSurface}
                                />
                                <Text
                                    style={[
                                        styles.priorityText,
                                        {
                                            color:
                                                priority === p ? getPriorityColor(p) : theme.colors.onSurface,
                                        },
                                    ]}
                                >
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Input
                    label="Category (Optional)"
                    placeholder="e.g., Work, Personal, Shopping"
                    value={category}
                    onChangeText={setCategory}
                    icon="pricetag-outline"
                />

                <Button
                    title="Update Task"
                    onPress={handleUpdateTask}
                    loading={isLoading}
                    gradient
                    style={{ marginTop: 8, marginBottom: 32 }}
                />
            </ScrollView>

            <DatePicker
                modal
                open={showDatePicker}
                date={date}
                onConfirm={(selectedDate) => {
                    setShowDatePicker(false);
                    setDate(selectedDate);
                }}
                onCancel={() => setShowDatePicker(false)}
                theme={isDark ? 'dark' : 'light'}
            />

            <DatePicker
                modal
                open={showDeadlinePicker}
                date={deadline}
                minimumDate={new Date()}
                onConfirm={(selectedDate) => {
                    setShowDeadlinePicker(false);
                    setDeadline(selectedDate);
                }}
                onCancel={() => setShowDeadlinePicker(false)}
                theme={isDark ? 'dark' : 'light'}
            />
        </KeyboardAvoidingView>
    );
};

export default EditTaskScreen;
