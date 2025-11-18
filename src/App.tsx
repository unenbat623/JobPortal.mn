import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { JobProvider } from "@/contexts/JobContext";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Candidate from "./pages/Candidate";
import Employer from "./pages/Employer";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import CompanyProfile from "./pages/CompanyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <JobProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar onAuthClick={() => setAuthModalOpen(true)} />
              <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails onAuthClick={() => setAuthModalOpen(true)} />} />
                <Route path="/candidate" element={<Candidate />} />
                <Route path="/employer" element={<Employer />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/company/:companyId" element={<CompanyProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </JobProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
