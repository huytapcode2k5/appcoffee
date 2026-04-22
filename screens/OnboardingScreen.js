// screens/OnboardingScreen.js
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Animated,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BROWN = '#C07942';
const BROWN_DARK = '#A0612E';
const WHITE = '#FFFFFF';

export default function OnboardingScreen({ onGetStarted }) {
    // Animation values
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslate = useRef(new Animated.Value(40)).current;
    const subOpacity = useRef(new Animated.Value(0)).current;
    const subTranslate = useRef(new Animated.Value(30)).current;
    const btnOpacity = useRef(new Animated.Value(0)).current;
    const btnTranslate = useRef(new Animated.Value(30)).current;
    const btnScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.stagger(180, [
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(titleTranslate, { toValue: 0, duration: 700, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(subOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(subTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(btnOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(btnTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(btnScale, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 20,
            bounciness: 6,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(btnScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 6,
        }).start();
    };

    return (
        <View style={s.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Full-screen background image */}
            <ImageBackground
                source={require('../assets/onboarding.png')}
                style={s.bgImage}
                resizeMode="cover"
            >
                {/* Dark gradient overlay — bottom half */}
                <View style={s.overlay} />

                <SafeAreaView style={s.safe}>
                    {/* Bottom content area */}
                    <View style={s.content}>

                        {/* Title */}
                        <Animated.Text
                            style={[
                                s.title,
                                {
                                    opacity: titleOpacity,
                                    transform: [{ translateY: titleTranslate }],
                                },
                            ]}
                        >
                            Fall in Love with{'\n'}Coffee in Blissful{'\n'}Delight!
                        </Animated.Text>

                        {/* Subtitle */}
                        <Animated.Text
                            style={[
                                s.subtitle,
                                {
                                    opacity: subOpacity,
                                    transform: [{ translateY: subTranslate }],
                                },
                            ]}
                        >
                            Welcome to our cozy coffee corner, where{'\n'}every cup is a delightful for you.
                        </Animated.Text>

                        {/* Get Started Button */}
                        <Animated.View
                            style={{
                                opacity: btnOpacity,
                                transform: [
                                    { translateY: btnTranslate },
                                    { scale: btnScale },
                                ],
                            }}
                        >
                            <TouchableOpacity
                                style={s.btn}
                                onPress={onGetStarted}
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                activeOpacity={1}
                            >
                                <Text style={s.btnText}>Get Started</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Home indicator spacer */}
                        <View style={s.homeIndicator}>
                            <View style={s.homeBar} />
                        </View>

                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A0F08',
    },

    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    // Dark gradient overlay covering bottom ~55% of screen
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.58,
        // Simulated gradient: dark at bottom, transparent at top
        // For true gradient use expo-linear-gradient:
        // background: LinearGradient colors={['transparent','rgba(15,8,3,0.85)','#0F0803']}
        backgroundColor: 'transparent',
        // Layered shadows trick for gradient feel
        borderTopWidth: 0,
        shadowColor: '#0F0803',
        shadowOffset: { width: 0, height: -40 },
        shadowOpacity: 1,
        shadowRadius: 60,
        elevation: 0,
        // Use a solid dark at very bottom
        background: 'linear-gradient(transparent, #0F0803)',
    },

    safe: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    content: {
        paddingHorizontal: 28,
        paddingBottom: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: WHITE,
        lineHeight: 42,
        letterSpacing: 0.2,
        marginBottom: 14,
        // Shadow for legibility over image
        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },

    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.72)',
        lineHeight: 22,
        letterSpacing: 0.1,
        marginBottom: 32,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    btn: {
        backgroundColor: BROWN,
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        // Glow effect
        shadowColor: BROWN_DARK,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.55,
        shadowRadius: 14,
        elevation: 10,
        // Subtle border for depth
        borderWidth: 1,
        borderColor: 'rgba(220,160,100,0.25)',
    },

    btnText: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    homeIndicator: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 4,
    },
    homeBar: {
        width: 134,
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
});