
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Agencies from "./pages/Agencies";
import AgencyDetail from "./pages/AgencyDetail";
import AgencyProfile from "./pages/AgencyProfile";
import AddAgency from "./pages/AddAgency";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import EditAgency from "./pages/EditAgency";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ManageCategories from "./pages/ManageCategories";
import Support from "./pages/Support";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/agencies" 
                element={
                  <ProtectedRoute>
                    <Agencies />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/agency/:id" 
                element={
                  <ProtectedRoute>
                    <AgencyDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/agency-profile" 
                element={
                  <ProtectedRoute allowedRoles={['agency']}>
                    <AgencyProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-agency" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'agency']}>
                    <AddAgency />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-agency/:id" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'agency']}>
                    <EditAgency />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/support" 
                element={<Support />} 
              />
              <Route 
                path="/messages" 
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/manage-categories" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageCategories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
