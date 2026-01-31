import { ThemeToggle } from '@/components/ThemeToggle';
import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { G, Path, Polygon } from 'react-native-svg';

export default function PatientDashboard() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    // TODO: Clear any stored auth tokens/user data
    router.replace('/login');
  };

  const dashboardCards = [
    {
      id: 1,
      title: 'Start Assessment',
      description: 'Understand your dosha balance',
      icon: 'clipboard-outline',
      route: '/patient/assessment',
      color: '#D5E3D2' // Darker sage green
    },
    {
      id: 2,
      title: 'Daily Health Log',
      description: "Track today's health",
      icon: 'heart-outline',
      route: '/patient/health-log',
      color: '#F4F1F8' // Light lavender
    },
    {
      id: 3,
      title: 'View Results',
      description: 'View dosha analysis',
      icon: 'trending-up-outline',
      route: '/patient/results',
      color: '#D9CEE8' // Darker lavender
    },
    {
      id: 4,
      title: 'Health History',
      description: 'Past records & notes',
      icon: 'time-outline',
      route: '/patient/history',
      color: '#E8F0E5' // Light sage green
    }
  ];

  // Hexagon component
  const Hexagon = ({ x, y, size, fill, strokeColor, strokeWidth = 2, opacity = 1 }: any) => {
    const height = size * Math.sqrt(3);
    const points = [
      `${x},${y - height / 2}`,
      `${x + size / 2},${y - height / 4}`,
      `${x + size / 2},${y + height / 4}`,
      `${x},${y + height / 2}`,
      `${x - size / 2},${y + height / 4}`,
      `${x - size / 2},${y - height / 4}`
    ].join(' ');

    return (
      <Polygon
        points={points}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    );
  };

  // Icon inside hexagon component
  const HexagonWithIcon = ({ x, y, size, fill, strokeColor, strokeWidth, opacity, iconName, iconColor }: any) => {
    const iconSize = 24;
    const iconX = x - iconSize / 2;
    const iconY = y - iconSize / 2;

    return (
      <G>
        <Hexagon 
          x={x} 
          y={y} 
          size={size} 
          fill={fill} 
          strokeColor={strokeColor} 
          strokeWidth={strokeWidth} 
          opacity={opacity} 
        />
        {/* Icon positioned at center of hexagon */}
        {iconName === 'leaf' && (
          <Path
            d={`M${iconX + 17},${iconY + 8}C${iconX + 8},${iconY + 10} ${iconX + 5.9},${iconY + 16.17} ${iconX + 3.82},${iconY + 21.34}L${iconX + 5.71},${iconY + 22}L${iconX + 6.66},${iconY + 19.7}C${iconX + 7.14},${iconY + 19.87} ${iconX + 7.64},${iconY + 20} ${iconX + 8},${iconY + 20}C${iconX + 19},${iconY + 20} ${iconX + 22},${iconY + 3} ${iconX + 22},${iconY + 3}C${iconX + 21},${iconY + 5} ${iconX + 14},${iconY + 5.25} ${iconX + 9},${iconY + 6.25}C${iconX + 4},${iconY + 7.25} ${iconX + 2},${iconY + 11.5} ${iconX + 2},${iconY + 13.5}C${iconX + 2},${iconY + 15.5} ${iconX + 3.75},${iconY + 17.25} ${iconX + 3.75},${iconY + 17.25}C${iconX + 7},${iconY + 8} ${iconX + 17},${iconY + 8} ${iconX + 17},${iconY + 8}Z`}
            fill={iconColor}
          />
        )}
        {iconName === 'heart' && (
          <Path
            d={`M${iconX + 12},${iconY + 21.35}L${iconX + 10.55},${iconY + 20.03}C${iconX + 5.4},${iconY + 15.36} ${iconX + 2},${iconY + 12.27} ${iconX + 2},${iconY + 8.5}C${iconX + 2},${iconY + 5.41} ${iconX + 4.42},${iconY + 3} ${iconX + 7.5},${iconY + 3}C${iconX + 9.24},${iconY + 3} ${iconX + 10.91},${iconY + 3.81} ${iconX + 12},${iconY + 5.08}C${iconX + 13.09},${iconY + 3.81} ${iconX + 14.76},${iconY + 3} ${iconX + 16.5},${iconY + 3}C${iconX + 19.58},${iconY + 3} ${iconX + 22},${iconY + 5.41} ${iconX + 22},${iconY + 8.5}C${iconX + 22},${iconY + 12.27} ${iconX + 18.6},${iconY + 15.36} ${iconX + 13.45},${iconY + 20.03}L${iconX + 12},${iconY + 21.35}Z`}
            fill={iconColor}
          />
        )}
        {iconName === 'pulse' && (
          <Path
            d={`M${iconX + 3},${iconY + 13}H${iconX + 5.79}L${iconX + 10.1},${iconY + 4.79}L${iconX + 11.28},${iconY + 13.75}L${iconX + 13.5},${iconY + 8.5}L${iconX + 15.21},${iconY + 13}H${iconX + 21}V${iconY + 15}H${iconX + 14.29}L${iconX + 13.5},${iconY + 12.92}L${iconX + 11.28},${iconY + 18.25}L${iconX + 10.1},${iconY + 9.21}L${iconX + 7.21},${iconY + 15}H${iconX + 3}V${iconY + 13}Z`}
            fill={iconColor}
          />
        )}
      </G>
    );
  };

  return (
    <View
      style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          {/* Header with Theme Toggle and Logout */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerTitle, isDark && { color: AyurvedaColors.textDark }]}>
              Patient Dashboard
            </Text>
            <View style={styles.headerActions}>
              <ThemeToggle absolutePosition={false} />
              <TouchableOpacity
                style={[styles.logoutButton, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}
                onPress={handleLogout}
              >
                <Ionicons 
                  name="log-out-outline" 
                  size={20} 
                  color={isDark ? AyurvedaColors.textDark : "#6B7E68"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Card */}
          <View style={[styles.welcomeCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#ffffff" />
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={[styles.welcomeTitle, isDark && { color: AyurvedaColors.textDark }]}>
                Namaste, Ananya Rao 🌿
              </Text>
              <Text style={[styles.welcomeSubtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
                Your personalized Ayurvedic care space
              </Text>
            </View>
          </View>

          {/* Decorative Hexagonal Pattern - Above Cards */}
          <View style={styles.decorativeSection}>
            <Text style={[styles.decorativeTitle, isDark && { color: AyurvedaColors.textDark }]}>
              AYURVEDIC WELLNESS
            </Text>
            <Text style={[styles.decorativeSubtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
              Holistic Care • Balance • Harmony
            </Text>
            
            <View style={styles.hexagonContainer}>
              <Svg height="160" width="100%" viewBox="0 0 360 180">
                {/* Honeycomb cluster - structured pattern */}
                {/* Top row - 2 hexagons */}
                <Hexagon x={150} y={30} size={35} fill={isDark ? "rgba(168, 150, 201, 0.2)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.4} />
                <Hexagon x={210} y={30} size={35} fill={isDark ? "rgba(184, 168, 212, 0.15)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.3} />
                
                {/* Second row - 3 hexagons */}
                <Hexagon x={120} y={55} size={35} fill={isDark ? "rgba(168, 150, 201, 0.2)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.35} />
                <HexagonWithIcon 
                  x={180} y={55} size={35} 
                  fill={isDark ? "rgba(197, 180, 227, 0.3)" : "#C5B4E3"} 
                  strokeColor={isDark ? "rgba(184, 168, 212, 0.5)" : "#B8A8D4"} 
                  strokeWidth={2.5} opacity={0.7}
                  iconName="leaf" iconColor={isDark ? AyurvedaColors.primaryLight : "#8B9D83"}
                />
                <Hexagon x={240} y={55} size={35} fill={isDark ? "rgba(168, 150, 201, 0.2)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.4} />
                
                {/* Third row - 4 hexagons (main feature row) */}
                <Hexagon x={90} y={80} size={35} fill={isDark ? "rgba(184, 168, 212, 0.15)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.3} />
                <Hexagon x={150} y={80} size={35} fill={isDark ? "rgba(184, 168, 212, 0.35)" : "#B8A8D4"} strokeColor={isDark ? "rgba(169, 150, 201, 0.6)" : "#A996C9"} strokeWidth={2.5} opacity={0.8} />
                <HexagonWithIcon 
                  x={210} y={80} size={35} 
                  fill={isDark ? "rgba(169, 150, 201, 0.4)" : "#A996C9"} 
                  strokeColor={isDark ? "rgba(149, 132, 184, 0.7)" : "#9584B8"} 
                  strokeWidth={3} opacity={0.9}
                  iconName="heart" iconColor="#ffffff"
                />
                <Hexagon x={270} y={80} size={35} fill={isDark ? "rgba(184, 168, 212, 0.15)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.3} />
                
                {/* Fourth row - 3 hexagons */}
                <HexagonWithIcon 
                  x={120} y={105} size={35} 
                  fill={isDark ? "rgba(184, 168, 212, 0.35)" : "#B8A8D4"} 
                  strokeColor={isDark ? "rgba(169, 150, 201, 0.6)" : "#A996C9"} 
                  strokeWidth={2.5} opacity={0.8}
                  iconName="pulse" iconColor="#ffffff"
                />
                <Hexagon x={180} y={105} size={35} fill={isDark ? "rgba(217, 206, 232, 0.25)" : "#D9CEE8"} strokeColor={isDark ? "rgba(197, 180, 227, 0.4)" : "#C5B4E3"} strokeWidth={2} opacity={0.6} />
                <Hexagon x={240} y={105} size={35} fill={isDark ? "rgba(168, 150, 201, 0.2)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.4} />
                
                {/* Fifth row - 2 hexagons */}
                <Hexagon x={150} y={130} size={35} fill={isDark ? "rgba(168, 150, 201, 0.2)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.35} />
                <Hexagon x={210} y={130} size={35} fill={isDark ? "rgba(184, 168, 212, 0.15)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.3)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.3} />
                
                {/* Additional scattered hexagons for depth */}
                <Hexagon x={60} y={58} size={30} fill={isDark ? "rgba(168, 150, 201, 0.15)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.25)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.25} />
                <Hexagon x={300} y={55} size={30} fill={isDark ? "rgba(184, 168, 212, 0.1)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.25)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.25} />
                <Hexagon x={75} y={115} size={30} fill={isDark ? "rgba(168, 150, 201, 0.15)" : "#E8DFF0"} strokeColor={isDark ? "rgba(168, 150, 201, 0.25)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.25} />
                <Hexagon x={285} y={110} size={30} fill={isDark ? "rgba(184, 168, 212, 0.1)" : "#F4F1F8"} strokeColor={isDark ? "rgba(184, 168, 212, 0.25)" : "#D9CEE8"} strokeWidth={1.5} opacity={0.25} />
              </Svg>
            </View>
          </View>

          {/* Dashboard Cards Grid */}
          <View style={styles.cardsGrid}>
            {dashboardCards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[styles.card, { backgroundColor: isDark ? AyurvedaColors.surfaceDark : card.color }]}
                onPress={() => router.push(card.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, isDark && { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Ionicons 
                    name={card.icon as any} 
                    size={28} 
                    color={isDark ? AyurvedaColors.primaryLight : "#6B7E68"} 
                  />
                </View>
                <Text style={[styles.cardTitle, isDark && { color: AyurvedaColors.textDark }]}>
                  {card.title}
                </Text>
                <Text style={[styles.cardDescription, isDark && { color: AyurvedaColors.textDarkMuted }]}>
                  {card.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EBF4', // Soft lavender background
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C3E50',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8F0E5',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: '#D9E4D6',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B9D83',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#5F6F65',
  },
  decorativeSection: {
    marginBottom: 4,
    paddingVertical: 10,
  },
  decorativeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B9D83',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 4,
  },
  decorativeSubtitle: {
    fontSize: 12,
    color: '#A996C9',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
  hexagonContainer: {
    alignItems: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#5F6F65',
  },
});