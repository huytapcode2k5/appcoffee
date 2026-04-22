// screens/CoffeeHomeScreen.js
import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, Image, FlatList, SafeAreaView, StatusBar,
    Animated, Dimensions,
} from 'react-native';
import data from '../data.json';

const { width } = Dimensions.get('window');
const BROWN = '#C07942';
const BG = '#1A1009';
const CARD_BG = '#241710';
const DARK_CARD = '#2C1A0E';
const WHITE = '#FFFFFF';
const GRAY = 'rgba(255,255,255,0.5)';

// ── Map ảnh trực tiếp, không cần file images.js ──────────
const imageMap = {
    caffe_mocha: require('../assets/coffee4.png'),
    flat_white: require('../assets/coffee3.png'),
    cappuccino: require('../assets/coffee2.png'),
    americano: require('../assets/coffe1.png'),
}
const bannerImg = require('../assets/Banner.png');
const tabs = [
    { icon: '🏠', label: 'Home' },
    { icon: '♡', label: 'Favourite' },
    { icon: '🛒', label: 'Cart' },
    { icon: '🔔', label: 'Notify' },
];

function BottomTab({ active, setActive }) {
    return (
        <View style={s.bottomTab}>
            {tabs.map((t, i) => (
                <TouchableOpacity key={t.label} style={s.tabItem} onPress={() => setActive(i)}>
                    <Text style={[s.tabIcon, active === i && s.tabIconActive]}>{t.icon}</Text>
                    {active === i && <View style={s.tabDot} />}
                </TouchableOpacity>
            ))}
        </View>
    );
}

