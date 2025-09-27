import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { busPartners } from "@/data/bus-routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function Transport() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">{t.transport.title}</h1>
            <p className="text-muted-foreground">{t.transport.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {busPartners.map((partner) => (
              <Card key={partner.id} className="bg-background">
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <CardTitle>{partner.name}</CardTitle>
                  </div>
                  {partner.verified && <Badge variant="secondary">{t.chalet.details.verified}</Badge>}
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>من {partner.provinceFrom} إلى {partner.provinceTo}</p>
                  <p>السعة: {partner.capacity} مقعد</p>
                  <p>الجدول: {partner.schedule}</p>
                  <p>نقاط الالتقاط: {partner.pickupPoints.join("، ")}</p>
                  <p>الخصم: {partner.discountPercent}%</p>
                  <p>سعر الأساس: {partner.basePrice.toLocaleString()} ر.س</p>
                  <p>حافلة خاصة: {partner.charterAvailable ? "متاح" : "غير متاح"}</p>
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
