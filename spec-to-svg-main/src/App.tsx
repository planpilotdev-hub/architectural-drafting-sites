// Reduce providers to minimize risk of hook initialization issues in prod
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// Editor is not used; Stage 2 work is integrated into /preview using existing design
import Admin from "./pages/Admin";
import AppProject from "./pages/AppProject";
import Preview from "./pages/Preview";
import Pricing from "./pages/Pricing";
import AppNew from "./pages/AppNew";
import Org from "./pages/Org";
import OrgSettings from "./pages/OrgSettings";
import OrgMembers from "./pages/OrgMembers";
import OrgBilling from "./pages/OrgBilling";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrgProvider } from "@/contexts/OrgContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import React from "react";

class RouteErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error: any) { return { error }; }
  componentDidCatch(error: any, info: any) { console.error("Route crashed", error, info); }
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-sm">
          <h3 className="font-medium mb-2">Something went wrong.</h3>
          <p>Please refresh. If it persists, share the console log.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OrgProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public login route */}
            <Route path="/login" element={<Login />} />

            {/* All other routes are protected and require authentication as erbmedia@gmail.com */}
            <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
            <Route path="/preview" element={<ProtectedRoute><RouteErrorBoundary><Preview /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/app/project" element={<ProtectedRoute><AppProject /></ProtectedRoute>} />
            <Route path="/app/new" element={<ProtectedRoute><AppNew /></ProtectedRoute>} />
            <Route path="/pricing" element={<ProtectedRoute><RouteErrorBoundary><Pricing /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/org" element={<ProtectedRoute><RouteErrorBoundary><Org /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/org/settings" element={<ProtectedRoute><RouteErrorBoundary><OrgSettings /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/org/members" element={<ProtectedRoute><RouteErrorBoundary><OrgMembers /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/org/billing" element={<ProtectedRoute><RouteErrorBoundary><OrgBilling /></RouteErrorBoundary></ProtectedRoute>} />
            <Route path="/app" element={<ProtectedRoute><AppProject /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </OrgProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