function CoffeeCard({ item, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;
    const onPressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 25 }).start();
    const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 25 }).start();

    return (
        <Animated.View style={{ transform: [{ scale }], width: (width - 48) / 2 }}>
            <TouchableOpacity
                style={s.card}
                onPress={() => onPress && onPress(item)}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={1}
            >
                <View style={s.cardImgBox}>
                    <Image source={imageMap[item.image]} style={s.cardImg} resizeMode="cover" />
                    <View style={s.ratingBadge}>
                        <Text style={s.ratingStar}>★</Text>
                        <Text style={s.ratingText}>{item.rating}</Text>
                    </View>
                </View>
                <View style={s.cardBody}>
                    <Text style={s.cardName}>{item.name}</Text>
                    <Text style={s.cardSub}>{item.sub}</Text>
                    <View style={s.cardFooter}>
                        <Text style={s.cardPrice}>{item.price}</Text>
                        <TouchableOpacity style={s.addBtn}>
                            <Text style={s.addBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default function CoffeeHomeScreen({ onSelectItem }) {
    const [activeTab, setActiveTab] = useState(0);
    const [activeCat, setActiveCat] = useState('0');
    const [searchText, setSearchText] = useState('');

    const filteredList = data.coffeeList.filter(item => {
        const matchCat = activeCat === '0' || item.category === activeCat;
        const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="light-content" backgroundColor={BG} />
            <View style={s.root}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>

                    {/* Header */}
                    <View style={s.header}>
                        <View>
                            <Text style={s.locationLabel}>Location</Text>
                            <TouchableOpacity style={s.locationRow}>
                                <Text style={s.locationName}>{data.user.name}</Text>
                                <Text style={s.locationChevron}> ∨</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={s.avatarBtn}>
                            <Image source={imageMap[data.user.avatar]} style={s.avatar} />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View style={s.searchRow}>
                        <View style={s.searchBar}>
                            <Text style={s.searchIcon}>🔍</Text>
                            <TextInput
                                style={s.searchInput}
                                placeholder="Search coffee"
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                        <TouchableOpacity style={s.filterBtn}>
                            <Text style={s.filterIcon}>⇅</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Promo Banner */}
                    <View style={s.promoBanner}>
                        <Image source={bannerImg} style={s.promoBannerImg} resizeMode="cover" />
                        <View style={s.promoOverlay}>
                            <View style={s.promoBadge}>
                                <Text style={s.promoBadgeText}>{data.promo.badge}</Text>
                            </View>
                            <Text style={s.promoTitle}>{data.promo.title}</Text>
                        </View>
                    </View>

                    {/* Category tabs */}
                    <FlatList
                        data={data.categories}
                        keyExtractor={c => c.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={s.catList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[s.catChip, activeCat === item.id && s.catChipActive]}
                                onPress={() => setActiveCat(item.id)}
                            >
                                <Text style={[s.catLabel, activeCat === item.id && s.catLabelActive]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    {/* Coffee grid */}
                    <View style={s.grid}>
                        {filteredList.map(item => (
                            <CoffeeCard key={item.id} item={item} onPress={onSelectItem} />
                        ))}
                    </View>

                </ScrollView>
                <BottomTab active={activeTab} setActive={setActiveTab} />
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: BG },
    root: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 },
    locationLabel: { fontSize: 12, color: GRAY, marginBottom: 2 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    locationName: { fontSize: 16, fontWeight: '700', color: WHITE },
    locationChevron: { fontSize: 14, color: WHITE },
    avatarBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', borderWidth: 2, borderColor: BROWN },
    avatar: { width: 44, height: 44 },
    searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, gap: 12 },
    searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: CARD_BG, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
    searchIcon: { fontSize: 15, marginRight: 8 },
    searchInput: { flex: 1, fontSize: 14, color: WHITE },
    filterBtn: { width: 48, height: 48, borderRadius: 14, backgroundColor: BROWN, justifyContent: 'center', alignItems: 'center', elevation: 6 },
    filterIcon: { fontSize: 18, color: WHITE },
    promoBanner: { marginHorizontal: 20, marginBottom: 24, borderRadius: 20, backgroundColor: DARK_CARD, overflow: 'hidden', minHeight: 140 },
    promoBannerImg: { width: '100%', height: 140, position: 'absolute', top: 0, left: 0 },
    promoOverlay: { flex: 1, paddingHorizontal: 20, paddingVertical: 22, minHeight: 140, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.30)' },
    promoLeft: { flex: 1 },
    promoBadge: { backgroundColor: '#E53935', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 10 },
    promoBadgeText: { color: WHITE, fontSize: 12, fontWeight: '700' },
    promoTitle: { fontSize: 22, fontWeight: '800', color: WHITE, lineHeight: 30 },
    promoImg: { width: 160, height: 140, marginRight: -10 },
    catList: { paddingHorizontal: 20, gap: 10, marginBottom: 20 },
    catChip: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 30, backgroundColor: CARD_BG },
    catChipActive: { backgroundColor: BROWN },
    catLabel: { fontSize: 13, fontWeight: '600', color: GRAY },
    catLabelActive: { color: WHITE },
    grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 16 },
    card: { backgroundColor: CARD_BG, borderRadius: 20, overflow: 'hidden' },
    cardImgBox: { width: '100%', height: 140, position: 'relative' },
    cardImg: { width: '100%', height: '100%' },
    ratingBadge: { position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4, gap: 3 },
    ratingStar: { fontSize: 11, color: '#F4A636' },
    ratingText: { fontSize: 11, fontWeight: '700', color: WHITE },
    cardBody: { padding: 12 },
    cardName: { fontSize: 14, fontWeight: '700', color: WHITE, marginBottom: 2 },
    cardSub: { fontSize: 12, color: GRAY, marginBottom: 12 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardPrice: { fontSize: 16, fontWeight: '800', color: WHITE },
    addBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: BROWN, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    addBtnText: { color: WHITE, fontSize: 20, lineHeight: 24, fontWeight: '600' },
    bottomTab: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: CARD_BG, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingBottom: 20, paddingTop: 12, elevation: 20 },
    tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    tabIcon: { fontSize: 22, color: GRAY },
    tabIconActive: { color: BROWN },
    tabDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: BROWN, marginTop: 4 },
});