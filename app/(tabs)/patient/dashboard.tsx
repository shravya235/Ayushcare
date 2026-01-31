import { ThemeToggle } from '@/components/ThemeToggle';
import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      color: '#E8F5E9'
    },
    {
      id: 2,
      title: 'Daily Health Log',
      description: "Track today's health",
      icon: 'heart-outline',
      route: '/patient/health-log',
      color: '#E8F5E9'
    },
    {
      id: 3,
      title: 'View Results',
      description: 'View dosha analysis',
      icon: 'trending-up-outline',
      route: '/patient/results',
      color: '#E8F5E9'
    },
    {
      id: 4,
      title: 'Health History',
      description: 'Past records & notes',
      icon: 'time-outline',
      route: '/patient/history',
      color: '#E8F5E9'
    }
  ];

  return (
    <View
      style={[styles.container, isDark && { backgroundColor: AyurvedaColors.backgroundDark }]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          {/* Header with Logout */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerTitle, isDark && { color: AyurvedaColors.textDark }]}>Patient Dashboard</Text>
            <View style={styles.headerActions}>
              <ThemeToggle absolutePosition={false} />
              <TouchableOpacity
                style={[styles.logoutButton, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color={isDark ? AyurvedaColors.textDark : "#5A8F69"} />
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
                  <Ionicons name={card.icon as any} size={28} color={isDark ? AyurvedaColors.primaryLight : "#4A7C59"} />
                </View>
                <Text style={[styles.cardTitle, isDark && { color: AyurvedaColors.textDark }]}>{card.title}</Text>
                <Text style={[styles.cardDescription, isDark && { color: AyurvedaColors.textDarkMuted }]}>{card.description}</Text>
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
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#E8F5E9',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: '#D4E7D7',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    backgroundColor: '#5A8F69',
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