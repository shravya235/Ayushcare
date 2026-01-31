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

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    experience: number;
    rating: number;
    image: string;
}

export const MOCK_DOCTORS: Doctor[] = [
    {
        id: 'd1',
        name: 'Dr. Anjali Sharma',
        specialization: 'Ayurvedic General Practitioner',
        experience: 12,
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 'd2',
        name: 'Dr. Rajesh Verma',
        specialization: 'Panchakarma Specialist',
        experience: 18,
        rating: 4.9,
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 'd3',
        name: 'Dr. Priya Kapoor',
        specialization: 'Diet & Lifestyle Consultant',
        experience: 8,
        rating: 4.7,
        image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
];

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    reason: string;
    status: 'pending' | 'confirmed' | 'completed';
    doctorAdvice?: string;
    meetingLink?: string;
}

export let MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 'apt1',
        patientId: 'P001',
        patientName: 'Aarav Patel',
        doctorId: 'd1',
        doctorName: 'Dr. Anjali Sharma',
        date: '2024-02-15',
        time: '10:00 AM',
        reason: 'Recurrent acidity and digestion issues.',
        status: 'pending'
    },
    {
        id: 'apt2',
        patientId: 'P003',
        patientName: 'Diya Gupta',
        doctorId: 'd3',
        doctorName: 'Dr. Priya Kapoor',
        date: '2024-02-16',
        time: '02:00 PM',
        reason: 'Diet consultation for weight management.',
        status: 'confirmed',
        doctorAdvice: 'Focus on warm, cooked meals. Avoid cold drinks.',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
    }
];

export const addAppointment = (appointment: Appointment) => {
    MOCK_APPOINTMENTS = [appointment, ...MOCK_APPOINTMENTS];
};

export const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    MOCK_APPOINTMENTS = MOCK_APPOINTMENTS.map(apt =>
        apt.id === id ? { ...apt, ...updates } : apt
    );
};
