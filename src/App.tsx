import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
// import HoverReceiver from "@/visual-edits/VisualEditsMessenger";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";

// lazy page components
const Index = lazy(() => import("./pages/Index"));
const Apartments = lazy(() => import("./pages/Apartments"));
const ApartmentDetails = lazy(() => import("./pages/ApartmentDetails"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Amenities = lazy(() => import("./pages/Amenities"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HoverReceiver = lazy(() => import("@/visual-edits/VisualEditsMessenger"));

// Create a react-query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<div className="p-6 text-center text-muted-foreground">Loading…</div>}>
                {import.meta.env.DEV && typeof window !== "undefined" && window.parent !== window ? (
                  <HoverReceiver />
                ) : null}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/apartments" element={<Apartments />} />
                  <Route path="/apartments/:id" element={<ApartmentDetails />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/amenities" element={<Amenities />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;