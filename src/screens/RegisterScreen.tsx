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
import { register } from '../redux/slices/authSlice';
import { lightTheme, darkTheme } from '../theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { isValidEmail, getPasswordStrength } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const theme = isDark ? darkTheme : lightTheme;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateForm = (): boolean => {
        let valid = true;

        if (!name.trim()) {
            setNameError('Name is required');
            valid = false;
        } else {
            setNameError('');
        }

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

        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        return valid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            await dispatch(register({ email, password, name })).unwrap();
            navigation.replace('Home');
        } catch (err: any) {
            Alert.alert('Registration Failed', err || 'Please try again');
        }
    };

    const passwordStrength = getPasswordStrength(password);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            height: 220,
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
        passwordStrength: {
            fontSize: 12,
            marginTop: -12,
            marginBottom: 16,
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
        loginText: {
            fontSize: 14,
            color: theme.colors.primary,
            fontWeight: '600',
            marginLeft: 4,
        },
    });

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 'Strong') return theme.colors.success;
        if (passwordStrength === 'Medium') return theme.colors.warning;
        return theme.colors.error;
    };

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
                        <Icon name="person-add-outline" size={40} color="#FFFFFF" />
                    </View>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </LinearGradient>

                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Register</Text>
                    <Text style={styles.formSubtitle}>
                        Fill in the details to create your account
                    </Text>

                    <Input
                        label="Full Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                        icon="person-outline"
                        error={nameError}
                    />

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
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                        error={passwordError}
                    />
                    {password.length > 0 && (
                        <Text
                            style={[
                                styles.passwordStrength,
                                { color: getPasswordStrengthColor() },
                            ]}
                        >
                            Password strength: {passwordStrength}
                        </Text>
                    )}

                    <Input
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                        error={confirmPasswordError}
                    />

                    <Button
                        title="Create Account"
                        onPress={handleRegister}
                        loading={isLoading}
                        gradient
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
