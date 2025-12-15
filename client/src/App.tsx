import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientAppointments from "./pages/patient/PatientAppointments";
import MedicalHistory from "./pages/patient/MedicalHistory";
import AIChatbot from "./pages/patient/AIChatbot";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientDocuments from "./pages/patient/PatientDocuments";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import PatientDetails from "./pages/doctor/PatientDetails";
import ScheduleManagement from "./pages/doctor/ScheduleManagement";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={
              <ProtectedRoute requiredRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/patient/book-appointment" element={
              <ProtectedRoute requiredRole="patient">
                <BookAppointment />
              </ProtectedRoute>
            } />
            <Route path="/patient/appointments" element={
              <ProtectedRoute requiredRole="patient">
                <PatientAppointments />
              </ProtectedRoute>
            } />
            <Route path="/patient/medical-history" element={
              <ProtectedRoute requiredRole="patient">
                <MedicalHistory />
              </ProtectedRoute>
            } />
            <Route path="/patient/ai-chatbot" element={
              <ProtectedRoute requiredRole="patient">
                <AIChatbot />
              </ProtectedRoute>
            } />
            <Route path="/patient/profile" element={
              <ProtectedRoute requiredRole="patient">
                <PatientProfile />
              </ProtectedRoute>
            } />
            <Route path="/patient/documents" element={
              <ProtectedRoute requiredRole="patient">
                <PatientDocuments />
              </ProtectedRoute>
            } />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patients" element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorPatients />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patient/:id" element={
              <ProtectedRoute requiredRole="doctor">
                <PatientDetails />
              </ProtectedRoute>
            } />
            <Route path="/doctor/schedule" element={
              <ProtectedRoute requiredRole="doctor">
                <ScheduleManagement />
              </ProtectedRoute>
            } />
            <Route path="/doctor/profile" element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorProfile />
              </ProtectedRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
