
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { A11ySettingsProvider } from "./hooks/useA11ySettings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import A11yButton from "./components/A11yButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <A11ySettingsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <A11yButton position="bottom-right" />
        </BrowserRouter>
      </A11ySettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
