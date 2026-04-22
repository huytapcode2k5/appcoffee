// screens/DetailItemScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, SafeAreaView, StatusBar, Animated,
} from 'react-native';

// ── Map ảnh trực tiếp, không cần file images.js ──────────
const imageMap = {
    caffe_mocha: require('../assets/coffee4.png'),
    flat_white: require('../assets/coffee3.png'),
    cappuccino: require('../assets/coffee2.png'),
    americano: require('../assets/coffe1.png'),
};

const BROWN = '#C07942';
const BG = '#F7F4F0';
const WHITE = '#FFFFFF';
const DARK = '#1A1009';
const GRAY = '#9B9B9B';
const BORDER = '#EBEBEB';
const sizes = ['S', 'M', 'L'];

export default function DetailItemScreen({ item, onBack }) {
    const [selectedSize, setSelectedSize] = useState('M');
    const [wished, setWished] = useState(false);
    const heartScale = useRef(new Animated.Value(1)).current;
    const slideY = useRef(new Animated.Value(30)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const btnScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideY, { toValue: 0, duration: 500, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ]).start();
    }, []);

    const toggleWish = () => {
        setWished(w => !w);
        Animated.sequence([
            Animated.spring(heartScale, { toValue: 1.35, useNativeDriver: true, speed: 30 }),
            Animated.spring(heartScale, { toValue: 1, useNativeDriver: true, speed: 30 }),
        ]).start();
    };

    const onPressIn = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true, speed: 25 }).start();
    const onPressOut = () => Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 25 }).start();

    if (!item) return null;

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />

            {/* Top bar */}
            <View style={s.topBar}>
                <TouchableOpacity style={s.iconBtn} onPress={onBack}>
                    <Text style={s.iconText}>‹</Text>
                </TouchableOpacity>
                <Text style={s.topTitle}>Detail</Text>
                <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                    <TouchableOpacity style={s.iconBtn} onPress={toggleWish}>
                        <Text style={[s.wishIcon, wished && s.wishActive]}>{wished ? '♥' : '♡'}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                style={{ opacity, transform: [{ translateY: slideY }] }}
            >
                {/* Hero image */}
                <View style={s.heroBox}>
                    <Image source={imageMap[item.image]} style={s.heroImg} resizeMode="cover" />
                </View>

                <View style={s.body}>
                    {/* Name row */}
                    <View style={s.nameRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={s.productName}>{item.name}</Text>
                            <Text style={s.productSub}>{item.sub}</Text>
                        </View>
                        <View style={s.propIcons}>
                            <View style={s.propIconBox}><Text style={s.propEmoji}>🍵</Text></View>
                            <View style={s.propIconBox}><Text style={s.propEmoji}>🫧</Text></View>
                            <View style={s.propIconBox}><Text style={s.propEmoji}>🧊</Text></View>
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={s.ratingRow}>
                        <Text style={s.ratingStar}>★</Text>
                        <Text style={s.ratingNum}>{item.rating}</Text>
                        <Text style={s.ratingCount}>({item.reviews})</Text>
                    </View>

                    <View style={s.divider} />

                    {/* Description */}
                    <Text style={s.sectionLabel}>Description</Text>
                    <Text style={s.descText}>
                        {item.description}{' '}
                        <Text style={s.readMore}>Read More</Text>
                    </Text>

                    <View style={s.divider} />

                    {/* Size */}
                    <Text style={s.sectionLabel}>Size</Text>
                    <View style={s.sizeRow}>
                        {sizes.map(sz => (
                            <TouchableOpacity
                                key={sz}
                                style={[s.sizeBtn, selectedSize === sz && s.sizeBtnActive]}
                                onPress={() => setSelectedSize(sz)}
                            >
                                <Text style={[s.sizeBtnText, selectedSize === sz && s.sizeBtnTextActive]}>{sz}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>

            {/* Footer */}
            <View style={s.footer}>
                <View style={s.priceBox}>
                    <Text style={s.priceLabel}>Price</Text>
                    <Text style={s.priceValue}>{item.price}</Text>
                </View>
                <Animated.View style={[s.buyBtnWrap, { transform: [{ scale: btnScale }] }]}>
                    <TouchableOpacity
                        style={s.buyBtn}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        activeOpacity={1}
                    >
                        <Text style={s.buyBtnText}>Buy Now</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: BG },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: BG },
    topTitle: { fontSize: 17, fontWeight: '700', color: DARK },
    iconBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: BORDER, backgroundColor: WHITE, justifyContent: 'center', alignItems: 'center' },
    iconText: { fontSize: 24, color: DARK, fontWeight: '300' },
    wishIcon: { fontSize: 20, color: '#ccc' },
    wishActive: { color: '#E53935' },
    heroBox: { marginHorizontal: 16, borderRadius: 22, overflow: 'hidden', height: 220, marginBottom: 20, elevation: 10 },
    heroImg: { width: '100%', height: '100%' },
    body: { paddingHorizontal: 20 },
    nameRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
    productName: { fontSize: 24, fontWeight: '800', color: DARK, marginBottom: 2 },
    productSub: { fontSize: 13, color: GRAY },
    propIcons: { flexDirection: 'row', gap: 8, marginTop: 4 },
    propIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FDF0E6', justifyContent: 'center', alignItems: 'center' },
    propEmoji: { fontSize: 18 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 4 },
    ratingStar: { fontSize: 16, color: '#F4A636' },
    ratingNum: { fontSize: 15, fontWeight: '700', color: DARK },
    ratingCount: { fontSize: 13, color: GRAY },
    divider: { height: 1, backgroundColor: BORDER, marginVertical: 14 },
    sectionLabel: { fontSize: 16, fontWeight: '700', color: DARK, marginBottom: 8 },
    descText: { fontSize: 13, color: GRAY, lineHeight: 21, marginBottom: 4 },
    readMore: { color: BROWN, fontWeight: '700' },
    sizeRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
    sizeBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5, borderColor: BORDER, backgroundColor: WHITE, alignItems: 'center' },
    sizeBtnActive: { borderColor: BROWN, backgroundColor: '#FDF0E6' },
    sizeBtnText: { fontSize: 15, fontWeight: '600', color: GRAY },
    sizeBtnTextActive: { color: BROWN },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 30, borderTopWidth: 1, borderTopColor: BORDER, elevation: 15, gap: 20 },
    priceBox: { flex: 0 },
    priceLabel: { fontSize: 12, color: GRAY, marginBottom: 2 },
    priceValue: { fontSize: 24, fontWeight: '800', color: BROWN },
    buyBtnWrap: { flex: 1 },
    buyBtn: { backgroundColor: BROWN, borderRadius: 16, paddingVertical: 17, alignItems: 'center', elevation: 8 },
    buyBtnText: { color: WHITE, fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
});