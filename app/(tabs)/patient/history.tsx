import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HealthHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'logs' | 'assessments'>('logs');

  const healthLogs = [
    {
      id: '1',
      date: 'Jan 29, 2026',
      mood: '😊 Great',
      sleep: '8 hours',
      notes: 'Feeling energetic, practiced morning yoga'
    },
    {
      id: '2',
      date: 'Jan 28, 2026',
      mood: '🙂 Good',
      sleep: '7 hours',
      notes: 'Slight headache in the evening'
    },
    {
      id: '3',
      date: 'Jan 27, 2026',
      mood: '😐 Okay',
      sleep: '6 hours',
      notes: 'Stressed from work, digestive issues'
    },
  ];

  const assessmentHistory = [
    {
      id: '1',
      date: 'Jan 15, 2026',
      dominant: 'Vata',
      percentage: 45,
      color: '#9C27B0'
    },
    {
      id: '2',
      date: 'Dec 1, 2025',
      dominant: 'Vata',
      percentage: 42,
      color: '#9C27B0'
    },
    {
      id: '3',
      date: 'Oct 15, 2025',
      dominant: 'Pitta',
      percentage: 40,
      color: '#FF5722'
    },
  ];

  const renderLogItem = ({ item }: { item: typeof healthLogs[0] }) => (
    <TouchableOpacity style={styles.logCard}>
      <View style={styles.logHeader}>
        <Text style={styles.logDate}>{item.date}</Text>
        <Ionicons name="chevron-forward" size={20} color="#5F6F65" />
      </View>
      <View style={styles.logContent}>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>Mood:</Text>
          <Text style={styles.logValue}>{item.mood}</Text>
        </View>
        <View style={styles.logRow}>
          <Text style={styles.logLabel}>Sleep:</Text>
          <Text style={styles.logValue}>{item.sleep}</Text>
        </View>
        <Text style={styles.logNotes}>{item.notes}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAssessmentItem = ({ item }: { item: typeof assessmentHistory[0] }) => (
    <TouchableOpacity style={styles.assessmentCard}>
      <View style={styles.assessmentHeader}>
        <Text style={styles.assessmentDate}>{item.date}</Text>
        <View style={[styles.dominantBadge, { backgroundColor: item.color }]}>
          <Text style={styles.dominantBadgeText}>{item.dominant}</Text>
        </View>
      </View>
      <View style={styles.assessmentContent}>
        <Text style={styles.assessmentLabel}>Dominant Dosha</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${item.percentage}%`, backgroundColor: item.color }
            ]} 
          />
        </View>
        <Text style={styles.assessmentPercentage}>{item.percentage}%</Text>
      </View>
      <TouchableOpacity style={styles.viewDetailsButton}>
        <Text style={styles.viewDetailsText}>View Full Results</Text>
        <Ionicons name="arrow-forward" size={16} color="#5A8F69" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/patient/dashboard' as any)}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.title}>Health History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'logs' && styles.tabActive]}
          onPress={() => setActiveTab('logs')}
        >
          <Ionicons 
            name="heart-outline" 
            size={20} 
            color={activeTab === 'logs' ? '#5A8F69' : '#5F6F65'} 
          />
          <Text style={[styles.tabText, activeTab === 'logs' && styles.tabTextActive]}>
            Daily Logs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'assessments' && styles.tabActive]}
          onPress={() => setActiveTab('assessments')}
        >
          <Ionicons 
            name="trending-up-outline" 
            size={20} 
            color={activeTab === 'assessments' ? '#5A8F69' : '#5F6F65'} 
          />
          <Text style={[styles.tabText, activeTab === 'assessments' && styles.tabTextActive]}>
            Assessments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'logs' ? (
        <FlatList
          data={healthLogs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={assessmentHistory}
          renderItem={renderAssessmentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  tabActive: {
    backgroundColor: '#E8F5E9',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#5F6F65',
  },
  tabTextActive: {
    color: '#5A8F69',
  },
  listContent: {
    padding: 20,
  },
  logCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  logContent: {
    gap: 8,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logLabel: {
    fontSize: 14,
    color: '#5F6F65',
    marginRight: 8,
    width: 60,
  },
  logValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
  },
  logNotes: {
    fontSize: 14,
    color: '#5F6F65',
    marginTop: 4,
    lineHeight: 20,
  },
  assessmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assessmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  assessmentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  dominantBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dominantBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  assessmentContent: {
    marginBottom: 12,
  },
  assessmentLabel: {
    fontSize: 14,
    color: '#5F6F65',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  assessmentPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A8F69',
    textAlign: 'right',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A8F69',
    marginRight: 4,
  },
});