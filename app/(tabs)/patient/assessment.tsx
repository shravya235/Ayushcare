import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Assessment() {
  const router = useRouter();

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

        <Text style={styles.title}>Start Assessment</Text>
        <Text style={styles.subtitle}>
          Understand your dosha balance through our comprehensive assessment
        </Text>

        {/* Assessment Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#5A8F69" />
          <Text style={styles.infoText}>
            This assessment will take approximately 10-15 minutes to complete.
            Answer honestly for the most accurate results.
          </Text>
        </View>

        {/* Assessment Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Assessment Categories</Text>
          
          {[
            { title: 'Physical Characteristics', questions: 12 },
            { title: 'Mental & Emotional Traits', questions: 10 },
            { title: 'Lifestyle & Habits', questions: 8 },
            { title: 'Digestive System', questions: 6 },
          ].map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <Ionicons name="checkmark-circle-outline" size={28} color="#5A8F69" />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryQuestions}>
                  {category.questions} questions
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => {
            router.push('/(tabs)/patient/assessment-questions' as any);
          }}
        >
          <Text style={styles.startButtonText}>Begin Assessment</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
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
  infoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  categoryQuestions: {
    fontSize: 14,
    color: '#5F6F65',
  },
  startButton: {
    backgroundColor: '#5A8F69',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});