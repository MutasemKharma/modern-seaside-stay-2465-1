import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { chalets } from "@/data/chalets";

const maintenanceOrders = [
  { id: "mnt-1", chalet: "واحة الفيحاء", type: "تعقيم مسبح", status: "تم التنفيذ", scheduledAt: "2024-09-03" },
  { id: "mnt-2", chalet: "مرج الطائف", type: "تنظيف شامل", status: "مجدول", scheduledAt: "2024-09-10" },
];

export default function OwnerDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16 space-y-8">
          <div className="text-right space-y-2">
            <h1 className="text-4xl font-bold">{t.owner.dashboard.title}</h1>
            <p className="text-muted-foreground">{t.owner.dashboard.message}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t.owner.dashboard.listings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chalets.map((chalet) => (
                  <div key={chalet.id} className="rounded-2xl border p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">{chalet.name}</p>
                    <p>المعدل: {chalet.nightlyRate.toLocaleString()} ر.س</p>
                    <p>السعة: {chalet.maxGuests} ضيوف</p>
                    <Badge variant="outline">{chalet.sanitationBadgeLevel}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.owner.dashboard.maintenance}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {maintenanceOrders.map((order) => (
                  <div key={order.id} className="rounded-2xl border p-4">
                    <p className="font-semibold text-foreground">{order.chalet}</p>
                    <p>{order.type}</p>
                    <p>{order.scheduledAt}</p>
                    <Badge variant="secondary">{order.status}</Badge>
                  </div>
                ))}
                <Button className="w-full">طلب خدمة جديدة</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.owner.dashboard.payouts}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>الرصيد المستحق: <span className="font-semibold text-primary">12,400 ر.س</span></p>
                <p>التحويل القادم: 2024-09-18</p>
                <p>عمولة المنصة: 12%</p>
                <Button variant="outline" className="w-full">عرض التفاصيل</Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t.owner.dashboard.promotions}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>انضمام لحملة نهاية الأسبوع مع خصم 10% على النقل.</p>
              <Button variant="secondary">الاشتراك في الحملة</Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
