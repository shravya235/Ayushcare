import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define question types
type Question = {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
};

// Sample questions (you can expand this)
const questions: Question[] = [
  {
    id: 1,
    category: 'Physical Characteristics',
    question: 'Body Frame',
    options: [
      { text: 'Thin, light', dosha: 'vata' },
      { text: 'Medium, athletic', dosha: 'pitta' },
      { text: 'Heavy, solid', dosha: 'kapha' },
    ],
  },
  {
    id: 2,
    category: 'Physical Characteristics',
    question: 'Skin Type',
    options: [
      { text: 'Dry, rough', dosha: 'vata' },
      { text: 'Warm, oily, sensitive', dosha: 'pitta' },
      { text: 'Thick, moist', dosha: 'kapha' },
    ],
  },
  {
    id: 3,
    category: 'Physical Characteristics',
    question: 'Hair Type',
    options: [
      { text: 'Dry, thin, frizzy', dosha: 'vata' },
      { text: 'Fine, oily, early grey', dosha: 'pitta' },
      { text: 'Thick, lustrous, wavy', dosha: 'kapha' },
    ],
  },
  {
    id: 4,
    category: 'Mental & Emotional',
    question: 'Mental Activity',
    options: [
      { text: 'Quick, restless', dosha: 'vata' },
      { text: 'Sharp, focused', dosha: 'pitta' },
      { text: 'Calm, steady', dosha: 'kapha' },
    ],
  },
  {
    id: 5,
    category: 'Mental & Emotional',
    question: 'Memory',
    options: [
      { text: 'Quick to learn, quick to forget', dosha: 'vata' },
      { text: 'Sharp, clear', dosha: 'pitta' },
      { text: 'Slow to learn, never forget', dosha: 'kapha' },
    ],
  },
  {
    id: 6,
    category: 'Mental & Emotional',
    question: 'Emotional Tendency',
    options: [
      { text: 'Anxious, worried', dosha: 'vata' },
      { text: 'Irritable, angry', dosha: 'pitta' },
      { text: 'Calm, attached', dosha: 'kapha' },
    ],
  },
  {
    id: 7,
    category: 'Lifestyle & Habits',
    question: 'Sleep Pattern',
    options: [
      { text: 'Light, interrupted', dosha: 'vata' },
      { text: 'Moderate, sound', dosha: 'pitta' },
      { text: 'Heavy, long', dosha: 'kapha' },
    ],
  },
  {
    id: 8,
    category: 'Lifestyle & Habits',
    question: 'Activity Level',
    options: [
      { text: 'Hyperactive, restless', dosha: 'vata' },
      { text: 'Moderate, focused', dosha: 'pitta' },
      { text: 'Slow, steady', dosha: 'kapha' },
    ],
  },
  {
    id: 9,
    category: 'Digestive System',
    question: 'Appetite',
    options: [
      { text: 'Irregular, scanty', dosha: 'vata' },
      { text: 'Strong, sharp', dosha: 'pitta' },
      { text: 'Steady, can skip meals', dosha: 'kapha' },
    ],
  },
  {
    id: 10,
    category: 'Digestive System',
    question: 'Digestion',
    options: [
      { text: 'Irregular, gas, bloating', dosha: 'vata' },
      { text: 'Quick, burning sensation', dosha: 'pitta' },
      { text: 'Slow, heavy feeling', dosha: 'kapha' },
    ],
  },
  {
    id: 11,
    category: 'Digestive System',
    question: 'Thirst',
    options: [
      { text: 'Variable', dosha: 'vata' },
      { text: 'Excessive', dosha: 'pitta' },
      { text: 'Low', dosha: 'kapha' },
    ],
  },
  {
    id: 12,
    category: 'Physical Characteristics',
    question: 'Body Temperature',
    options: [
      { text: 'Cold hands & feet', dosha: 'vata' },
      { text: 'Warm, dislike heat', dosha: 'pitta' },
      { text: 'Moderate, tolerate most', dosha: 'kapha' },
    ],
  },
];

export default function AssessmentQuestions() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const doshaColors = {
    vata: '#93C5FD',
    pitta: '#FCA5A5',
    kapha: '#86EFAC',
  };

  const handleOptionSelect = (dosha: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: dosha,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete - calculate results
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Calculate dosha scores
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(answers).forEach((dosha) => {
      if (dosha in scores) {
        scores[dosha as keyof typeof scores]++;
      }
    });

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const percentages = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100),
    };

    console.log('Assessment Results:', percentages);
    
    // Navigate to results page
    // You can pass the results as params if needed
    router.replace('/(tabs)/patient/results' as any);
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/patient/assessment' as any)} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayurvedic Assessment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.title}>Ayurvedic Assessment</Text>
          <Text style={styles.subtitle}>Answer honestly for best results</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{totalQuestions} completed
          </Text>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Q{currentQuestionIndex + 1} of {totalQuestions}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.dosha;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && {
                      backgroundColor: doshaColors[option.dosha],
                      borderColor: doshaColors[option.dosha],
                    },
                  ]}
                  onPress={() => handleOptionSelect(option.dosha)}
                  activeOpacity={0.7}
                >
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color="#2C3E50"
                      style={styles.checkmark}
                    />
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Dosha Legend */}
          <View style={styles.doshaLegend}>
            <View style={styles.doshaItem}>
              <View style={[styles.doshaCircle, { backgroundColor: '#93C5FD' }]} />
              <Text style={styles.doshaLabel}>Vata</Text>
            </View>
            <View style={styles.doshaItem}>
              <View style={[styles.doshaCircle, { backgroundColor: '#FCA5A5' }]} />
              <Text style={styles.doshaLabel}>Pitta</Text>
            </View>
            <View style={styles.doshaItem}>
              <View style={[styles.doshaCircle, { backgroundColor: '#86EFAC' }]} />
              <Text style={styles.doshaLabel}>Kapha</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            currentQuestionIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text
            style={[
              styles.previousButtonText,
              currentQuestionIndex === 0 && styles.navButtonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            !isAnswered && styles.navButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isAnswered}
        >
          <Text
            style={[
              styles.nextButtonText,
              !isAnswered && styles.navButtonTextDisabled,
            ]}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#5F6F65',
    marginBottom: 16,
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
    backgroundColor: '#5A8F69',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#5F6F65',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 14,
    color: '#5F6F65',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  doshaLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  doshaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doshaCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  doshaLabel: {
    fontSize: 13,
    color: '#5F6F65',
  },
  bottomNav: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5F6F65',
  },
  nextButton: {
    backgroundColor: '#5A8F69',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonTextDisabled: {
    color: '#999',
  },
});