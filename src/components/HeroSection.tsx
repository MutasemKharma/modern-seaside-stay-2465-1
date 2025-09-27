import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRAND_NAME } from "@/lib/branding";
import { ShieldCheck, Wallet, Users, Headset } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background pt-32 pb-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-right lg:text-start" dir="rtl">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            {t.brand.headline}
          </span>
          <h1 className="text-3xl font-bold leading-snug text-balance lg:text-5xl">{t.brand.headline}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.brand.subheadline}</p>
          <div className="flex flex-wrap items-center gap-3 justify-end lg:justify-start" dir="rtl">
            <Button size="lg" asChild>
              <Link to="/booking">{t.brand.customerCta}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/owner">{t.brand.ownerCta}</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2" dir="rtl">
            {[t.hero.perks[0], t.hero.perks[1], t.hero.perks[2], t.hero.perks[3]].map((perk) => (
              <div key={perk} className="flex items-start gap-3 rounded-2xl border bg-card/80 p-4 text-right">
                <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{perk}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="relative h-full w-full max-w-md rounded-3xl border bg-card/80 p-6 shadow-2xl">
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-center justify-between rounded-2xl bg-primary/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary">{BRAND_NAME}</p>
                  <p className="font-semibold">{t.hero.bookingTagline}</p>
                </div>
                <Headset className="h-8 w-8 text-primary" />
              </div>
              <div className="grid gap-4">
                <MetricCard icon={<Users className="h-5 w-5" />} title={t.hero.stats.chalets} subtitle={t.nav.chalets} />
                <MetricCard icon={<Wallet className="h-5 w-5" />} title={`${t.booking.cashback}`} subtitle={t.customer.dashboard.wallet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

function MetricCard({ icon, title, subtitle }: MetricCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-background/60 p-4">
      <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      <div className="text-right">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
