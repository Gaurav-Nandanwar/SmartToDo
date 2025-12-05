import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api.config';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add token
        this.api.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid, clear storage
                    await AsyncStorage.multiRemove(['token', 'user']);
                }
                return Promise.reject(error);
            }
        );
    }

    // Auth endpoints
    async login(email: string, password: string) {
        const response = await this.api.post('/auth/login', { email, password });
        return response.data;
    }

    async register(email: string, password: string, name?: string) {
        const response = await this.api.post('/auth/register', { email, password, name });
        return response.data;
    }

    // Task endpoints
    async getTasks() {
        const response = await this.api.get('/tasks');
        return response.data;
    }

    async createTask(taskData: any) {
        const response = await this.api.post('/tasks', taskData);
        return response.data;
    }

    async updateTask(taskId: string, taskData: any) {
        const response = await this.api.put(`/tasks/${taskId}`, taskData);
        return response.data;
    }

    async deleteTask(taskId: string) {
        const response = await this.api.delete(`/tasks/${taskId}`);
        return response.data;
    }

    async getTaskById(taskId: string) {
        const response = await this.api.get(`/tasks/${taskId}`);
        return response.data;
    }
}

export default new ApiService();
