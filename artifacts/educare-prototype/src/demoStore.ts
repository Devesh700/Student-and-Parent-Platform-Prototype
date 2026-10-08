import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Role = 'Parent' | 'Student' | 'Field Agent' | 'Admin' | 'Counsellor';
export type Entitlement = 'Free' | 'Premium' | 'Free Access' | 'Expired';
export type User = { id: string; name: string; role: Role; phone: string; language: 'English' | 'हिन्दी' };
export type Student = { id: string; name: string; className: string; board: string; medium: string; guardian: string; age: number };
export type VisitRequest = { id: string; child: string; date: string; focus: string; status: string; agent: string; address: string };
export type Report = { id: string; child: string; date: string; agent: string; rating: string; notes: string; status: string };
export type ContentItem = { id: string; title: string; board: string; className: string; subject: string; chapter: string; topic: string; type: string; free: boolean };
export type Session = { id: string; professional: string; credential: string; languages: string; rating: string; availability: string };
export type ScholarshipApplication = { id: string; student: string; status: string; reason: string };

type DemoState = {
  role: Role;
  entitlement: Entitlement;
  language: 'English' | 'हिन्दी';
  consent: boolean;
  onboardingStep: number;
  student: Student;
  activePage: string;
  activeSubpage: string;
  mood: string;
  savedTopics: string[];
  visits: VisitRequest[];
  reports: Report[];
  scholarships: ScholarshipApplication[];
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
  student: { id: 'stu-01', name: 'Aarav Sharma', className: '10', board: 'CBSE', medium: 'English', guardian: '98765 43210', age: 15 },
  activePage: 'Home',
  activeSubpage: '',
  mood: '',
  savedTopics: [] as string[],
  cart: 0,
  approved: false,
  visits: [
    { id: 'VIS-204', child: 'Aarav Sharma', date: '18 Jun, 10:30 AM', focus: 'Study routine', status: 'In progress', agent: 'Meena Kumari', address: '12 Lake Road, Ranchi' },
    { id: 'VIS-205', child: 'Isha Sharma', date: '21 Jun, 3:00 PM', focus: 'Learning confidence', status: 'Pending request', agent: 'Not assigned', address: '12 Lake Road, Ranchi' },
    { id: 'VIS-198', child: 'Aarav Sharma', date: '08 Jun, 11:00 AM', focus: 'Wellbeing check-in', status: 'Completed', agent: 'Meena Kumari', address: '12 Lake Road, Ranchi' },
  ] as VisitRequest[],
  reports: [
    { id: 'RPT-198', child: 'Aarav Sharma', date: '08 Jun 2025', agent: 'Meena Kumari', rating: 'Doing well', notes: 'A calm, respectful conversation about his study routine. Aarav chose what he wanted to share.', status: 'Completed' },
    { id: 'RPT-187', child: 'Isha Sharma', date: '28 May 2025', agent: 'Ritu Sinha', rating: 'Needs follow-up', notes: 'Practised a simple weekly plan and agreed to check in with family.', status: 'Completed' },
  ] as Report[],
  scholarships: [
    { id: 'SCH-041', student: 'Aarav Sharma', status: 'Under review', reason: 'Household income support' },
    { id: 'SCH-038', student: 'Isha Sharma', status: 'Approved', reason: 'EWS support' },
  ] as ScholarshipApplication[],
};

export const useDemoStore = create<DemoState>()(persist((set) => ({
  ...initial,
  set: (data) => set(data),
  reset: () => set(initial),
}), { name: 'educare-demo-v1', storage: createJSONStorage(() => localStorage), partialize: (state) => ({
  role: state.role, entitlement: state.entitlement, language: state.language, consent: state.consent,
  onboardingStep: state.onboardingStep, student: state.student, activePage: state.activePage,
  activeSubpage: state.activeSubpage, mood: state.mood, savedTopics: state.savedTopics,
  visits: state.visits, reports: state.reports, scholarships: state.scholarships,
  cart: state.cart, approved: state.approved,
}) }));
