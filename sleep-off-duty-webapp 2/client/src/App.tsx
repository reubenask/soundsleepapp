import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Sleep Off Duty pages
import SplashPage from "./pages/SplashPage";
import StatusSelectPage from "./pages/StatusSelectPage";
import HomePage from "./pages/HomePage";
import ShutdownRitualPage from "./pages/ShutdownRitualPage";
import AnxietyUnloadPage from "./pages/AnxietyUnloadPage";
import SleepTrainingPage from "./pages/SleepTrainingPage";
import NightWakePage from "./pages/NightWakePage";
import MorningLogPage from "./pages/MorningLogPage";
import WeeklyReviewPage from "./pages/WeeklyReviewPage";
import ASMRPage from "./pages/ASMRPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashPage} />
      <Route path="/status" component={StatusSelectPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/shutdown" component={ShutdownRitualPage} />
      <Route path="/anxiety" component={AnxietyUnloadPage} />
      <Route path="/sleep-training" component={SleepTrainingPage} />
      <Route path="/night-wake" component={NightWakePage} />
      <Route path="/morning" component={MorningLogPage} />
      <Route path="/review" component={WeeklyReviewPage} />
      <Route path="/asmr" component={ASMRPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
