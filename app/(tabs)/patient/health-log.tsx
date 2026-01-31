import { AyurvedaColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HealthLog() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [digestionStatus, setDigestionStatus] = useState<string | null>(null);
  const [activityType, setActivityType] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '🙂', label: 'Good', value: 'good' },
    { emoji: '😐', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Low', value: 'low' },
  ];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <LinearGradient
      colors={isDark 
        ? [AyurvedaColors.backgroundDark, AyurvedaColors.backgroundDark] as const
        : ['#C5B4E3', '#D9CEE8', '#E8DFF0', '#F4F1F8'] as const
      }
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/(tabs)/patient/dashboard' as any)}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? AyurvedaColors.textDark : "#2C3E50"} />
          </TouchableOpacity>

          <Text style={[styles.title, isDark && { color: AyurvedaColors.textDark }]}>Daily Health Log</Text>
          <Text style={[styles.subtitle, isDark && { color: AyurvedaColors.textDarkMuted }]}>
            Track your daily wellness and observe patterns
          </Text>

          {/* Date */}
          <View style={[styles.dateCard, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}>
            <Ionicons name="calendar-outline" size={20} color={isDark ? AyurvedaColors.accent : "#5A8F69"} />
            <Text style={[styles.dateText, isDark && { color: AyurvedaColors.textDark }]}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          {/* Mood Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>How are you feeling today?</Text>
            <View style={styles.moodContainer}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: 'transparent' },
                    selectedMood === mood.value && { borderColor: AyurvedaColors.secondary, backgroundColor: AyurvedaColors.primaryLight },
                    selectedMood === mood.value && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent }
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[styles.moodLabel, isDark && { color: AyurvedaColors.textDark }]}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sleep Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Sleep</Text>
            <View style={[styles.inputContainer, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt }]}>
              <Ionicons name="moon-outline" size={20} color={isDark ? AyurvedaColors.accent : "#5A8F69"} />
              <TextInput
                style={[styles.input, isDark && { color: AyurvedaColors.textDark }]}
                placeholder="Hours of sleep"
                value={sleepHours}
                onChangeText={setSleepHours}
                keyboardType="numeric"
                placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : "#999"}
              />
            </View>

            <Text style={[styles.subLabel, isDark && { color: AyurvedaColors.textDark }]}>Sleep Quality</Text>
            <View style={styles.optionsRow}>
              {['Poor', 'Average', 'Good'].map((quality) => (
                <TouchableOpacity
                  key={quality}
                  style={[
                    styles.optionChip,
                    isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondaryDark },
                    sleepQuality === quality && { backgroundColor: AyurvedaColors.primaryLight, borderColor: AyurvedaColors.secondary },
                    sleepQuality === quality && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent }
                  ]}
                  onPress={() => setSleepQuality(quality)}
                >
                  <Text style={[
                    styles.optionChipText,
                    isDark && { color: AyurvedaColors.textDark },
                    sleepQuality === quality && styles.optionChipTextSelected,
                    sleepQuality === quality && isDark && { color: AyurvedaColors.textDark }
                  ]}>
                    {quality}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Digestion Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Digestion Status</Text>
            <View style={styles.optionsRow}>
              {['Poor', 'Normal', 'Heavy'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.optionChip,
                    isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondaryDark },
                    digestionStatus === status && { backgroundColor: AyurvedaColors.primaryLight, borderColor: AyurvedaColors.secondary },
                    digestionStatus === status && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent }
                  ]}
                  onPress={() => setDigestionStatus(status)}
                >
                  <Text style={[
                    styles.optionChipText,
                    isDark && { color: AyurvedaColors.textDark },
                    digestionStatus === status && styles.optionChipTextSelected,
                    digestionStatus === status && isDark && { color: AyurvedaColors.textDark }
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Activity/Yoga Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Activity / Yoga</Text>
            <View style={styles.activityGrid}>
              {['None', 'Light Yoga', 'Walking', 'Meditation', 'Intense Yoga', 'Exercise'].map((activity) => (
                <TouchableOpacity
                  key={activity}
                  style={[
                    styles.activityChip,
                    isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondaryDark },
                    activityType === activity && { backgroundColor: AyurvedaColors.primaryLight, borderColor: AyurvedaColors.secondary },
                    activityType === activity && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent }
                  ]}
                  onPress={() => setActivityType(activity)}
                >
                  <Text style={[
                    styles.activityChipText,
                    isDark && { color: AyurvedaColors.textDark },
                    activityType === activity && styles.activityChipTextSelected,
                    activityType === activity && isDark && { color: AyurvedaColors.textDark }
                  ]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Symptoms Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Any symptoms today?</Text>
            <View style={styles.symptomsGrid}>
              {['Headache', 'Fatigue', 'Anxiety', 'Digestive Issues', 'Body Pain', 'Stress'].map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    styles.symptomChip,
                    isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, borderColor: AyurvedaColors.secondaryDark },
                    selectedSymptoms.includes(symptom) && { backgroundColor: AyurvedaColors.primaryLight, borderColor: AyurvedaColors.secondary },
                    selectedSymptoms.includes(symptom) && isDark && { backgroundColor: AyurvedaColors.primaryDark, borderColor: AyurvedaColors.accent }
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    styles.symptomText,
                    isDark && { color: AyurvedaColors.textDark },
                    selectedSymptoms.includes(symptom) && styles.symptomTextSelected,
                    selectedSymptoms.includes(symptom) && isDark && { color: AyurvedaColors.textDark }
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && { color: AyurvedaColors.textDark }]}>Additional Notes</Text>
            <TextInput
              style={[styles.notesInput, isDark && { backgroundColor: AyurvedaColors.backgroundDarkAlt, color: AyurvedaColors.textDark }]}
              placeholder="Write any observations, meals, activities..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              placeholderTextColor={isDark ? AyurvedaColors.textDarkMuted : "#999"}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, isDark && { backgroundColor: AyurvedaColors.primary }]}
            onPress={() => {
              const logData = {
                date: new Date().toISOString(),
                mood: selectedMood,
                sleepHours,
                sleepQuality,
                digestionStatus,
                activityType,
                symptoms: selectedSymptoms,
                notes
              };
              console.log('Save log:', logData);
              // TODO: Save to backend/storage
              router.replace('/(tabs)/patient/history' as any);
            }}
          >
            <Text style={styles.saveButtonText}>Save Today's Log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: '#5A8F69',
    backgroundColor: '#E8F5E9',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  symptomChip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  symptomChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#5A8F69',
  },
  symptomText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  symptomTextSelected: {
    color: '#5A8F69',
    fontWeight: '600',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionChip: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#5A8F69',
  },
  optionChipText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  optionChipTextSelected: {
    color: '#5A8F69',
    fontWeight: '600',
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  activityChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#5A8F69',
  },
  activityChipText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  activityChipTextSelected: {
    color: '#5A8F69',
    fontWeight: '600',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: '#5A8F69',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});