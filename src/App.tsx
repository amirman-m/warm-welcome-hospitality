
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import MainMenu from "./pages/MainMenu";
import NotFound from "./pages/NotFound";
import WifiPage from "./pages/features/WifiPage";
import InformationPage from "./pages/features/InformationPage";
import BookingPage from "./pages/features/BookingPage";
import TaxiPage from "./pages/features/TaxiPage";
import CleaningPage from "./pages/features/CleaningPage";
import DeskPage from "./pages/features/DeskPage";
import ChatPage from "./pages/features/ChatPage";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page-transition"
        timeout={400}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/main" element={<MainMenu />} />
          <Route path="/wifi" element={<WifiPage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/taxi" element={<TaxiPage />} />
          <Route path="/cleaning" element={<CleaningPage />} />
          <Route path="/desk" element={<DeskPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
