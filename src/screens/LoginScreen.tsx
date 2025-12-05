import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login, clearError } from '../redux/slices/authSlice';
import { lightTheme, darkTheme } from '../theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidEmail } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateForm = (): boolean => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            await dispatch(login({ email, password })).unwrap();
            navigation.replace('Home');
        } catch (err: any) {
            Alert.alert('Login Failed', err || 'Please check your credentials');
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        title: {
            fontSize: 32,
            fontWeight: '800',
            color: '#FFFFFF',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            color: '#FFFFFF',
            opacity: 0.9,
        },
        formContainer: {
            flex: 1,
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 24,
            paddingTop: 32,
            marginTop: -30,
        },
        formTitle: {
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: 8,
        },
        formSubtitle: {
            fontSize: 14,
            color: theme.colors.onSurface,
            marginBottom: 24,
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            marginBottom: 24,
        },
        forgotPasswordText: {
            fontSize: 14,
            color: theme.colors.primary,
            fontWeight: '600',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 32,
        },
        footerText: {
            fontSize: 14,
            color: theme.colors.onSurface,
        },
        signupText: {
            fontSize: 14,
            color: theme.colors.primary,
            fontWeight: '600',
            marginLeft: 4,
        },
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <LinearGradient
                    colors={['#6366F1', '#8B5CF6', '#EC4899']}
                    style={styles.header}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="log-in-outline" size={40} color="#FFFFFF" />
                    </View>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </LinearGradient>

                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Login</Text>
                    <Text style={styles.formSubtitle}>
                        Enter your credentials to access your account
                    </Text>

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon="mail-outline"
                        error={emailError}
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                        error={passwordError}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={isLoading}
                        gradient
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
