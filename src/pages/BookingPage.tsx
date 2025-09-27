import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Wallet, Bus } from "lucide-react";

const steps = [
  { icon: <CheckCircle2 className="h-5 w-5" />, title: "تحديد الشاليه", description: "اختيار التواريخ والشاليه المناسب" },
  { icon: <Bus className="h-5 w-5" />, title: "إضافة النقل", description: "اختيار الحافلة المخفضة أو النقل الخاص" },
  { icon: <CreditCard className="h-5 w-5" />, title: "الدفع الآمن", description: "Stripe مع دعم Apple Pay وGoogle Pay" },
  { icon: <Wallet className="h-5 w-5" />, title: "الكاش باك", description: "رصيد صالح لمدة ٧ أيام من تاريخ المغادرة" },
];

export default function BookingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16">
          <div className="mb-12 text-center space-y-3">
            <h1 className="text-4xl font-bold">{t.booking.title}</h1>
            <p className="text-muted-foreground">{t.brand.headline}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.booking.paymentMethods}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{t.booking.stripe}</p>
                  <p>{t.booking.cod}</p>
                  <p>{t.support.subtitle}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.booking.summary}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>• {t.customer.dashboard.wallet}</li>
                    <li>• {t.owner.dashboard.message}</li>
                    <li>• {t.transport.subtitle}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.support.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{t.support.subtitle}</p>
                  <p>{t.support.sla}</p>
                </CardContent>
              </Card>
            </div>
            <BookingForm />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.title} className="bg-background">
                <CardHeader className="flex items-center justify-end gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">{step.icon}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-right">
                  {step.description}
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
