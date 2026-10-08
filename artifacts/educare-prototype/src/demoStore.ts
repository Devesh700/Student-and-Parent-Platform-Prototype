import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Role = 'Parent' | 'Student' | 'Field Agent' | 'Admin' | 'Counsellor';
export type Entitlement = 'Free' | 'Premium' | 'Free Access' | 'Expired';
export type User = { id: string; name: string; role: Role; phone: string; language: 'English' | 'हिन्दी' };
export type Student = { id: string; name: string; className: string; board: string; medium: string; guardian: string; age: number; school: string; city: string };
export type VisitRequest = { id: string; child: string; date: string; focus: string; status: string; agent: string; address: string; premisesPermission: string; specialNote?: string };
export type Report = { id: string; child: string; date: string; agent: string; rating: string; notes: string; status: string; checklist: Record<string, 'Green' | 'Amber' | 'Red'>; photos: string[] };
export type ContentItem = { id: string; title: string; board: string; className: string; subject: string; chapter: string; topic: string; type: string; free: boolean };
export type Session = { id: string; professional: string; credential: string; languages: string; rating: string; availability: string; photo: string };
export type ScholarshipApplication = { id: string; student: string; income: string; occupation: string; state: string; documentName: string; status: string; reason: string; date: string };
export type PrintOrder = { id: string; item: string; price: number; address: string; status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered'; date: string; trackingId: string };

type DemoState = {
  role: Role;
  entitlement: Entitlement;
  language: 'English' | 'हिन्दी';
  consent: boolean;
  onboardingStep: number;
  showStarterCelebration: boolean;
  student: Student;
  activePage: string;
  activeSubpage: string;
  mood: string;
  savedTopics: string[];
  visits: VisitRequest[];
  reports: Report[];
  scholarships: ScholarshipApplication[];
  orders: PrintOrder[];
  cart: number;
  approved: boolean;
  set: (data: Partial<DemoState>) => void;
  reset: () => void;
};

const initial = {
  role: 'Parent' as Role,
  entitlement: 'Free' as Entitlement,
  language: 'English' as const,
  consent: false,
  onboardingStep: 0,
  showStarterCelebration: false,
  student: { id: 'stu-01', name: 'Aarav Sharma', className: '10', board: 'CBSE', medium: 'English', guardian: '98765 43210', age: 15, school: 'DAV Public School', city: 'Ranchi' },
  activePage: 'Home',
  activeSubpage: '',
  mood: '',
  savedTopics: [] as string[],
  cart: 0,
  approved: false,
  visits: [
    { id: 'VIS-204', child: 'Aarav Sharma', date: '18 Jun, 10:30 AM', focus: 'Study routine & food quality', status: 'In Progress', agent: 'Meena Kumari', address: '12 Lake Road, Ranchi Hostel', premisesPermission: 'Granted' },
    { id: 'VIS-205', child: 'Isha Sharma', date: '21 Jun, 3:00 PM', focus: 'Learning confidence', status: 'Under Review', agent: 'Not assigned', address: '45 Circular Road, Lalpur, Ranchi', premisesPermission: 'Pending' },
    { id: 'VIS-198', child: 'Aarav Sharma', date: '08 Jun, 11:00 AM', focus: 'Wellbeing check-in', status: 'Completed', agent: 'Meena Kumari', address: '12 Lake Road, Ranchi Hostel', premisesPermission: 'Granted' },
    { id: 'VIS-177', child: 'Nisha K.', date: '28 May, 02:00 PM', focus: 'Hostel condition', status: 'Not Permitted', agent: 'Ritu Sinha', address: 'Bariatu Hostel, Ranchi', premisesPermission: 'Refused' },
  ] as VisitRequest[],
  reports: [
    {
      id: 'RPT-198',
      child: 'Aarav Sharma',
      date: '08 Jun 2025',
      agent: 'Meena Kumari (ID: AG-042, GPS Verified)',
      rating: 'Doing Well',
      notes: 'A calm, respectful conversation about study routine and hostel meals. Aarav showed his organized study desk and mentioned enjoying group study in the hostel library. Warden confirmed good attendance.',
      status: 'Completed',
      checklist: {
        'Hostel Hygiene & Room': 'Green',
        'Food Quality & Meals': 'Green',
        'Study Environment & Routine': 'Green',
        'Safety & Premises': 'Green',
        'General Social Circle': 'Green',
        'Student Wellbeing & Mood': 'Green',
      },
      photos: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'RPT-187',
      child: 'Isha Sharma',
      date: '28 May 2025',
      agent: 'Ritu Sinha (ID: AG-019, GPS Verified)',
      rating: 'Needs Follow-up',
      notes: 'Isha was quiet initially but opened up during the check-in. Expressed feeling slightly overwhelmed before maths exams. Practised a simple weekly study plan and agreed to check in with family every Sunday.',
      status: 'Completed',
      checklist: {
        'Hostel Hygiene & Room': 'Green',
        'Food Quality & Meals': 'Amber',
        'Study Environment & Routine': 'Amber',
        'Safety & Premises': 'Green',
        'General Social Circle': 'Green',
        'Student Wellbeing & Mood': 'Amber',
      },
      photos: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
      ],
    },
  ] as Report[],
  scholarships: [
    { id: 'SCH-041', student: 'Aarav Sharma', income: '< ₹1.5 Lakh / yr', occupation: 'Agriculture / Daily Wage', state: 'Jharkhand', documentName: 'Income_Cert_2025_Verified.pdf', status: 'Submitted', reason: 'EWS scholarship for Class 10 student', date: '10 Jun 2025' },
    { id: 'SCH-038', student: 'Isha Sharma', income: '< ₹1.0 Lakh / yr', occupation: 'Handicraft worker', state: 'Bihar', documentName: 'Ration_Card_EWS_Scan.pdf', status: 'Approved · 90 days', reason: 'Verified EWS documentation passed admin check', date: '01 Jun 2025' },
  ] as ScholarshipApplication[],
  orders: [
    { id: 'ORD-061', item: 'CBSE Class 10 Maths Practice Workbook', price: 149, address: '12 Lake Road, Ranchi Hostel', status: 'Packed', date: '14 Jun 2025', trackingId: 'EXP-IN-982341' },
    { id: 'ORD-052', item: 'Science Diagram & Formula Wallchart', price: 99, address: '12 Lake Road, Ranchi Hostel', status: 'Delivered', date: '02 Jun 2025', trackingId: 'EXP-IN-771239' },
  ] as PrintOrder[],
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initial,
      set: (data) => set(data),
      reset: () => set(initial),
    }),
    {
      name: 'educare-demo-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        role: state.role,
        entitlement: state.entitlement,
        language: state.language,
        consent: state.consent,
        onboardingStep: state.onboardingStep,
        showStarterCelebration: state.showStarterCelebration,
        student: state.student,
        activePage: state.activePage,
        activeSubpage: state.activeSubpage,
        mood: state.mood,
        savedTopics: state.savedTopics,
        visits: state.visits,
        reports: state.reports,
        scholarships: state.scholarships,
        orders: state.orders,
        cart: state.cart,
        approved: state.approved,
      }),
    }
  )
);

