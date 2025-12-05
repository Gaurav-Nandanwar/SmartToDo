// User Types
export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

// Task Types
export enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    date: string;
    deadline: string;
    priority: Priority;
    completed: boolean;
    category?: string;
    tags?: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    date: string;
    deadline: string;
    priority: Priority;
    category?: string;
    tags?: string[];
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
    completed?: boolean;
}

export interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    filter: TaskFilter;
    sortBy: SortOption;
}

export enum TaskFilter {
    ALL = 'all',
    COMPLETED = 'completed',
    PENDING = 'pending',
    HIGH_PRIORITY = 'high',
    MEDIUM_PRIORITY = 'medium',
    LOW_PRIORITY = 'low',
    UPCOMING = 'upcoming',
}

export enum SortOption {
    DATE_ASC = 'date_asc',
    DATE_DESC = 'date_desc',
    DEADLINE_ASC = 'deadline_asc',
    DEADLINE_DESC = 'deadline_desc',
    PRIORITY = 'priority',
    SMART = 'smart', // Combined sorting: time + deadline + priority
}

// Navigation Types
export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    TaskDetail: { taskId: string };
    CreateTask: undefined;
    EditTask: { taskId: string };
    Settings: undefined;
};

// Theme Types
export interface Theme {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        card: string;
        text: string;
        border: string;
        notification: string;
        error: string;
        success: string;
        warning: string;
        info: string;
        surface: string;
        onSurface: string;
        disabled: string;
        placeholder: string;
        backdrop: string;
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    shadows: {
        sm: object;
        md: object;
        lg: object;
    };
}
