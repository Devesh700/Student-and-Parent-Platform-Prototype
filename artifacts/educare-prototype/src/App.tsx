import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  HeartHandshake,
  Home,
  Image as ImageIcon,
  Languages,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PhoneCall,
  Play,
  Plus,
  Printer,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Upload,
  Users,
  Video,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import { useDemoStore, type Role, type Entitlement, type ScholarshipApplication } from './demoStore';

const roles: Role[] = ['Parent', 'Student', 'Field Agent', 'Admin', 'Counsellor'];
const entitlements: Entitlement[] = ['Free', 'Premium', 'Free Access', 'Expired'];
const boards = ['CBSE', 'ICSE', 'Jharkhand', 'Bihar', 'Odisha', 'Chhattisgarh'];

const navByRole: Record<Role, string[]> = {
  Student: ['Home', 'Learn', 'Scholarship', 'Wellness', 'Live', 'Profile'],
  Parent: ['Home', 'Visits', 'Reports', 'Child', 'Profile'],
  'Field Agent': ['Today', 'Upcoming', 'Completed'],
  Admin: ['Overview', 'Visit queue', 'Agents', 'Scholarships', 'Content', 'Plans & orders', 'Users & payments', 'Safeguarding'],
  Counsellor: ['Today', 'Sessions', 'Availability'],
};

const journey: Record<Role, string> = {
  Parent: 'Your family journey: request a respectful physical visit, then review a private, verified report.',
  Student: 'Your learning journey: explore your free starter pack, apply for EWS scholarship, and find emotional support.',
  'Field Agent': 'Your field journey: check in via GPS, observe with care, and submit a private verification report.',
  Admin: 'Your service journey: review visit requests, manage EWS scholarships, protect learners, and curate content.',
  Counsellor: 'Your care journey: accept sessions, listen safely, maintain private notes, and escalate risks when needed.',
};

