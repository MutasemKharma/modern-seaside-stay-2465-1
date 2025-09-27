import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const approvals = [
  { id: "ch-12", name: "شاليه الرمال", owner: "فهد المطيري", status: "بانتظار التوثيق" },
  { id: "ch-13", name: "نسمات الجنوب", owner: "ليلى الزهراني", status: "بانتظار الصور" },
];

const payouts = [
  { id: "po-22", owner: "عبدالله المالك", amount: "6,500", status: "جاهز للتحويل" },
  { id: "po-23", owner: "مها الشهري", amount: "4,200", status: "قيد المراجعة" },
];

export default function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16 space-y-8">
          <div className="text-right space-y-2">
            <h1 className="text-4xl font-bold">{t.admin.dashboard.title}</h1>
            <p className="text-muted-foreground">{t.brand.subheadline}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t.admin.dashboard.catalog}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {approvals.map((item) => (
                  <div key={item.id} className="rounded-2xl border p-4">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p>{item.owner}</p>
                    <p>{item.status}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      مراجعة
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.admin.dashboard.payments}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {payouts.map((payout) => (
                  <div key={payout.id} className="rounded-2xl border p-4">
                    <p className="font-semibold text-foreground">{payout.owner}</p>
                    <p>{payout.amount} ر.س</p>
                    <p>{payout.status}</p>
                  </div>
                ))}
                <Button className="w-full">مزامنة مع Stripe</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t.admin.dashboard.analytics}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>حجوزات هذا الأسبوع: 48</p>
                <p>إجمالي الكاش باك: 3,200 ر.س</p>
                <p>نسبة تفعيل الكاش باك خلال ٧ أيام: 68%</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t.admin.dashboard.transport}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">شريك النقل</TableHead>
                    <TableHead className="text-right">المنطقة</TableHead>
                    <TableHead className="text-right">الخصم</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-right">رحلات الوسام</TableCell>
                    <TableCell className="text-right">الرياض → الشرقية</TableCell>
                    <TableCell className="text-right">25%</TableCell>
                    <TableCell className="text-right">مفعل</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-right">نقل الخليج</TableCell>
                    <TableCell className="text-right">الشرقية → مكة</TableCell>
                    <TableCell className="text-right">18%</TableCell>
                    <TableCell className="text-right">مفعل</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
