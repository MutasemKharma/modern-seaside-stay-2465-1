import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const tickets = [
  { id: "tk-210", subject: "تعديل موعد الحافلة", status: "عاجل", sla: "25 دقيقة", channel: "WhatsApp" },
  { id: "tk-211", subject: "طلب فاتورة", status: "قيد المتابعة", sla: "1 ساعة", channel: "البريد" },
];

const verifications = [
  { id: "vr-09", owner: "محمد السبيعي", status: "بانتظار وثيقة الهوية" },
  { id: "vr-10", owner: "سارة القحطاني", status: "بانتظار كشف الحساب" },
];

export default function OpsDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16 space-y-8">
          <div className="text-right space-y-2">
            <h1 className="text-4xl font-bold">{t.ops.dashboard.title}</h1>
            <p className="text-muted-foreground">{t.support.subtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.ops.dashboard.tickets}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-2xl border p-4">
                    <p className="font-semibold text-foreground">{ticket.subject}</p>
                    <p>{ticket.channel}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{ticket.status}</Badge>
                      <Badge variant="outline">SLA: {ticket.sla}</Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="mt-2">
                      فتح التذكرة
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.ops.dashboard.verification}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {verifications.map((item) => (
                  <div key={item.id} className="rounded-2xl border p-4">
                    <p className="font-semibold text-foreground">{item.owner}</p>
                    <p>{item.status}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      متابعة
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t.ops.dashboard.chats}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>محادثات نشطة: 6</p>
              <p>متوسط زمن الاستجابة: 4 دقائق</p>
              <p>طلبات الملاك: تحديث التقويم، إرسال فاتورة، جدولة تعقيم.</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
