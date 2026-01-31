import { AyurvedaColors } from './theme';

export interface Note {
    id: string;
    date: string;
    text: string;
}

export interface HealthLog {
    date: string;
    sleep: string;
    digestion: string;
    stress: string;
}

export interface Assessment {
    date: string;
    dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridosha';
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    dosha: Assessment['dosha'];
    lastConsultation: string;
    notes: Note[];
    healthLogs: HealthLog[];
    assessmentHistory: Assessment[];
}

export const MOCK_PATIENTS: Patient[] = [
    {
        id: 'P001',
        name: 'Aarav Patel',
        age: 34,
        gender: 'Male',
        dosha: 'Pitta',
        lastConsultation: 'Oct 24, 2023',
        notes: [
            { id: 'n1', date: 'Oct 24, 2023', text: 'Patient complains of acidity. Recommended cooling diet. Avoid spicy foods.' }
        ],
        healthLogs: [
            { date: 'Oct 23', sleep: '6 hrs', digestion: 'Poor', stress: 'High' },
            { date: 'Oct 22', sleep: '7 hrs', digestion: 'Fair', stress: 'Moderate' }
        ],
        assessmentHistory: [
            { date: 'Oct 24, 2023', dosha: 'Pitta' },
            { date: 'Sep 10, 2023', dosha: 'Pitta-Kapha' }
        ]
    },
    {
        id: 'P002',
        name: 'Ishaan Sharma',
        age: 28,
        gender: 'Male',
        dosha: 'Vata',
        lastConsultation: 'Nov 02, 2023',
        notes: [],
        healthLogs: [],
        assessmentHistory: [
            { date: 'Nov 02, 2023', dosha: 'Vata' }
        ]
    },
    {
        id: 'P003',
        name: 'Diya Gupta',
        age: 42,
        gender: 'Female',
        dosha: 'Kapha',
        lastConsultation: 'Oct 15, 2023',
        notes: [
            { id: 'n2', date: 'Oct 15, 2023', text: 'Weight gain concerns. Kapha aggravated. Prescribed Triphala.' }
        ],
        healthLogs: [
            { date: 'Oct 14', sleep: '9 hrs', digestion: 'Sluggish', stress: 'Low' }
        ],
        assessmentHistory: [
            { date: 'Oct 15, 2023', dosha: 'Kapha' }
        ]
    },
    {
        id: 'P004',
        name: 'Ananya Singh',
        age: 25,
        gender: 'Female',
        dosha: 'Vata-Pitta',
        lastConsultation: 'Nov 05, 2023',
        notes: [],
        healthLogs: [],
        assessmentHistory: [
            { date: 'Nov 05, 2023', dosha: 'Vata-Pitta' }
        ]
    }
];

export const getDoshaColor = (dosha: string): string => {
    if (dosha.includes('Vata')) return '#8B7355'; // Earthy/Airy brown
    if (dosha.includes('Pitta')) return '#D4BE7A'; // Fiery yellow/gold
    if (dosha.includes('Kapha')) return '#4A7C59'; // Earthy/Watery green
    return AyurvedaColors.primary;
};
