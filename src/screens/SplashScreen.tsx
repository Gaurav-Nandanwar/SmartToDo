import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadStoredAuth } from '../redux/slices/authSlice';
import { setTheme } from '../redux/slices/themeSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        // Animate logo
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Check for stored auth and theme
        const initializeApp = async () => {
            try {
                // Load theme preference
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme) {
                    dispatch(setTheme(storedTheme === 'dark'));
                }

                // Load stored auth
                const authResult = await dispatch(loadStoredAuth()).unwrap();

                // Wait for minimum animation time
                setTimeout(() => {
                    if (authResult?.access_token) {
                        navigation.replace('Home');
                    } else {
                        navigation.replace('Login');
                    }
                }, 2000);
            } catch (error) {
                // Error loading auth, go to login
                setTimeout(() => {
                    navigation.replace('Login');
                }, 2000);
            }
        };

        initializeApp();
    }, []);

    return (
        <LinearGradient
            colors={['#6366F1', '#8B5CF6', '#EC4899']}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.iconContainer}>
                    <Icon name="checkmark-done-circle" size={80} color="#FFFFFF" />
                </View>
                <Text style={styles.title}>SmartToDo</Text>
                <Text style={styles.subtitle}>Organize your life, smartly</Text>
            </Animated.View>

            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.9,
        fontWeight: '400',
    },
    footer: {
        position: 'absolute',
        bottom: 60,
    },
});

export default SplashScreen;
