import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cashbackExpiry } from "@/data/chalets";
import { useMemo } from "react";

const sampleBookings = [
  {
    id: "bk-101",
    chalet: "واحة الفيحاء",
    startDate: "2024-09-15",
    endDate: "2024-09-17",
    status: "مؤكد",
    transport: "حافلة الدمام",
    cashback: 280,
  },
  {
    id: "bk-102",
    chalet: "مرج الطائف",
    startDate: "2024-10-05",
    endDate: "2024-10-07",
    status: "قيد المتابعة",
    transport: "نقل خاص",
    cashback: 0,
  },
];

export default function CustomerDashboard() {
  const { t } = useLanguage();

  const wallet = useMemo(() => cashbackExpiry(new Date("2024-09-17")), []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16 space-y-8">
          <div className="flex flex-col gap-2 text-right">
            <h1 className="text-4xl font-bold">{t.customer.dashboard.title}</h1>
            <p className="text-muted-foreground">{t.customer.dashboard.expiryReminder}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t.customer.dashboard.bookings}</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold text-primary">{sampleBookings.length}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.customer.dashboard.wallet}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  {t.customer.wallet.balance}: <span className="font-semibold text-primary">320 ر.س</span>
                </p>
                <p>{t.customer.wallet.expiresAt(wallet.expiresAt.toLocaleDateString())}</p>
                <p>{t.customer.wallet.reminders}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.customer.dashboard.support}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{t.support.subtitle}</p>
                <Button className="w-full">{t.support.createTicket}</Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t.customer.dashboard.bookings}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleBookings.map((booking) => (
                <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4">
                  <div>
                    <p className="font-semibold">{booking.chalet}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.startDate} - {booking.endDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{booking.status}</Badge>
                    <Badge variant="outline">{booking.transport}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.booking.cashback}: {booking.cashback} ر.س
                  </div>
                  <Button variant="ghost" size="sm">
                    تفاصيل الحجز
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
