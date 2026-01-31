import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PatientDashboard() {
  const router = useRouter();

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header with Logout */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Patient Dashboard</Text>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#5A8F69" />
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color="#ffffff" />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Namaste, Ananya Rao 🌿
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Your personalized Ayurvedic care space
            </Text>
          </View>
        </View>

        {/* Dashboard Cards Grid */}
        <View style={styles.cardsGrid}>
          {dashboardCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, { backgroundColor: card.color }]}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={card.icon as any} size={28} color="#4A7C59" />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C3E50',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
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