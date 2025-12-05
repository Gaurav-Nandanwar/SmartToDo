import { Task, Priority, TaskFilter, SortOption } from '../types';

/**
 * Smart sorting algorithm that combines:
 * 1. Priority (High > Medium > Low)
 * 2. Deadline proximity (sooner deadlines first)
 * 3. Creation time (newer tasks first if priority and deadline are equal)
 */
export const smartSort = (tasks: Task[]): Task[] => {
    const priorityWeight = {
        [Priority.HIGH]: 3,
        [Priority.MEDIUM]: 2,
        [Priority.LOW]: 1,
    };

    return [...tasks].sort((a, b) => {
        // First, sort by completion status (incomplete tasks first)
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        // For incomplete tasks, apply smart sorting
        if (!a.completed) {
            // 1. Priority comparison
            const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // 2. Deadline comparison (sooner deadlines first)
            const deadlineA = new Date(a.deadline).getTime();
            const deadlineB = new Date(b.deadline).getTime();
            const deadlineDiff = deadlineA - deadlineB;
            if (deadlineDiff !== 0) return deadlineDiff;

            // 3. Creation time (newer first)
            const createdA = new Date(a.createdAt).getTime();
            const createdB = new Date(b.createdAt).getTime();
            return createdB - createdA;
        }

        // For completed tasks, sort by completion time (most recent first)
        const updatedA = new Date(a.updatedAt).getTime();
        const updatedB = new Date(b.updatedAt).getTime();
        return updatedB - updatedA;
    });
};

/**
 * Sort tasks based on the selected sort option
 */
export const sortTasks = (tasks: Task[], sortBy: SortOption): Task[] => {
    switch (sortBy) {
        case SortOption.SMART:
            return smartSort(tasks);

        case SortOption.DATE_ASC:
            return [...tasks].sort((a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );

        case SortOption.DATE_DESC:
            return [...tasks].sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

        case SortOption.DEADLINE_ASC:
            return [...tasks].sort((a, b) =>
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            );

        case SortOption.DEADLINE_DESC:
            return [...tasks].sort((a, b) =>
                new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
            );

        case SortOption.PRIORITY:
            const priorityWeight = {
                [Priority.HIGH]: 3,
                [Priority.MEDIUM]: 2,
                [Priority.LOW]: 1,
            };
            return [...tasks].sort((a, b) =>
                priorityWeight[b.priority] - priorityWeight[a.priority]
            );

        default:
            return tasks;
    }
};

/**
 * Filter tasks based on the selected filter
 */
export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    switch (filter) {
        case TaskFilter.ALL:
            return tasks;

        case TaskFilter.COMPLETED:
            return tasks.filter(task => task.completed);

        case TaskFilter.PENDING:
            return tasks.filter(task => !task.completed);

        case TaskFilter.HIGH_PRIORITY:
            return tasks.filter(task => task.priority === Priority.HIGH);

        case TaskFilter.MEDIUM_PRIORITY:
            return tasks.filter(task => task.priority === Priority.MEDIUM);

        case TaskFilter.LOW_PRIORITY:
            return tasks.filter(task => task.priority === Priority.LOW);

        case TaskFilter.UPCOMING:
            return tasks.filter(task => {
                const deadline = new Date(task.deadline);
                return !task.completed && deadline >= now && deadline <= nextWeek;
            });

        default:
            return tasks;
    }
};

/**
 * Check if a task is overdue
 */
export const isTaskOverdue = (task: Task): boolean => {
    if (task.completed) return false;
    const deadline = new Date(task.deadline);
    const now = new Date();
    return deadline < now;
};

/**
 * Get the number of days until deadline
 */
export const getDaysUntilDeadline = (task: Task): number => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

/**
 * Format deadline text (e.g., "2 days left", "Overdue by 3 days")
 */
export const formatDeadlineText = (task: Task): string => {
    if (task.completed) return 'Completed';

    const days = getDaysUntilDeadline(task);

    if (days < 0) {
        return `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`;
    } else if (days === 0) {
        return 'Due today';
    } else if (days === 1) {
        return 'Due tomorrow';
    } else if (days <= 7) {
        return `${days} days left`;
    } else {
        const weeks = Math.floor(days / 7);
        return `${weeks} week${weeks !== 1 ? 's' : ''} left`;
    }
};
