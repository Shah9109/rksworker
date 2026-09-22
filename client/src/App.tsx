import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { IndustriesPage } from './pages/landing/IndustriesPage';
import { ServicesPage } from './pages/landing/ServicesPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { EditProfile } from './pages/worker/EditProfile';
import { DocumentsPage } from './pages/worker/DocumentsPage';
import { SkillsPage } from './pages/worker/SkillsPage';
import { ExperiencePage } from './pages/worker/ExperiencePage';
import { JobSearchPage } from './pages/worker/JobSearchPage';
import { JobDetailPage } from './pages/worker/JobDetailPage';
import { AppliedJobsPage } from './pages/worker/AppliedJobsPage';
import { SettingsPage } from './pages/worker/SettingsPage';
import { DigitalIDPage } from './pages/worker/DigitalIDPage';
import { AttendancePage } from './pages/worker/AttendancePage';

// Company Pages
import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { PostJobPage } from './pages/company/PostJobPage';
import { ApplicantsPage } from './pages/company/ApplicantsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { WorkerVerification } from './pages/admin/WorkerVerification';
import { ManageCategories } from './pages/admin/ManageCategories';

// Feed Pages
import { FeedPage } from './pages/feed/FeedPage';
import { CommunityPage } from './pages/feed/CommunityPage';
import { SuccessStoriesPage } from './pages/feed/SuccessStoriesPage';

import { useAuthStore } from './store/authStore';
import { FloatingSocialButtons } from './components/layout/FloatingSocialButtons';
import { AppInstallModal } from './components/ui/AppInstallModal';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/jobs" element={<JobSearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Feed & Community Routes */}
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/community" element={<CommunityPage />} />
        <Route path="/feed/stories" element={<SuccessStoriesPage />} />

        {/* Worker Portal Routes */}
        <Route path="/worker/dashboard" element={isAuthenticated ? <WorkerDashboard /> : <Navigate to="/login" replace />} />
        <Route path="/worker/profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />} />
        <Route path="/worker/documents" element={isAuthenticated ? <DocumentsPage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/skills" element={isAuthenticated ? <SkillsPage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/experience" element={isAuthenticated ? <ExperiencePage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/jobs" element={<JobSearchPage />} />
        <Route path="/worker/jobs/:id" element={<JobDetailPage />} />
        <Route path="/worker/applied" element={isAuthenticated ? <AppliedJobsPage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/id-card" element={isAuthenticated ? <DigitalIDPage /> : <Navigate to="/login" replace />} />
        <Route path="/worker/attendance" element={isAuthenticated ? <AttendancePage /> : <Navigate to="/login" replace />} />

        {/* Company Portal Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/jobs/new" element={<PostJobPage />} />
        <Route path="/company/jobs" element={<CompanyDashboard />} />
        <Route path="/company/applicants" element={<ApplicantsPage />} />
        <Route path="/company/workers" element={<ApplicantsPage />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/workers/verify" element={<WorkerVerification />} />
        <Route path="/admin/documents/verify" element={<WorkerVerification />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/announcements" element={<ManageCategories />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingSocialButtons />
      <AppInstallModal />
    </Router>
  );
};

export default App;
