import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ErrorBoundary from "@/components/ui/error-boundary";

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
import AddProperty from "./pages/AddProperty";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Dashboard />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/agencies" 
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Agencies />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/agency/:id" 
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <AgencyDetail />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/agency-profile" 
                  element={
                    <ProtectedRoute allowedRoles={['agency']}>
                      <ErrorBoundary>
                        <AgencyProfile />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-agency" 
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'agency']}>
                      <ErrorBoundary>
                        <AddAgency />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-property" 
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'agency']}>
                      <ErrorBoundary>
                        <AddProperty />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-agency/:id" 
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'agency']}>
                      <ErrorBoundary>
                        <EditAgency />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Profile />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <ErrorBoundary>
                        <Settings />
                      </ErrorBoundary>
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
                      <ErrorBoundary>
                        <Messages />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manage-categories" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ErrorBoundary>
                        <ManageCategories />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ErrorBoundary>
                        <Admin />
                      </ErrorBoundary>
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
