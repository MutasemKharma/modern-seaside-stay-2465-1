import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireRole } from "@/components/RequireRole";

const Index = lazy(() => import("./pages/Index"));
const Chalets = lazy(() => import("./pages/Chalets"));
const ChaletDetails = lazy(() => import("./pages/ChaletDetails"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Offers = lazy(() => import("./pages/Offers"));
const Transport = lazy(() => import("./pages/Transport"));
const Support = lazy(() => import("./pages/Support"));
const Policies = lazy(() => import("./pages/Policies"));
const Login = lazy(() => import("./pages/Login"));
const CustomerDashboard = lazy(() => import("./pages/dashboards/CustomerDashboard"));
const OwnerDashboard = lazy(() => import("./pages/dashboards/OwnerDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboards/AdminDashboard"));
const OpsDashboard = lazy(() => import("./pages/dashboards/OpsDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HoverReceiver = lazy(() => import("@/visual-edits/VisualEditsMessenger"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<div className="p-6 text-center text-muted-foreground">Loading…</div>}>
                  {import.meta.env.DEV && typeof window !== "undefined" && window.parent !== window ? <HoverReceiver /> : null}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/chalets" element={<Chalets />} />
                    <Route path="/chalets/:id" element={<ChaletDetails />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/transport" element={<Transport />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/customer"
                      element={
                        <RequireRole roles={["Customer"]}>
                          <CustomerDashboard />
                        </RequireRole>
                      }
                    />
                    <Route
                      path="/owner"
                      element={
                        <RequireRole roles={["ChaletOwner"]}>
                          <OwnerDashboard />
                        </RequireRole>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <RequireRole roles={["Admin"]}>
                          <AdminDashboard />
                        </RequireRole>
                      }
                    />
                    <Route
                      path="/ops"
                      element={
                        <RequireRole roles={["Ops"]}>
                          <OpsDashboard />
                        </RequireRole>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
