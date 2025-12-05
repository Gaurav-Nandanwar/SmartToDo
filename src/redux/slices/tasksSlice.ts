import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import {
    TasksState,
    Task,
    CreateTaskDto,
    UpdateTaskDto,
    TaskFilter,
    SortOption,
    Priority,
} from '../../types';

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
    filter: TaskFilter.ALL,
    sortBy: SortOption.SMART,
};

// Async thunks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const tasks = await apiService.getTasks();
            return tasks;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData: CreateTaskDto, { rejectWithValue }) => {
        try {
            const task = await apiService.createTask(taskData);
            return task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ id, data }: { id: string; data: UpdateTaskDto }, { rejectWithValue }) => {
        try {
            const task = await apiService.updateTask(id, data);
            return task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update task');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (taskId: string, { rejectWithValue }) => {
        try {
            await apiService.deleteTask(taskId);
            return taskId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
        }
    }
);

export const toggleTaskComplete = createAsyncThunk(
    'tasks/toggleComplete',
    async (task: Task, { rejectWithValue }) => {
        try {
            const updatedTask = await apiService.updateTask(task._id, {
                completed: !task.completed,
            });
            return updatedTask;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to toggle task');
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TaskFilter>) => {
            state.filter = action.payload;
        },
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch tasks
        builder.addCase(fetchTasks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload;
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Create task
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload);
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Update task
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((t) => t._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        });

        // Delete task
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        });

        // Toggle complete
        builder.addCase(toggleTaskComplete.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((t) => t._id === action.payload._id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        });
    },
});

export const { setFilter, setSortBy, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