function Button({
  children,
  onClick,
  kind = 'primary',
  testId,
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: 'primary' | 'secondary' | 'quiet' | 'danger';
  testId?: string;
  className?: string;
  disabled?: boolean;
}) {
  const base =
    kind === 'primary'
      ? 'btn-primary'
      : kind === 'secondary'
      ? 'btn-secondary'
      : kind === 'danger'
      ? 'bg-[#c85a4b] text-white hover:bg-[#b34c3e]'
      : 'btn-quiet';
  return (
    <button
      disabled={disabled}
      data-testid={testId || 'button-action'}
      onClick={onClick}
      className={`${base} inline-flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`surface p-5 ${className}`}>{children}</section>;
}

function Label({ children }: { children: ReactNode }) {
  return <label className="field-label">{children}</label>;
}

function Tag({ children, gold = false, red = false, green = false }: { children: ReactNode; gold?: boolean; red?: boolean; green?: boolean }) {
  return (
    <span
      className={`tag ${
        gold ? 'tag-gold' : red ? 'tag-red' : green ? 'bg-[#e3eee1] text-[#2c533e] border border-[#c1dac2]' : ''
      }`}
    >
      {children}
    </span>
  );
}

export function AppShell() {
  const role = useDemoStore((s) => s.role);
  const entitlement = useDemoStore((s) => s.entitlement);
  const language = useDemoStore((s) => s.language);
  const page = useDemoStore((s) => s.activePage);
  const set = useDemoStore((s) => s.set);
  const reset = useDemoStore((s) => s.reset);
  const consent = useDemoStore((s) => s.consent);
  const showStarterCelebration = useDemoStore((s) => s.showStarterCelebration);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [notice, setNotice] = useState('');
  const [location, navigate] = useLocation();

  useEffect(() => {
    const openHelp = () => setShowHelp(true);
    const onboard = () => setShowOnboarding(true);
    window.addEventListener('educare-help', openHelp);
    window.addEventListener('educare-onboarding', onboard);
    return () => {
      window.removeEventListener('educare-help', openHelp);
      window.removeEventListener('educare-onboarding', onboard);
    };
  }, []);

  if (location === '/confirm') return <ConfirmPage />;

  const nav = navByRole[role];
  const selectPage = (p: string) => {
    set({ activePage: p, activeSubpage: '' });
    setMobileMenu(false);
  };

  return (
    <div className="app-shell pb-20 md:pb-8">
      <header className="sticky top-0 z-30 border-b border-[#e2e7dd] bg-[#f8f7f0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-8">
          <button
            onClick={() => {
              navigate('/');
              selectPage(role === 'Student' ? 'Home' : role === 'Parent' ? 'Home' : nav[0]);
            }}
            className="flex items-center gap-2.5 text-left"
            data-testid="button-brand-home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#294b41] text-[#f9e9c5]">
              <HeartHandshake size={21} />
            </span>
            <span>
              <strong className="block font-[Manrope] text-[17px] leading-none tracking-tight">EduCare</strong>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.17em] text-[#74877b]">A family companion</span>
            </span>
          </button>

          <div className="hidden items-center gap-2 text-[11px] font-semibold text-[#6d8074] md:flex">
            <ShieldCheck size={15} /> Demo Prototype · Interactive Client Walkthrough
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => set({ language: language === 'English' ? 'हिन्दी' : 'English' })}
              className="btn-quiet flex items-center gap-1.5 !px-2.5 !py-2 text-xs"
              data-testid="button-language-toggle"
            >
              <Languages size={15} />
              <span>{language === 'English' ? 'EN' : 'हिन्दी'}</span>
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-xl border border-[#dce4dc] p-2.5 md:hidden"
              aria-label="Open navigation"
              data-testid="button-open-menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-3 pb-8 pt-4 md:grid-cols-[238px_minmax(0,1fr)] md:px-8 md:pt-7">
        <aside className={`${mobileMenu ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-[84px] space-y-4">
            <div className="demo-panel rounded-[20px] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="eyebrow !text-[#c9d6c9]">Demo controls</span>
                <MoreHorizontal size={16} className="text-[#c9d6c9]" />
              </div>
              <Label>Preview as Role</Label>
              <select
                aria-label="Preview role"
                data-testid="select-role"
                className="field mb-3 !border-white/15 !bg-white/10 !text-[#fffdf6]"
                value={role}
                onChange={(e) => {
                  const r = e.target.value as Role;
                  set({ role: r, activePage: navByRole[r][0], activeSubpage: '' });
                  setMobileMenu(false);
                }}
              >
                {roles.map((r) => (
                  <option key={r} value={r} className="text-[#203d36]">
                    {r}
                  </option>
                ))}
              </select>

              <Label>Entitlement State</Label>
              <select
                aria-label="Preview entitlement"
                data-testid="select-entitlement"
                className="field !border-white/15 !bg-white/10 !text-[#fffdf6]"
                value={entitlement}
                onChange={(e) => set({ entitlement: e.target.value as Entitlement })}
              >
                {entitlements.map((e) => (
                  <option key={e} value={e} className="text-[#203d36]">
                    {e}
                  </option>
                ))}
              </select>

              <div className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-[11px] leading-4 text-[#d7e1d8]">
                <span className="font-bold text-[#f6e9cb]">{role}</span> · {entitlement}{' '}
                {consent ? <span className="text-[#a4e2b8]">(Consent Active)</span> : <span className="text-[#e8b5a0]">(Consent Pending)</span>}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="rounded-xl bg-white/10 px-2 py-2 text-[10px] font-bold text-[#f7f1e3] hover:bg-white/15"
                  data-testid="button-fast-forward-scholarship"
                  onClick={() => {
                    const all = useDemoStore.getState().scholarships;
                    set({
                      entitlement: 'Free Access',
                      approved: true,
                      scholarships: all.map((s, i) => (i === 0 ? { ...s, status: 'Approved · 90 days' } : s)),
                    });
                    setNotice('Fast-forward: Scholarship approved. Entitlement set to Free Access!');
                  }}
                >
                  Fast-forward EWS
                </button>
                <button
                  className="rounded-xl bg-white/10 px-2 py-2 text-[10px] font-bold text-[#f7f1e3] hover:bg-white/15"
                  data-testid="button-reset-demo"
                  onClick={() => {
                    reset();
                    set({ activePage: 'Home' });
                    setNotice('Demo state reset to defaults.');
                  }}
                >
                  Reset demo
                </button>
              </div>
            </div>

            <nav className="surface p-2.5" aria-label={`${role} navigation`}>
              <div className="px-3 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#89978c]">
                {role} Workspace
              </div>
              {nav.map((n) => (
                <button
                  key={n}
                  onClick={() => selectPage(n)}
                  className={`nav-item ${page === n ? 'active' : ''}`}
                  data-testid={`nav-${n.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {getIconForNav(role, n)}
                  {n}
                  {n === 'Safeguarding' && <span className="ml-auto h-2 w-2 rounded-full bg-[#c87562]" />}
                </button>
              ))}
              <div className="mt-2 border-t border-[#e8ebe4] pt-2">
                <Link href="/confirm" className="nav-item" data-testid="link-confirm-checklist">
                  <Check size={17} />
                  Client Checklist
                </Link>
              </div>
            </nav>

            <Card className="!p-4">
              <div className="flex items-start gap-2.5">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f5e7c8]">
                  <CircleHelp size={16} />
                </div>
                <div>
                  <p className="text-[12px] font-bold">Need assistance?</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#738278]">Safety & helplines always available.</p>
                  <button
                    onClick={() => setShowHelp(true)}
                    className="mt-2 text-[11px] font-extrabold text-[#294b41] underline underline-offset-2"
                    data-testid="button-help-sidebar"
                  >
                    Helpline Directory
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#e1e7dd] bg-[#eef2e9] px-4 py-3">
            <p data-testid="text-journey-guide" className="text-[12px] leading-5 text-[#526b5e]">
              <Sparkles size={14} className="mr-1.5 inline text-[#b28743]" />
              {journey[role]}
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="text-[11px] font-extrabold text-[#294b41] underline underline-offset-2"
              data-testid="button-onboarding-toggle"
            >
              Start Onboarding Flow
            </button>
          </div>

          <RoleScreen role={role} page={page} notify={setNotice} />

          {role === 'Student' && (
            <button
              onClick={() => setShowHelp(true)}
              className="fixed bottom-20 right-4 z-20 flex h-12 items-center gap-2 rounded-full bg-[#c57f61] px-4 text-white shadow-lg md:bottom-7 md:right-8"
              aria-label="I need help now"
              data-testid="button-always-visible-help"
            >
              <CircleHelp size={20} />
              <span className="text-xs font-bold">I need help now</span>
            </button>
          )}

          {notice && (
            <div
              role="status"
              data-testid="status-feedback"
              className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-[#24483e] px-5 py-3 text-sm font-semibold text-white shadow-xl flex items-center gap-3"
            >
              <span>{notice}</span>
              <button onClick={() => setNotice('')} aria-label="Dismiss message">
                <X size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e2e7dd] bg-[#f8f7f0]/95 backdrop-blur md:hidden">
        <div className="flex justify-around p-2">
          {nav.slice(0, 5).map((n) => (
            <button
              key={n}
              onClick={() => selectPage(n)}
              className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${
                page === n ? 'text-[#294b41]' : 'text-[#738278]'
              }`}
            >
              {getIconForNav(role, n)}
              <span>{n}</span>
            </button>
          ))}
        </div>
      </div>

      {showOnboarding && <Onboarding close={() => setShowOnboarding(false)} notify={setNotice} />}
      {showHelp && <HelpSheet close={() => setShowHelp(false)} notify={setNotice} />}
      {showStarterCelebration && <StarterPackCelebrationModal close={() => set({ showStarterCelebration: false })} />}
    </div>
  );
}

function getIconForNav(role: Role, name: string) {
  if (role === 'Student') {
    if (name === 'Home') return <Home size={17} />;
    if (name === 'Learn') return <BookOpen size={17} />;
    if (name === 'Scholarship') return <GraduationCap size={17} />;
    if (name === 'Wellness') return <HeartHandshake size={17} />;
    if (name === 'Live') return <Video size={17} />;
    return <Users size={17} />;
  }
  if (role === 'Parent') {
    if (name === 'Home') return <Home size={17} />;
    if (name === 'Visits') return <Clock3 size={17} />;
    if (name === 'Reports') return <FileText size={17} />;
    if (name === 'Child') return <GraduationCap size={17} />;
    return <Users size={17} />;
  }
  return <Sparkles size={17} />;
}

function RoleScreen({ role, page, notify }: { role: Role; page: string; notify: (s: string) => void }) {
  if (role === 'Student') return <StudentScreen page={page} notify={notify} />;
  if (role === 'Parent') return <ParentScreen page={page} notify={notify} />;
  if (role === 'Field Agent') return <AgentScreen page={page} notify={notify} />;
  if (role === 'Admin') return <AdminScreen page={page} notify={notify} />;
  return <CounsellorScreen page={page} notify={notify} />;
}

function PageHeading({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="eyebrow mb-1.5">{eyebrow}</div>
        <h1 className="text-[28px] font-extrabold leading-tight md:text-[34px]">{title}</h1>
        <p className="mt-1 max-w-2xl text-[13px] leading-5 text-[#728078]">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

/* ==================== STUDENT WORKSPACE ==================== */

function StudentScreen({ page, notify }: { page: string; notify: (s: string) => void }) {
  const entitlement = useDemoStore((s) => s.entitlement);
  const student = useDemoStore((s) => s.student);
  const set = useDemoStore((s) => s.set);
  const consent = useDemoStore((s) => s.consent);
  const mood = useDemoStore((s) => s.mood);
  const orders = useDemoStore((s) => s.orders);

  const [selectedBoard, setSelectedBoard] = useState(student.board || 'CBSE');
  const [selectedSubject, setSelectedSubject] = useState('Maths');
  const [topic, setTopic] = useState('Pair of linear equations');
  const [contentTab, setContentTab] = useState('Video');
  const [chatOpen, setChatOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [pageNo, setPageNo] = useState(1);
  const [speed, setSpeed] = useState('1×');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('12 Lake Road, Ranchi Hostel');
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  const locked = entitlement === 'Free' || entitlement === 'Expired';

  if (page === 'Learn' && !consent) {
    return (
      <>
        <PageHeading
          eyebrow="Learning space"
          title="Parent consent unlocks the free starter pack."
          subtitle="Under Indian data guidance, a parent or guardian confirms consent before minor student features unlock."
        />
        <Card className="mx-auto max-w-xl text-center !bg-[#f5ead2] !p-8">
          <ShieldCheck size={36} className="mx-auto text-[#7e714f]" />
          <h2 className="mt-3 text-2xl font-extrabold text-[#3a3221]">Learning unlocks with consent.</h2>
          <p className="mt-2 text-sm leading-6 text-[#746c59]">
            3 counselling videos, 2 board masterclasses, and 3 sample PDF notes are ready as soon as your parent confirms.
          </p>
          <Button className="mt-5" onClick={() => window.dispatchEvent(new Event('educare-onboarding'))}>
            Complete Guardian Consent Now
          </Button>
        </Card>
      </>
    );
  }

  if (page === 'Learn') {
    const isSeeded =
      (selectedBoard === 'CBSE' && (selectedSubject === 'Maths' || selectedSubject === 'Science') && student.className === '10') ||
      (selectedBoard === 'Bihar' && selectedSubject === 'Maths' && student.className === '10') ||
      (selectedBoard === 'ICSE' && selectedSubject === 'Physics' && student.className === '11');

    return (
      <>
        <PageHeading
          eyebrow="Your learning space"
          title="Explore lessons across 6 boards & 7 classes."
          subtitle="Move smoothly between Video, PDF, Print, and Infographic formats."
        />

        <Card>
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <Label>Board</Label>
              <select className="field" value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
                {boards.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Class</Label>
              <select
                className="field"
                value={student.className}
                onChange={(e) => set({ student: { ...student, className: e.target.value } })}
              >
                {Array.from({ length: 7 }, (_, i) => (
                  <option key={i}>{i + 6}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Subject</Label>
              <select className="field" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option>Maths</option>
                <option>Science</option>
                <option>Physics</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
            <div>
              <Label>Chapter</Label>
              <select className="field">
                <option>Chapter 4 · Linear Equations</option>
                <option>Chapter 2 · Real Numbers</option>
                <option>Chapter 5 · Light & Optics</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
            <Tag gold>{selectedBoard}</Tag>
            <Tag>Class {student.className}</Tag>
            <Tag>{selectedSubject}</Tag>
            {isSeeded ? <Tag green>Syllabus Available</Tag> : <Tag red>Content Coming Soon</Tag>}
          </div>
        </Card>

        {!isSeeded ? (
          <Card className="mt-4 bg-[#f8f1e2] text-center !p-8">
            <BookOpen size={32} className="mx-auto text-[#a88243]" />
            <h3 className="mt-3 text-xl font-extrabold text-[#473c26]">Content coming soon</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756852]">
              Our academic team is curating verified lessons for {selectedBoard} Board Class {student.className} {selectedSubject}. Tapping notify will log your preference!
            </p>
            <Button className="mt-4" onClick={() => notify(`Notification request logged for ${selectedBoard} Class ${student.className} ${selectedSubject}`)}>
              Notify me when published
            </Button>
          </Card>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(270px,.8fr)]">
            <Card className="!p-0 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#e9ece5] px-5 py-4">
                <div>
                  <p className="eyebrow">Topic · 12 min lesson</p>
                  <h2 className="mt-1 text-xl font-extrabold">{topic}</h2>
                </div>
                <button onClick={() => notify('Topic saved to your offline bookmark list')} aria-label="Bookmark">
                  <Bookmark size={20} className="text-[#7b8b7d]" />
                </button>
              </div>

              <div className="tab-scroll flex gap-2 overflow-x-auto border-b border-[#e9ece5] px-4 py-3">
                {['Video', 'PDF', 'Print', 'Images'].map((t) => (
                  <button
                    onClick={() => setContentTab(t)}
                    key={t}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      contentTab === t ? 'bg-[#294b41] text-white' : 'bg-[#f0f2ed] text-[#667b70] hover:bg-[#e4e9e1]'
                    }`}
                    data-testid={`tab-${t.toLowerCase()}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {locked && ['Print', 'Images'].includes(contentTab) ? (
                <div className="p-8 text-center">
                  <LockKeyhole size={28} className="mx-auto mb-3 text-[#b18a4d]" />
                  <h3 className="text-lg font-bold">This tab is part of Premium</h3>
                  <p className="mt-1 text-sm text-[#758379]">Unlock print workbooks and diagram galleries when your family is ready.</p>
                  <Button className="mt-4" onClick={() => setPaywallOpen(true)}>
                    View Plans & Options
                  </Button>
                </div>
              ) : contentTab === 'Video' ? (
                <div className="p-4">
                  <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[17px] bg-[#223932] text-center text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,#3b6558_0_15%,transparent_16%),linear-gradient(135deg,#1f362e,#2f4f44)]" />
                    <div className="relative z-10 max-w-xs p-4">
                      <button
                        onClick={() => notify('Video playing in demo player')}
                        className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#f9e9c5] text-[#294b41] shadow-md transition-transform hover:scale-105"
                      >
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </button>
                      <p className="font-[Manrope] text-lg font-extrabold">{topic}</p>
                      <p className="mt-1 text-xs text-[#b8ccc0]">CBSE Class 10 Maths · 12:10</p>
                    </div>
                    {/* Watermark */}
                    <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest text-[#a1c4b4] opacity-80">
                      EDUCARE · {student.name.toUpperCase()} · {student.id}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] bg-black/40 backdrop-blur px-2 py-1 rounded text-[#e0e8e3]">
                      Dynamic Watermark Active
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <Button kind="quiet" onClick={() => notify('Lesson resumed from 04:32')}>
                        <Play size={14} /> Resume (04:32)
                      </Button>
                      <button
                        className="btn-quiet !px-3 text-xs"
                        onClick={() => setSpeed(speed === '1×' ? '1.25×' : speed === '1.25×' ? '1.5×' : '1×')}
                      >
                        Speed: {speed}
                      </button>
                    </div>
                    <span className="text-xs text-[#809087]">04:32 / 12:10</span>
                  </div>
                </div>
              ) : contentTab === 'PDF' ? (
                <div className="p-4">
                  <div className="flex items-center justify-between rounded-t-xl bg-[#e8eee6] p-3 text-xs">
                    <span className="font-bold">Summary Notes · Page {pageNo} of 6</span>
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 hover:bg-white" onClick={() => setZoom(Math.max(75, zoom - 10))}>
                        -
                      </button>
                      <span>{zoom}%</span>
                      <button className="rounded p-1 hover:bg-white" onClick={() => setZoom(Math.min(150, zoom + 10))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className="relative min-h-[220px] border-x border-[#e5e8df] bg-[#fffefa] px-8 py-7 text-center shadow-inner"
                    style={{ fontSize: `${zoom}%` }}
                  >
                    {/* Watermark overlay */}
                    <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-10">
                      <span className="rotate-[-25deg] text-3xl font-extrabold text-[#294b41]">
                        {student.name} · {student.id}
                      </span>
                    </div>

                    <div className="eyebrow">{selectedSubject} · Class {student.className}</div>
                    <h3 className="mt-3 text-xl font-extrabold text-[#253d34]">{topic}</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5b6e63]">
                      To solve two linear equations simultaneously, isolate one variable in terms of the other and substitute it into the second equation.
                    </p>
                    <div className="mx-auto mt-4 w-fit rounded-lg bg-[#eff3eb] px-6 py-3 font-mono text-sm font-bold text-[#294b41]">
                      ax + by + c = 0
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-b-xl bg-[#e8eee6] p-3">
                    <button className="btn-quiet !py-1.5 text-xs" onClick={() => setPageNo(Math.max(1, pageNo - 1))}>
                      Previous
                    </button>
                    <span className="text-xs text-[#687c70]">{pageNo} / 6</span>
                    <button className="btn-quiet !py-1.5 text-xs" onClick={() => setPageNo(Math.min(6, pageNo + 1))}>
                      Next
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-[#86948a]">In-app viewer · Direct PDF downloads restricted for content protection</p>
                </div>
              ) : contentTab === 'Print' ? (
                <div className="p-5">
                  <div className="flex gap-4">
                    <div className="grid h-28 w-24 shrink-0 place-items-center rounded-xl bg-[#f4e7c9]">
                      <Printer size={32} className="text-[#63512e]" />
                    </div>
                    <div>
                      <Tag gold>Printed Workbook</Tag>
                      <h3 className="mt-2 font-bold text-lg">Class 10 Maths Practice Book</h3>
                      <p className="mt-1 text-xs leading-5 text-[#718177]">High-quality physical workbook delivered directly to your hostel/home.</p>
                      <p className="mt-2 text-xl font-extrabold text-[#294b41]">₹149</p>
                    </div>
                  </div>

                  <label className="mt-4 block">
                    <Label>Delivery Address</Label>
                    <input className="field" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                  </label>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {student.age < 18 ? (
                      <Button kind="secondary" onClick={() => notify('Parent-pay link shared: "Ask Parent to Pay for Printed Workbook"')}>
                        Ask Parent to Pay (Minor Rule)
                      </Button>
                    ) : (
                      <Button onClick={() => notify('Order placed! Demo payment successful.')}>Pay & Order (₹149)</Button>
                    )}
                  </div>

                  {orders.length > 0 && (
                    <div className="mt-5 border-t border-[#e8ebe4] pt-4">
                      <h4 className="font-bold text-sm">Your Printed Orders & Delivery Status</h4>
                      <div className="mt-3 space-y-3">
                        {orders.map((o) => (
                          <div key={o.id} className="rounded-xl bg-[#f5f7f2] p-3 text-xs">
                            <div className="flex justify-between font-bold">
                              <span>{o.item}</span>
                              <Tag gold>{o.status}</Tag>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <Truck size={16} className="text-[#4b6154]" />
                              <div className="flex-1">
                                <div className="h-1.5 rounded-full bg-[#e2e8de]">
                                  <div
                                    className={`h-full rounded-full bg-[#294b41] ${
                                      o.status === 'Placed'
                                        ? 'w-1/4'
                                        : o.status === 'Packed'
                                        ? 'w-2/4'
                                        : o.status === 'Shipped'
                                        ? 'w-3/4'
                                        : 'w-full'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="mt-2 text-[10px] text-[#7a877e]">Tracking ID: {o.trackingId} · Address: {o.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Images tab */
                <div className="p-5">
                  <p className="text-xs text-[#6e7d72] mb-3">Tap any educational chart or diagram to view in Lightbox Zoom:</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: 'Linear Equations Formula Sheet', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&auto=format&fit=crop&q=80' },
                      { title: 'Graphing Pairs of Straight Lines', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&auto=format&fit=crop&q=80' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLightboxImage(item.img)}
                        className="group overflow-hidden rounded-xl border border-[#e2e7dd] text-left hover:border-[#294b41]"
                      >
                        <img src={item.img} alt={item.title} className="h-32 w-full object-cover transition-transform group-hover:scale-105" />
                        <div className="p-2.5 bg-white">
                          <span className="block text-xs font-bold">{item.title}</span>
                          <span className="text-[10px] text-[#75847a]">Tap to enlarge</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <div className="space-y-4">
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="eyebrow">Topics for you</p>
                    <h3 className="mt-1 text-lg font-extrabold">Chapter Topics</h3>
                  </div>
                  <Tag>4 topics</Tag>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    'Pair of linear equations',
                    'Substitution method',
                    'Elimination method',
                    'Graphical representation',
                  ].map((t, i) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                        topic === t ? 'bg-[#edf2eb] font-bold' : 'hover:bg-[#f5f6f1]'
                      }`}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#f3e6c9] text-xs font-extrabold">
                        0{i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs">{t}</span>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#f4ead2]">
                <p className="eyebrow">Free Starter Pack</p>
                <h3 className="mt-1 text-lg font-extrabold">Unlocked with Consent</h3>
                <p className="mt-1 text-xs leading-5 text-[#748177]">3 counselling videos · 2 masterclasses · 3 sample PDFs</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e2d6bc]">
                  <div className="h-full w-1/3 rounded-full bg-[#294b41]" />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative max-w-3xl rounded-2xl bg-white p-4">
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute top-3 right-3 rounded-full bg-[#f0f2ed] p-2 hover:bg-[#e2e7dd]"
              >
                <X size={18} />
              </button>
              <h3 className="mb-3 text-base font-bold">Infographic Chart Viewer</h3>
              <img src={activeLightboxImage} alt="Zoomed chart" className="max-h-[70vh] w-full rounded-xl object-contain" />
              <div className="mt-3 flex justify-between text-xs text-[#738278]">
                <span>Pinch or click to zoom diagram</span>
                <Button kind="quiet" onClick={() => setActiveLightboxImage(null)}>
                  Close Lightbox
                </Button>
              </div>
            </div>
          </div>
        )}

        {paywallOpen && <PaywallSheet close={() => setPaywallOpen(false)} notify={notify} />}
      </>
    );
  }

  if (page === 'Scholarship') {
    return <ScholarshipScreen notify={notify} />;
  }

  if (page === 'Wellness') {
    return (
      <>
        <PageHeading
          eyebrow="A gentle check-in"
          title="How are you feeling today?"
          subtitle="A safe space to check in with your emotions. Saved privately on this device in demo."
        />
        <div className="grid gap-4 lg:grid-cols-[1fr_.8fr]">
          <Card>
            <p className="eyebrow">Mood check-in</p>
            <h2 className="mt-1 text-xl font-extrabold">Select how you feel right now.</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {['Calm', 'Okay', 'Tired', 'Worried', 'Stressed'].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    set({ mood: m });
                    notify(`Mood saved: ${m}. Take a moment for yourself.`);
                  }}
                  data-testid={`mood-${m.toLowerCase()}`}
                  className={`rounded-2xl border p-4 text-center transition-all ${
                    mood === m ? 'border-[#294b41] bg-[#e6eee3] shadow-sm' : 'border-[#e4e8df] bg-[#fffefa] hover:bg-[#f7f9f6]'
                  }`}
                >
                  <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-[#f4e7c9]">
                    {m === 'Calm' ? <Activity size={18} /> : m === 'Okay' ? <Check size={18} /> : <HeartHandshake size={18} />}
                  </span>
                  <span className="text-xs font-bold">{m}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <HeartHandshake size={20} className="text-[#294b41]" />
              <h3 className="text-lg font-extrabold">Speak with a Counsellor</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#718177]">
              Certified counsellors are available via live text chat, voice call, or video call.
            </p>
            <Button className="mt-4" onClick={() => (locked ? setPaywallOpen(true) : set({ activePage: 'Live' }))}>
              {locked ? 'Unlock Live Support (Premium / EWS)' : 'Go to Live Hub'}
            </Button>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-xl font-extrabold">Counselling & Mental Health Videos</h2>
          <VideoShelf count={6} free={3} notify={notify} onPaywall={() => setPaywallOpen(true)} />
        </div>

        {paywallOpen && <PaywallSheet close={() => setPaywallOpen(false)} notify={notify} />}
      </>
    );
  }

  if (page === 'Live') {
    return (
      <>
        <PageHeading
          eyebrow="Live Hub"
          title="Talk with verified professionals."
          subtitle="Safe in-app text chat, voice call, and video call options. Contact stays inside the platform."
        />

        <div className="mb-4 rounded-2xl border border-[#ead9b3] bg-[#f8f0df] p-4 text-sm text-[#685d45] flex items-start gap-3">
          <ShieldCheck size={20} className="shrink-0 text-[#b28743]" />
          <div>
            <strong>Safeguarding Notice:</strong> Sessions take place strictly inside EduCare. Phone numbers or external links are never exchanged.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['Dr. Rhea Menon', 'Child & Adolescent Counsellor', 'English, Hindi, Malayalam', '4.9', 'Available Now'],
            ['Sana Qureshi', 'School Wellbeing Specialist', 'Hindi, Urdu, English', '4.8', 'Available in 12m'],
            ['Arvind Rao', 'Adolescent Psychologist', 'English, Hindi, Kannada', '4.9', 'Available Now'],
            ['Nidhi Soren', 'Youth Counsellor', 'Hindi, Santali, English', '4.7', 'Available in 20m'],
            ['Kavita Das', 'Family Counsellor', 'Hindi, Bengali, English', '4.9', 'Available Tomorrow'],
          ].map(([name, credential, langs, rating, availability], i) => (
            <Card key={name} className="!p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-[16px] font-[Manrope] text-lg font-extrabold ${
                      ['bg-[#e6eddf]', 'bg-[#f3e5c9]', 'bg-[#e5ecee]', 'bg-[#eee4dc]', 'bg-[#e8e7d7]'][i]
                    }`}
                  >
                    {name
                      .split(' ')
                      .map((s) => s[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold">{name}</h3>
                    <p className="text-[11px] text-[#738177]">{credential}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold">
                    <Star size={13} className="fill-[#c99545] text-[#c99545]" />
                    {rating}
                  </span>
                </div>
                <p className="mt-3 text-xs text-[#687b70]">{langs}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#e9ece4] pt-3">
                <Tag gold>{availability}</Tag>
                <Button onClick={() => (locked ? setPaywallOpen(true) : setChatOpen(true))}>
                  {locked ? <LockKeyhole size={14} /> : <MessageCircle size={14} />}
                  {locked ? 'Locked' : 'Start Session'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {chatOpen && <SessionModal close={() => setChatOpen(false)} notify={notify} />}
        {paywallOpen && <PaywallSheet close={() => setPaywallOpen(false)} notify={notify} />}
      </>
    );
  }

  if (page === 'Profile') {
    return (
      <>
        <PageHeading
          eyebrow="Your Profile"
          title="Student details & preferences."
          subtitle="Manage class/board taxonomy, entitlement status, and privacy options."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="eyebrow">Academic Settings</p>
            <h3 className="mt-2 text-xl font-extrabold">{student.name}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="soft-surface p-3">
                <span className="eyebrow">Class</span>
                <p className="mt-1 font-bold">{student.className}</p>
              </div>
              <div className="soft-surface p-3">
                <span className="eyebrow">Board</span>
                <p className="mt-1 font-bold">{student.board}</p>
              </div>
              <div className="soft-surface p-3">
                <span className="eyebrow">Medium</span>
                <p className="mt-1 font-bold">{student.medium}</p>
              </div>
              <div className="soft-surface p-3">
                <span className="eyebrow">Guardian Phone</span>
                <p className="mt-1 font-bold">{student.guardian}</p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="eyebrow">Access & Entitlement</p>
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold">{entitlement}</h3>
              <Tag green={consent}>{consent ? 'Consent Verified' : 'Consent Pending'}</Tag>
            </div>
            <p className="mt-2 text-sm text-[#758379]">Language: English · Free starter pack unlocked.</p>
            <div className="mt-5 border-t border-[#e8ebe4] pt-4">
              <h4 className="font-bold text-sm">Data & Privacy Options</h4>
              <p className="mt-1 text-xs text-[#758379]">Under DPDP Act compliance guidance, you can request full data deletion.</p>
              <Button
                kind="quiet"
                className="mt-3"
                onClick={() => {
                  set({ mood: '', savedTopics: [] });
                  notify('Data deletion request logged in demo browser store.');
                }}
              >
                Request Account Data Deletion
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return <StudentHome notify={notify} />;
}

function StudentHome({ notify }: { notify: (s: string) => void }) {
  const set = useDemoStore((s) => s.set);
  const student = useDemoStore((s) => s.student);
  const consent = useDemoStore((s) => s.consent);
  const [paywall, setPaywall] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-[26px] bg-[#294b41] px-5 py-7 text-[#f8f2e3] md:px-8 md:py-9">
        <div className="relative max-w-[590px]">
          <div className="eyebrow !text-[#c9d8c9]">Welcome back, {student.name.split(' ')[0]}</div>
          <h1 className="mt-2 text-[30px] font-extrabold leading-tight md:text-[40px]">
            Small steps lead to great progress. <br />
            <span className="text-[#edcf91]">Keep going.</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#d3ddd1]">
            Your safe space for verified academic learning and emotional wellbeing support.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button kind="secondary" onClick={() => set({ activePage: 'Learn' })}>
              <BookOpen size={16} /> Continue Learning
            </Button>
            <Button kind="quiet" className="!text-[#faf4e7]" onClick={() => set({ activePage: 'Scholarship' })}>
              <GraduationCap size={16} /> EWS Scholarship Application
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_.8fr]">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Starter Pack · {consent ? 'Unlocked' : 'Consent Pending'}</p>
              <h2 className="mt-1 text-xl font-extrabold">Your Starter Pack Progress</h2>
              <p className="mt-1 text-xs text-[#748177]">Explore counselling videos, masterclasses, and sample notes.</p>
            </div>
            <Sparkles size={24} className="text-[#cfaa61]" />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              ['03', 'Counselling Videos'],
              ['02', 'Board Masterclasses'],
              ['03', 'Sample PDFs'],
            ].map(([n, t]) => (
              <button
                key={t}
                onClick={() => set({ activePage: t === 'Counselling Videos' ? 'Wellness' : 'Learn' })}
                className="soft-surface p-3 text-left hover:bg-[#eaf0e7]"
              >
                <span className="block font-[Manrope] text-2xl font-extrabold">{n}</span>
                <span className="text-[10px] font-semibold text-[#697d70]">{t}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="bg-[#f5ead2]">
          <p className="eyebrow">Financial Access</p>
          <h2 className="mt-2 text-xl font-extrabold">EWS Scholarship</h2>
          <p className="mt-1 text-sm leading-5 text-[#738075]">Economically weaker students receive 100% free premium access.</p>
          <Button className="mt-3" onClick={() => set({ activePage: 'Scholarship' })}>
            View / Apply Scholarship
          </Button>
        </Card>
      </div>

      {paywall && <PaywallSheet close={() => setPaywall(false)} notify={notify} />}
    </>
  );
}

/* EWS SCHOLARSHIP SCREEN */
function ScholarshipScreen({ notify }: { notify: (s: string) => void }) {
  const scholarships = useDemoStore((s) => s.scholarships);
  const student = useDemoStore((s) => s.student);
  const set = useDemoStore((s) => s.set);

  const [income, setIncome] = useState('< ₹1.5 Lakh / yr');
  const [occupation, setOccupation] = useState('Agriculture / Daily Wage');
  const [state, setState] = useState('Jharkhand');
  const [fileName, setFileName] = useState('');
  const [declaration, setDeclaration] = useState(false);

  const submitApp = () => {
    if (!declaration) return;
    const newApp: ScholarshipApplication = {
      id: `SCH-0${Math.floor(Math.random() * 90 + 10)}`,
      student: student.name,
      income,
      occupation,
      state,
      documentName: fileName || 'Uploaded_EWS_Document.pdf',
      status: 'Submitted',
      reason: 'EWS scholarship request submitted',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    set({ scholarships: [newApp, ...scholarships] });
    notify('Scholarship application submitted! Status: Submitted for Admin Review.');
  };

  return (
    <>
      <PageHeading
        eyebrow="EWS Scholarship Program"
        title="Equal opportunity learning."
        subtitle="Verifiable economically weaker section (EWS) students get automatic Free Access to all premium learning content."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-extrabold">New EWS Application</h2>
          <p className="mt-1 text-xs text-[#718177]">All uploaded document previews remain local to your browser session.</p>

          <div className="mt-4 space-y-3">
            <div>
              <Label>Student Name</Label>
              <input className="field bg-[#f4f7f2]" value={student.name} disabled />
            </div>

            <div>
              <Label>Annual Household Income</Label>
              <select className="field" value={income} onChange={(e) => setIncome(e.target.value)}>
                <option>&lt; ₹1.0 Lakh / yr</option>
                <option>&lt; ₹1.5 Lakh / yr</option>
                <option>&lt; ₹2.5 Lakh / yr</option>
              </select>
            </div>

            <div>
              <Label>Parent / Guardian Occupation</Label>
              <input className="field" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Daily wage laborer, farming" />
            </div>

            <div>
              <Label>State of Residence</Label>
              <select className="field" value={state} onChange={(e) => setState(e.target.value)}>
                <option>Jharkhand</option>
                <option>Bihar</option>
                <option>Odisha</option>
                <option>Chhattisgarh</option>
              </select>
            </div>

            <div>
              <Label>Upload EWS / Income Proof Document</Label>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#b8c6ba] bg-[#f9faf7] p-3">
                <Upload size={20} className="text-[#64796c]" />
                <input
                  type="file"
                  className="text-xs"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || 'EWS_Income_Proof.pdf')}
                />
              </div>
              {fileName && <p className="mt-1 text-[11px] font-bold text-[#294b41]">Selected: {fileName}</p>}
            </div>

            <label className="flex items-start gap-2 pt-2 text-xs leading-5">
              <input type="checkbox" checked={declaration} onChange={(e) => setDeclaration(e.target.checked)} />
              I declare that the information provided is accurate and verifiable.
            </label>

            <Button disabled={!declaration} onClick={submitApp} className="w-full">
              Submit EWS Application
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-extrabold">Your Applications & Status</h2>
          <div className="mt-4 space-y-3">
            {scholarships.map((s) => (
              <div key={s.id} className="rounded-xl border border-[#e2e7dd] bg-[#f9faf7] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm">{s.id}</span>
                  <Tag gold={s.status.includes('Submitted')} green={s.status.includes('Approved')}>
                    {s.status}
                  </Tag>
                </div>
                <p className="mt-2 text-xs font-semibold">{s.student} · {s.state}</p>
                <p className="mt-1 text-xs text-[#718177]">{s.reason} · Doc: {s.documentName}</p>
                <p className="mt-2 text-[10px] text-[#86948a]">Submitted: {s.date}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-[#f5ead2] p-4 text-xs leading-5 text-[#685c45]">
            <Sparkles size={16} className="mr-1 inline text-[#a88243]" />
            <strong>Demo Shortcut:</strong> Click <strong>Fast-forward EWS</strong> in the left drawer demo controls to instantly simulate Admin approval and unlock Free Access!
          </div>
        </Card>
      </div>
    </>
  );
}

function VideoShelf({ count, free, notify, onPaywall }: { count: number; free: number; notify: (s: string) => void; onPaywall: () => void }) {
  const entitlement = useDemoStore((s) => s.entitlement);
  const consent = useDemoStore((s) => s.consent);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, i) => {
        const canWatch = (i < free && consent) || entitlement === 'Premium' || entitlement === 'Free Access';
        const titles = [
          'Making room for big feelings',
          'A kinder inner voice',
          'Small steps through exam stress',
          'Sleep and study balance',
          'Navigating hostel friendships',
          'When & how to ask for help',
        ];
        return (
          <Card key={i} className="!p-4 flex flex-col justify-between">
            <div>
              <div className={`grid aspect-[1.8] place-items-center rounded-xl ${['bg-[#dce9df]', 'bg-[#f0e5cd]', 'bg-[#e2ebec]'][i % 3]}`}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#294b41] text-white">
                  <Play size={17} fill="currentColor" />
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm">{titles[i]}</h3>
                  <p className="mt-1 text-[10px] text-[#829086]">Wellbeing · {8 + i * 2} min</p>
                </div>
                {i < free && consent ? (
                  <Tag green>Free</Tag>
                ) : (
                  <Tag gold>
                    <LockKeyhole size={10} className="mr-1 inline" />
                    {i < free ? 'Consent Required' : 'Premium'}
                  </Tag>
                )}
              </div>
            </div>
            <Button
              kind="quiet"
              className="mt-3 w-full"
              onClick={() =>
                canWatch
                  ? notify('Video opened · Dynamic watermark active.')
                  : i < free
                  ? window.dispatchEvent(new Event('educare-onboarding'))
                  : onPaywall()
              }
            >
              {canWatch ? 'Watch Video' : i < free ? 'Complete Consent' : 'Unlock Video'}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

/* ==================== PARENT WORKSPACE ==================== */

function ParentScreen({ page, notify }: { page: string; notify: (s: string) => void }) {
  const visits = useDemoStore((s) => s.visits);
  const reports = useDemoStore((s) => s.reports);
  const scholarships = useDemoStore((s) => s.scholarships);
  const set = useDemoStore((s) => s.set);

  const [wizard, setWizard] = useState(false);
  const [selectedReportPdf, setSelectedReportPdf] = useState<any | null>(null);

  if (page === 'Visits') {
    return (
      <>
        <PageHeading
          eyebrow="Physical Verification Visits"
          title="Field verifications for parental peace of mind."
          subtitle="Trained field agents physically check on living conditions, food quality, and social wellbeing."
          action={
            <Button onClick={() => setWizard(true)}>
              <Plus size={16} /> Request Physical Visit
            </Button>
          }
        />

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {[
            ['1', 'Pending Requests'],
            ['1', 'In Progress'],
            ['2', 'Completed Reports'],
          ].map(([n, l]) => (
            <Card key={l} className="!p-4">
              <span className="font-[Manrope] text-2xl font-extrabold">{n}</span>
              <span className="ml-2 text-xs text-[#78867b]">{l}</span>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          {visits.map((v) => (
            <Card key={v.id} className="!p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Tag gold={v.status !== 'Completed'} red={v.status === 'Not Permitted'} green={v.status === 'Completed'}>
                      {v.status}
                    </Tag>
                    <span className="text-[10px] text-[#87938a]">{v.id}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-extrabold">
                    {v.child} · {v.focus}
                  </h3>
                  <p className="mt-1 text-xs text-[#758379]">
                    {v.date} · {v.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-[#87938a]">Assigned Agent</p>
                  <p className="mt-1 text-xs font-bold">{v.agent}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e9ece4] pt-3">
                <div className="flex items-center gap-2 text-[10px] text-[#78877d]">
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 size={13} className="text-[#294b41]" /> Requested
                  </span>
                  <ArrowRight size={12} />
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 size={13} className="text-[#294b41]" /> Premises Permission
                  </span>
                  <ArrowRight size={12} />
                  <span className="flex items-center gap-1 font-bold">
                    {v.status === 'Completed' ? (
                      <CheckCircle2 size={13} className="text-[#294b41]" />
                    ) : (
                      <Clock3 size={13} className="text-[#c99545]" />
                    )}{' '}
                    {v.status === 'Completed' ? 'Report Published' : 'Visit Scheduled'}
                  </span>
                </div>
                <Button kind="quiet" onClick={() => notify(`${v.id}: Visit timeline log & details opened.`)}>
                  View Detailed Logs
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {wizard && <VisitWizard close={() => setWizard(false)} notify={notify} />}
      </>
    );
  }

  if (page === 'Reports') {
    return (
      <>
        <PageHeading
          eyebrow="Parent-Only Verification Reports"
          title="Verified field reports."
          subtitle="Strictly private to linked parents. Photographs and notes are verified by Field Agents."
        />

        <div className="mb-4 rounded-xl bg-[#eaf0e7] p-3 text-xs text-[#5a7164] flex items-center gap-2">
          <ShieldCheck size={16} /> Confidential: Visible only to linked guardian. Access attempts by unlinked users are blocked.
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {reports.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Tag green>{r.status}</Tag>
                  <h2 className="mt-2 text-xl font-extrabold">{r.child}</h2>
                  <p className="text-xs text-[#7d8a80]">{r.date} · Report #{r.id}</p>
                </div>
                <span className="rounded-xl bg-[#f4e8cf] px-3 py-2 text-xs font-bold text-[#5c4923]">{r.rating}</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#4d5e53]">{r.notes}</p>

              {/* 6-point checklist summary */}
              <div className="mt-4 space-y-1.5 border-t border-[#e9ece4] pt-3">
                <p className="text-xs font-bold text-[#294b41]">Structured Checklist Breakdown</p>
                {Object.entries(r.checklist || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-[#647569]">{key}</span>
                    <span className={`font-bold ${val === 'Green' ? 'text-[#294b41]' : 'text-[#b87c3b]'}`}>
                      {val === 'Green' ? '✓ Satisfactory' : '⚠ Action Suggested'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sample Photo Gallery */}
              <div className="mt-4">
                <p className="text-xs font-bold text-[#294b41] mb-2">Verified Photos</p>
                <div className="flex gap-2">
                  {(r.photos || []).map((p, idx) => (
                    <img key={idx} src={p} alt="Hostel evidence" className="h-20 w-28 rounded-lg object-cover border" />
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[#e9ece4] pt-4">
                <Button onClick={() => setSelectedReportPdf(r)}>
                  <Download size={14} /> Download Watermarked PDF
                </Button>
                <Button kind="quiet" onClick={() => notify('Follow-up dispute request logged.')}>
                  Request Follow-up
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Report PDF Preview Modal */}
        {selectedReportPdf && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <h3 className="font-extrabold text-lg">EduCare Official Verification Report</h3>
                  <p className="text-xs text-[#718177]">Report ID: {selectedReportPdf.id} · Confidential</p>
                </div>
                <button onClick={() => setSelectedReportPdf(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="my-4 rounded-xl border bg-[#fbfaf6] p-4 text-xs space-y-2">
                <p>
                  <strong>Child Name:</strong> {selectedReportPdf.child}
                </p>
                <p>
                  <strong>Agent:</strong> {selectedReportPdf.agent}
                </p>
                <p>
                  <strong>Overall Rating:</strong> {selectedReportPdf.rating}
                </p>
                <p>
                  <strong>Notes:</strong> {selectedReportPdf.notes}
                </p>
                <div className="mt-3 border-t pt-2 text-[10px] text-red-600 font-bold tracking-wider">
                  WATERMARK: OFFICIAL GUARDIAN COPY · PREPARED FOR PARENT
                </div>
              </div>
              <div className="flex justify-between">
                <Button kind="quiet" onClick={() => setSelectedReportPdf(null)}>
                  Close
                </Button>
                <Button onClick={() => notify('Watermarked PDF downloaded to local device.')}>Print / Save PDF</Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (page === 'Child') {
    return (
      <>
        <PageHeading
          eyebrow="Child Management"
          title="Linked Children & Entitlements."
          subtitle="Manage subscriptions, invoices, and scholarship applications."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e8eddf] font-[Manrope] text-lg font-extrabold">AS</div>
              <div>
                <h2 className="text-xl font-extrabold">Aarav Sharma</h2>
                <p className="text-xs text-[#7d897f]">Class 10 · CBSE · English Medium</p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Free Starter Pack</span>
                <strong>Active</strong>
              </div>
              <p className="text-xs text-[#7b897e]">Consent verified by parent on 12 Jun 2025.</p>
            </div>
          </Card>

          <Card className="bg-[#f5ead2]">
            <p className="eyebrow">Subscription Status</p>
            <h2 className="mt-2 text-2xl font-extrabold">Starter Access</h2>
            <p className="mt-1 text-sm text-[#748075]">8 curated items included free with consent.</p>
            <Button className="mt-4" onClick={() => notify('Parent payment checkout sheet opened in demo.')}>
              Upgrade to Premium (₹199 / mo)
            </Button>
          </Card>
        </div>
      </>
    );
  }

  if (page === 'Profile') {
    return (
      <>
        <PageHeading eyebrow="Parent Profile" title="Family settings." subtitle="Manage linked children, consent records, and preferences." />
        <Card className="max-w-xl">
          <h3 className="font-extrabold text-lg">Linked Children</h3>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-[#f2f4ee] p-3 text-xs">
              <span className="font-bold">Aarav Sharma (Class 10 CBSE)</span>
              <Tag green>Linked</Tag>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#f2f4ee] p-3 text-xs">
              <span className="font-bold">Isha Sharma (Class 8 ICSE)</span>
              <Tag green>Linked</Tag>
            </div>
          </div>
        </Card>
      </>
    );
  }

  return <ParentHome notify={notify} setWizard={setWizard} />;
}

function ParentHome({ notify, setWizard }: { notify: (s: string) => void; setWizard: (b: boolean) => void }) {
  const set = useDemoStore((s) => s.set);
  const visits = useDemoStore((s) => s.visits);

  return (
    <>
      <div className="relative overflow-hidden rounded-[26px] bg-[#294b41] px-5 py-7 text-[#faf4e7] md:px-8 md:py-9">
        <div className="max-w-[590px]">
          <div className="eyebrow !text-[#bed0c2]">Parent Dashboard</div>
          <h2 className="mt-2 text-3xl font-extrabold">Peace of mind for your child living away.</h2>
          <p className="mt-2 text-sm leading-6 text-[#d1ddd2]">
            Request physical hostel checks, review verified reports, and support your child's academic journey.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button kind="secondary" onClick={() => setWizard(true)}>
              <Plus size={16} /> Request Physical Visit
            </Button>
            <Button kind="quiet" className="!text-white" onClick={() => set({ activePage: 'Reports' })}>
              View Latest Report
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="eyebrow">Active Visits</p>
          <h3 className="mt-2 text-3xl font-extrabold">{visits.length}</h3>
          <p className="text-xs text-[#7c897e]">1 in progress today</p>
        </Card>
        <Card>
          <p className="eyebrow">Verified Reports</p>
          <h3 className="mt-2 text-3xl font-extrabold">2</h3>
          <p className="text-xs text-[#7c897e]">Parent-only private view</p>
        </Card>
        <Card>
          <p className="eyebrow">Linked Children</p>
          <h3 className="mt-2 text-3xl font-extrabold">2</h3>
          <p className="text-xs text-[#7c897e]">Aarav & Isha</p>
        </Card>
      </div>
    </>
  );
}

function VisitWizard({ close, notify }: { close: () => void; notify: (s: string) => void }) {
  const addVisit = useDemoStore((s) => s.set);
  const visits = useDemoStore((s) => s.visits);

  const [step, setStep] = useState(0);
  const [child, setChild] = useState('Aarav Sharma');
  const [date, setDate] = useState('2025-06-25');
  const [focusHostel, setFocusHostel] = useState(true);
  const [focusFood, setFocusFood] = useState(true);
  const [focusRoutine, setFocusRoutine] = useState(true);
  const [address, setAddress] = useState('12 Lake Road, Ranchi Hostel');

  const submit = () => {
    const newV = {
      id: `VIS-20${Math.floor(Math.random() * 90 + 10)}`,
      child,
      date: `${date} · 11:00 AM`,
      focus: 'Hostel & food quality',
      status: 'Under Review',
      agent: 'Not assigned',
      address,
      premisesPermission: 'Pending',
    };
    addVisit({ visits: [newV, ...visits] });
    close();
    notify('Visit request submitted! ₹999 demo payment recorded.');
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-extrabold text-xl">Request Physical Visit (Step {step + 1} of 3)</h2>
          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        {step === 0 && (
          <div className="mt-4 space-y-3">
            <div>
              <Label>Select Child</Label>
              <select className="field" value={child} onChange={(e) => setChild(e.target.value)}>
                <option>Aarav Sharma</option>
                <option>Isha Sharma</option>
              </select>
            </div>
            <div>
              <Label>Hostel / Coaching Address</Label>
              <input className="field" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <Label>Preferred Visit Date</Label>
              <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 space-y-3">
            <Label>Observation Focus Areas</Label>
            <label className="flex items-center gap-2 text-xs font-bold">
              <input type="checkbox" checked={focusHostel} onChange={(e) => setFocusHostel(e.target.checked)} /> Hostel living
              conditions & hygiene
            </label>
            <label className="flex items-center gap-2 text-xs font-bold">
              <input type="checkbox" checked={focusFood} onChange={(e) => setFocusFood(e.target.checked)} /> Food quality & dining area
            </label>
            <label className="flex items-center gap-2 text-xs font-bold">
              <input type="checkbox" checked={focusRoutine} onChange={(e) => setFocusRoutine(e.target.checked)} /> Study routine & social
              circle
            </label>

            <div className="mt-3 rounded-xl bg-[#f5ead2] p-3 text-xs leading-5 text-[#685c43]">
              <ShieldCheck size={16} className="mr-1 inline" />
              <strong>Student Dignity Rule:</strong> Your child will be notified before every visit. Agents observe general wellbeing only.
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-[#edf2eb] p-4 text-xs space-y-1">
              <div className="flex justify-between font-bold text-sm">
                <span>Verification Visit Fee</span>
                <span>₹999</span>
              </div>
              <p>Child: {child}</p>
              <p>Address: {address}</p>
            </div>
            <p className="text-[11px] text-[#718177]">Simulated payment sheet. No real money collected.</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <Button kind="quiet" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button kind="quiet" onClick={close}>
              Cancel
            </Button>
          )}
          {step < 2 ? <Button onClick={() => setStep(step + 1)}>Continue</Button> : <Button onClick={submit}>Pay ₹999 & Confirm</Button>}
        </div>
      </div>
    </div>
  );
}

/* ==================== FIELD AGENT WORKSPACE ==================== */

function AgentScreen({ page, notify }: { page: string; notify: (s: string) => void }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [rating, setRating] = useState('Green');

  return (
    <>
      <PageHeading
        eyebrow="Field Agent Portal"
        title="Physical verification tasks."
        subtitle="GPS check-in, structured observation checklists, and photo evidence."
        action={
          <Button kind="danger" onClick={() => notify('SOS Alert sent to Admin Safeguarding Team!')}>
            Emergency SOS
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <h2 className="font-extrabold text-lg">Assigned Visit Tasks</h2>
          <div className="mt-3 space-y-2">
            <div className="rounded-xl border border-[#294b41] bg-[#edf2eb] p-3 text-xs">
              <div className="flex justify-between font-bold">
                <span>VIS-204 · Aarav Sharma</span>
                <Tag gold>In Progress</Tag>
              </div>
              <p className="mt-1 text-[#627568]">12 Lake Road, Ranchi Hostel · Today 10:30 AM</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-extrabold text-xl">Visit Execution & Checklist</h2>
          <p className="mt-1 text-xs text-[#718177]">Location: 12 Lake Road, Ranchi Hostel</p>

          <div className="mt-4 flex gap-2">
            <Button
              kind={checkedIn ? 'quiet' : 'primary'}
              onClick={() => {
                setCheckedIn(true);
                notify('GPS check-in timestamped at 10:30 AM (Geotag verified).');
              }}
            >
              {checkedIn ? '✓ GPS Checked In' : 'Perform GPS Check-In'}
            </Button>
            <Button kind="quiet" onClick={() => notify('GPS Check-Out logged.')}>
              GPS Check-Out
            </Button>
          </div>

          <div className="mt-5 space-y-3 border-t pt-4">
            <h3 className="font-bold text-sm">Structured Observation Checklist</h3>

            <div>
              <Label>Hostel Hygiene & Living Condition</Label>
              <select className="field">
                <option>Green - Clean & Satisfactory</option>
                <option>Amber - Minor Issues</option>
                <option>Red - Unsatisfactory</option>
              </select>
            </div>

            <div>
              <Label>Food Quality & Mess Routine</Label>
              <select className="field">
                <option>Green - Fresh & Good Quality</option>
                <option>Amber - Needs Improvement</option>
              </select>
            </div>

            <div>
              <Label>Field Agent Observation Notes</Label>
              <textarea className="field min-h-20" placeholder="Factual observations only..." />
            </div>

            <div className="rounded-xl bg-[#f8efdf] p-3 text-xs text-[#765e3c]">
              ⚠ <strong>Evidence Rule:</strong> Do not photograph other minors. Only photograph approved hostel common areas.
            </div>

            <Button onClick={() => notify('Report submitted for Admin Quality Review!')} className="w-full">
              Submit Report to Admin Queue
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

/* ==================== ADMIN WORKSPACE ==================== */

function AdminScreen({ page, notify }: { page: string; notify: (s: string) => void }) {
  const visits = useDemoStore((s) => s.visits);
  const scholarships = useDemoStore((s) => s.scholarships);
  const set = useDemoStore((s) => s.set);

  if (page === 'Scholarships') {
    return (
      <>
        <PageHeading
          eyebrow="Admin Operations"
          title="EWS Scholarship Approval Queue."
          subtitle="Review uploaded income documents and grant automatic Free Access."
        />

        <div className="space-y-4">
          {scholarships.map((s) => (
            <Card key={s.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Tag gold={s.status.includes('Submitted')} green={s.status.includes('Approved')}>
                      {s.status}
                    </Tag>
                    <span className="text-xs font-mono">{s.id}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-extrabold">{s.student}</h3>
                  <p className="text-xs text-[#718177]">
                    State: {s.state} · Income: {s.income} · Doc: {s.documentName}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      set({
                        entitlement: 'Free Access',
                        scholarships: scholarships.map((x) => (x.id === s.id ? { ...x, status: 'Approved · 90 days' } : x)),
                      });
                      notify(`Scholarship ${s.id} Approved! Entitlement updated to Free Access.`);
                    }}
                  >
                    Approve & Grant Free Access
                  </Button>
                  <Button kind="quiet" onClick={() => notify(`Rejection logged for ${s.id}.`)}>
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeading eyebrow="Admin Portal" title="Platform Overview & Operations." subtitle="System metrics, visits, and content matrix." />
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <p className="eyebrow">Total Registered Users</p>
          <h3 className="text-3xl font-extrabold mt-1">1,240</h3>
        </Card>
        <Card>
          <p className="eyebrow">Free to Paid Conversion</p>
          <h3 className="text-3xl font-extrabold mt-1">14.2%</h3>
        </Card>
        <Card>
          <p className="eyebrow">Visits This Month</p>
          <h3 className="text-3xl font-extrabold mt-1">{visits.length}</h3>
        </Card>
        <Card>
          <p className="eyebrow">Pending EWS Applications</p>
          <h3 className="text-3xl font-extrabold mt-1">1</h3>
        </Card>
      </div>
    </>
  );
}

/* ==================== COUNSELLOR WORKSPACE ==================== */

function CounsellorScreen({ page, notify }: { page: string; notify: (s: string) => void }) {
  return (
    <>
      <PageHeading eyebrow="Counsellor Console" title="Live Sessions & Student Care." subtitle="Private workspace for audio/video sessions." />
      <Card>
        <h2 className="font-extrabold text-xl">Today's Sessions</h2>
        <div className="mt-3 rounded-xl bg-[#edf2eb] p-4 text-xs">
          <div className="flex justify-between font-bold">
            <span>Aarav Sharma · Study Stress Check-in</span>
            <Tag green>Accepted</Tag>
          </div>
          <p className="mt-2 text-[#5a6b5e]">Scheduled: 10:30 AM · Audio/Video Session</p>
          <Button className="mt-3" onClick={() => notify('Counsellor session started.')}>
            Open Video Call Workspace
          </Button>
        </div>
      </Card>
    </>
  );
}

/* ==================== HELPERS & MODALS ==================== */

function HelpSheet({ close, notify }: { close: () => void; notify: (s: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-extrabold text-xl text-[#294b41]">Emergency & Helpline Directory</h2>
          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-[#617367]">
          If you or someone you know is in distress, immediate help is available 24/7 across India.
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-[#e9f0e7] p-3 text-xs">
            <div>
              <strong className="block text-sm">Tele-MANAS (Govt of India)</strong>
              <span className="text-[#647568]">Mental Health Helpline</span>
            </div>
            <span className="text-base font-extrabold text-[#294b41]">14416</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f6e8df] p-3 text-xs">
            <div>
              <strong className="block text-sm">Emergency Services</strong>
              <span className="text-[#85665b]">Police / Ambulance</span>
            </div>
            <span className="text-base font-extrabold text-[#c85a4b]">112</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#f5f7f2] p-3 text-[11px] text-[#718177]">
          Note: This prototype provides simulated support. It does not replace professional medical or crisis care.
        </div>

        <Button className="mt-4 w-full" onClick={close}>
          Close Helpline Directory
        </Button>
      </div>
    </div>
  );
}

function SessionModal({ close, notify }: { close: () => void; notify: (s: string) => void }) {
  const [mode, setMode] = useState<'Chat' | 'Voice' | 'Video'>('Chat');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<string[]>(['Hello! I am Dr. Rhea Menon. How can I support you today?']);
  const [muted, setMuted] = useState(false);
  const [riskTriggered, setRiskTriggered] = useState(false);

  const sendMessage = () => {
    if (!msg.trim()) return;
    const text = msg;
    setMessages((prev) => [...prev, `You: ${text}`]);

    if (/hopeless|hurt myself|depressed|cannot handle/i.test(text)) {
      setRiskTriggered(true);
      notify('Safety Alert: Crisis keywords detected. Tele-MANAS helpline card displayed.');
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          'Dr. Rhea: Thank you for sharing that with me. What feels most important to focus on right now?',
        ]);
      }, 1000);
    }
    setMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="font-extrabold text-lg">Live Counsellor Session</h2>
            <p className="text-xs text-[#718177]">Dr. Rhea Menon · Adolescent Counsellor</p>
          </div>
          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="my-3 flex justify-center gap-2">
          {(['Chat', 'Voice', 'Video'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                mode === m ? 'bg-[#294b41] text-white' : 'bg-[#edf2eb] text-[#5e7164]'
              }`}
            >
              {m === 'Chat' ? <MessageCircle size={14} className="mr-1 inline" /> : m === 'Voice' ? <PhoneCall size={14} className="mr-1 inline" /> : <Video size={14} className="mr-1 inline" />}
              {m} Mode
            </button>
          ))}
        </div>

        {/* Risk Trigger Banner */}
        {riskTriggered && (
          <div className="mb-3 rounded-xl bg-[#fce8e6] border border-[#f5b3ad] p-3 text-xs text-[#8a2d24]">
            <AlertTriangle size={16} className="mr-1 inline" />
            <strong>Crisis Support Alert:</strong> You are not alone. Reach Tele-MANAS at <strong>14416</strong> or Emergency <strong>112</strong> immediately.
          </div>
        )}

        {mode === 'Chat' ? (
          <div className="space-y-3">
            <div className="h-48 overflow-y-auto rounded-xl border bg-[#f9faf7] p-3 text-xs space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg ${m.startsWith('You:') ? 'bg-[#294b41] text-white ml-auto max-w-[80%]' : 'bg-[#e4ebe1] text-[#243b31] max-w-[80%]'}`}>
                  {m}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="field"
                placeholder="Type your message... (Try 'hopeless' to test safety alert)"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        ) : mode === 'Voice' ? (
          <div className="py-8 text-center bg-[#f4f7f3] rounded-xl">
            <Mic size={40} className={`mx-auto ${muted ? 'text-red-500' : 'text-[#294b41]'}`} />
            <p className="mt-3 font-bold text-sm">Voice Call Session Active</p>
            <p className="text-xs text-[#718177]">Duration: 03:45 · Encrypted In-App Audio</p>
            <Button kind="quiet" className="mt-4" onClick={() => setMuted(!muted)}>
              {muted ? 'Unmute Microphone' : 'Mute Microphone'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 aspect-video bg-[#1a2e26] rounded-xl p-2 text-white text-center place-items-center">
            <div className="rounded-lg bg-[#274438] p-4 w-full h-full flex flex-col justify-center items-center">
              <Video size={28} />
              <span className="text-xs mt-2 font-bold">Dr. Rhea Menon</span>
            </div>
            <div className="rounded-lg bg-[#1f362c] p-4 w-full h-full flex flex-col justify-center items-center text-xs">
              <span>Your Video Tile</span>
              <span className="text-[10px] text-[#91a89d] mt-1">In-App Encryption</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between border-t pt-3">
          <Button kind="quiet" onClick={() => notify('Session reported to safeguarding lead.')}>
            Report Session
          </Button>
          <Button kind="danger" onClick={close}>
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
}

function PaywallSheet({ close, notify }: { close: () => void; notify: (s: string) => void }) {
  const student = useDemoStore((s) => s.student);
  const set = useDemoStore((s) => s.set);
  const [plan, setPlan] = useState('Monthly · ₹199');

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-extrabold text-xl">EduCare Learning Plans</h2>
          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-[#294b41] bg-[#eaf0e7] p-4">
            <div className="flex justify-between font-bold">
              <span>Monthly Subscription</span>
              <span>₹199 / mo</span>
            </div>
            <p className="mt-1 text-xs text-[#5e7164]">Full access to all 6 boards, videos, PDFs & live support.</p>
          </div>

          {student.age < 18 && (
            <div className="rounded-xl bg-[#fbf3e4] border border-[#ead9b3] p-3 text-xs text-[#786c54]">
              <strong>Under-18 Minor Notice:</strong> Payment must be made by a parent or guardian.
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              className="w-full"
              onClick={() => {
                set({ entitlement: 'Premium' });
                close();
                notify('Demo payment successful! Premium access enabled.');
              }}
            >
              Simulate Demo Payment (₹199)
            </Button>
            <Button kind="quiet" className="w-full" onClick={() => notify('Shareable parent payment link copied.')}>
              Ask Parent to Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarterPackCelebrationModal({ close }: { close: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
        <Sparkles size={48} className="mx-auto text-[#cfaa61]" />
        <h2 className="mt-3 text-2xl font-extrabold text-[#294b41]">🎉 Free Starter Pack Unlocked!</h2>
        <p className="mt-2 text-xs leading-5 text-[#67776b]">
          Parent consent has been verified. You now have full access to your free starter pack!
        </p>

        <div className="my-4 space-y-2 rounded-xl bg-[#f5f7f2] p-4 text-left text-xs">
          <div className="font-bold text-[#294b41]">Included in your starter bundle:</div>
          <div className="flex items-center gap-2">✓ 3 Mental Health & Counselling Videos</div>
          <div className="flex items-center gap-2">✓ 2 Board Syllabus Masterclasses</div>
          <div className="flex items-center gap-2">✓ 3 Printable Sample PDF Chapter Notes</div>
        </div>

        <Button className="w-full" onClick={close}>
          Start Exploring Now
        </Button>
      </div>
    </div>
  );
}

function Onboarding({ close, notify }: { close: () => void; notify: (s: string) => void }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<Role>('Student');
  const [consentChecked, setConsentChecked] = useState(false);

  const setDemo = useDemoStore((s) => s.set);

  const finishOnboarding = () => {
    setDemo({ consent: true, entitlement: 'Free', showStarterCelebration: true });
    close();
    notify('Onboarding complete! Free starter pack unlocked.');
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-extrabold text-xl">EduCare Onboarding ({step + 1} of 4)</h2>
          <button onClick={close}>
            <X size={18} />
          </button>
        </div>

        {step === 0 && (
          <div className="mt-4 space-y-3">
            <Label>Select Role</Label>
            <div className="grid grid-cols-2 gap-3">
              {(['Student', 'Parent'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-xl border p-4 text-left ${role === r ? 'border-[#294b41] bg-[#eaf0e7]' : ''}`}
                >
                  <strong className="block text-sm">{r}</strong>
                  <span className="text-xs text-[#718177]">
                    {r === 'Student' ? 'Learn & get support' : 'Hostel check-ins & reports'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 space-y-3">
            <Label>Mobile Number OTP Verification</Label>
            <input className="field" placeholder="+91 98765 43210" defaultValue="9876543210" />
            <input className="field" placeholder="Enter 6-digit OTP" defaultValue="123456" />
            <p className="text-[11px] text-[#718177]">Demo mode: accepts any 6 digits.</p>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-3">
            <Label>Select Board & Class</Label>
            <select className="field">
              <option>CBSE Board</option>
              <option>Bihar Board</option>
              <option>ICSE Board</option>
            </select>
            <select className="field">
              <option>Class 10</option>
              <option>Class 9</option>
              <option>Class 11</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-[#edf2eb] p-4 text-xs space-y-2">
              <h3 className="font-bold text-sm">Parent Consent & Child Protection Declaration</h3>
              <p>Under India DPDP Act guidelines, parent consent is required before minor student profile activation.</p>
              <label className="flex items-start gap-2 pt-2">
                <input type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} />
                I am the parent / guardian and I give verifiable consent.
              </label>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <Button kind="quiet" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Button kind="quiet" onClick={close}>
              Cancel
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Continue</Button>
          ) : (
            <Button disabled={!consentChecked} onClick={finishOnboarding}>
              Unlock Starter Pack
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==================== CLIENT CONFIRMATION PAGE ==================== */

const checklistAreas = [
  'Onboarding & Consent Flow',
  'Free Starter Pack',
  'Paywall & Entitlements',
  'Academic Content Taxonomy (6 Boards x 7 Classes)',
  'Printed Orders & Shipment Tracking',
  'Parent Physical Visit Requests',
  'Parent Verified Reports & Watermarking',
  'Live Hub (Chat, Voice & Video)',
  'EWS Scholarship Application & Auto-Grant',
  'Admin Operations & Quality Review',
  'Safeguarding & Helplines',
];

function ConfirmPage() {
  const [, navigate] = useLocation();
  const role = useDemoStore((s) => s.role);
  const entitlement = useDemoStore((s) => s.entitlement);

  const [feedback, setFeedback] = useState<Record<string, { approved: boolean; comments: string }>>(() => {
    try {
      return JSON.parse(localStorage.getItem('educare-client-feedback') || '{}');
    } catch {
      return {};
    }
  });

  const update = (area: string, patch: Partial<{ approved: boolean; comments: string }>) => {
    const next = { ...feedback, [area]: { ...(feedback[area] ?? { approved: false, comments: '' }), ...patch } };
    setFeedback(next);
    localStorage.setItem('educare-client-feedback', JSON.stringify(next));
  };

  const exportFeedback = () => {
    const blob = new Blob([JSON.stringify({ product: 'EduCare Client Prototype Review', exportedAt: new Date().toISOString(), feedback }, null, 2)], {
      type: 'application/json',
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'educare-client-feedback.json';
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="app-shell min-h-[100dvh]">
      <header className="border-b border-[#e1e7dd] bg-[#f8f7f0] px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 font-[Manrope] text-lg font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#294b41] text-[#f9e9c5]">
              <HeartHandshake size={19} />
            </span>
            EduCare <span className="text-xs font-medium text-[#7c8a80]">Client Review Checklist</span>
          </button>
          <div className="flex items-center gap-2">
            <Tag>{role}</Tag>
            <Tag gold>{entitlement}</Tag>
            <Button kind="quiet" onClick={() => navigate('/')}>
              <ArrowLeft size={14} /> Back to Demo
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-7 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Client Sign-off</p>
            <h1 className="mt-1 text-3xl font-extrabold">Client Confirmation Checklist</h1>
            <p className="mt-1 text-sm text-[#758379]">Review each module, record your approval/notes, and export feedback JSON.</p>
          </div>
          <Button onClick={exportFeedback}>
            <Download size={15} /> Download My Feedback as JSON
          </Button>
        </div>

        <div className="space-y-3">
          {checklistAreas.map((area) => (
            <Card key={area}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-extrabold text-base">{area}</h2>
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feedback[area]?.approved || false}
                    onChange={(e) => update(area, { approved: e.target.checked })}
                  />{' '}
                  Approve Feature
                </label>
              </div>
              <textarea
                className="field mt-3 min-h-16"
                placeholder={`Client notes or changes requested for ${area.toLowerCase()}...`}
                value={feedback[area]?.comments || ''}
                onChange={(e) => update(area, { comments: e.target.value })}
              />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppShell} />
      <Route path="/confirm" component={ConfirmPage} />
      <Route>
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <Link href="/" className="mt-4 inline-block underline">
            Return to EduCare Demo
          </Link>
        </div>
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}
