import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Results() {
  const router = useRouter();

  const doshaResults = [
    { name: 'Vata', percentage: 45, color: '#9C27B0' },
    { name: 'Pitta', percentage: 35, color: '#FF5722' },
    { name: 'Kapha', percentage: 20, color: '#4CAF50' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/patient/dashboard' as any)}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>

        <Text style={styles.title}>Your Dosha Analysis</Text>
        <Text style={styles.subtitle}>
          Based on your assessment results
        </Text>

        {/* Last Assessment Date */}
        <View style={styles.dateCard}>
          <Ionicons name="calendar-outline" size={20} color="#5A8F69" />
          <Text style={styles.dateText}>Last assessed: January 15, 2026</Text>
        </View>

        {/* Dosha Results */}
        <View style={styles.resultsCard}>
          <Text style={styles.sectionTitle}>Your Dosha Constitution</Text>
          
          {doshaResults.map((dosha) => (
            <View key={dosha.name} style={styles.doshaRow}>
              <View style={styles.doshaInfo}>
                <Text style={styles.doshaName}>{dosha.name}</Text>
                <Text style={styles.doshaPercentage}>{dosha.percentage}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${dosha.percentage}%`, backgroundColor: dosha.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Dominant Dosha Card */}
        <View style={styles.dominantCard}>
          <View style={styles.dominantHeader}>
            <Ionicons name="star" size={24} color="#FFD700" />
            <Text style={styles.dominantTitle}>Your Dominant Dosha</Text>
          </View>
          <Text style={styles.dominantDosha}>Vata</Text>
          <Text style={styles.dominantDescription}>
            Vata types are energetic, creative, and flexible. You tend to be 
            quick-thinking and enthusiastic but may experience anxiety when imbalanced.
          </Text>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsCard}>
          <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
          
          {[
            {
              icon: 'restaurant-outline',
              title: 'Diet',
              description: 'Favor warm, cooked foods and avoid cold, raw items'
            },
            {
              icon: 'fitness-outline',
              title: 'Exercise',
              description: 'Gentle yoga and walking are ideal for your constitution'
            },
            {
              icon: 'bed-outline',
              title: 'Lifestyle',
              description: 'Maintain regular routine and get adequate rest'
            },
          ].map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recIcon}>
                <Ionicons name={rec.icon as any} size={24} color="#5A8F69" />
              </View>
              <View style={styles.recContent}>
                <Text style={styles.recTitle}>{rec.title}</Text>
                <Text style={styles.recDescription}>{rec.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Retake Assessment Button */}
        <TouchableOpacity 
          style={styles.retakeButton}
          onPress={() => router.push('/patient/assessment' as any)}
        >
          <Ionicons name="refresh-outline" size={20} color="#5A8F69" />
          <Text style={styles.retakeButtonText}>Retake Assessment</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6F65',
    marginBottom: 24,
  },
  dateCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
  },
  resultsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  doshaRow: {
    marginBottom: 20,
  },
  doshaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  doshaName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  doshaPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A8F69',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  dominantCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  dominantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dominantTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
  },
  dominantDosha: {
    fontSize: 24,
    fontWeight: '700',
    color: '#9C27B0',
    marginBottom: 8,
  },
  dominantDescription: {
    fontSize: 14,
    color: '#5F6F65',
    lineHeight: 20,
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  recIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 14,
    color: '#5F6F65',
    lineHeight: 20,
  },
  retakeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5A8F69',
  },
  retakeButtonText: {
    color: '#5A8F69',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});