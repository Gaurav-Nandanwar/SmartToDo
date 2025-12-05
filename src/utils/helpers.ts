/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return d.toLocaleDateString('en-US', options);
};

/**
 * Format time to readable string
 */
export const formatTime = (date: string | Date): string => {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };
    return d.toLocaleTimeString('en-US', options);
};

/**
 * Format date and time together
 */
export const formatDateTime = (date: string | Date): string => {
    return `${formatDate(date)} at ${formatTime(date)}`;
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 */
export const getRelativeTime = (date: string | Date): string => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
        return 'Just now';
    } else if (diffMin < 60) {
        return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
        return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
        return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    } else {
        return formatDate(date);
    }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
    // At least 6 characters
    return password.length >= 6;
};

/**
 * Get password strength text
 */
export const getPasswordStrength = (password: string): string => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Too short';
    if (password.length < 8) return 'Weak';
    if (password.length < 12) return 'Medium';
    return 'Strong';
};
