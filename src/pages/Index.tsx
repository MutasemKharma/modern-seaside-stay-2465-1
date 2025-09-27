import type { ReactNode } from "react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import { ChaletCard } from "@/components/ChaletCard";
import { chalets } from "@/data/chalets";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bus, Headset, Gift } from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <section className="container py-16" dir="rtl">
          <div className="grid gap-8 lg:grid-cols-[1fr,400px] lg:items-start">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{t.search.title}</h2>
                <Button variant="link" asChild>
                  <Link to="/chalets">{t.nav.chalets}</Link>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {chalets.map((chalet) => (
                  <ChaletCard key={chalet.id} chalet={chalet} />
                ))}
              </div>
            </div>
            <BookingForm />
          </div>
        </section>
        <section className="bg-muted/20 py-16" dir="rtl">
          <div className="container grid gap-6 md:grid-cols-3">
            <ValueCard icon={<Bus className="h-6 w-6" />} title={t.transport.title} description={t.transport.subtitle} />
            <ValueCard icon={<Headset className="h-6 w-6" />} title={t.support.title} description={t.support.subtitle} />
            <ValueCard icon={<Gift className="h-6 w-6" />} title={t.nav.offers} description={t.brand.headline} />
          </div>
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="rounded-3xl border bg-background p-6 text-right shadow-sm">
      <div className="flex items-center justify-end gap-3">
        <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
