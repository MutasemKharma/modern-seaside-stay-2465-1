import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Percent, Wallet, Salad } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export default function Offers() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">{t.nav.offers}</h1>
            <p className="text-muted-foreground">{t.brand.subheadline}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[Percent, Salad, Wallet, Gift].map((Icon, index) => (
              <Card key={index} className="bg-background">
                <CardHeader className="flex items-center justify-end gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{t.hero.perks[index] ?? t.brand.customerCta}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-right">
                  {t.hero.perks[index] ?? t.brand.subheadline}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
