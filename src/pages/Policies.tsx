import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const policies = [
  {
    title: "سياسة الإلغاء",
    description: "إلغاء مجاني حتى ٤٨ ساعة قبل الوصول، بعدها يتم خصم ٣٠٪ لتغطية التكاليف التشغيلية.",
  },
  {
    title: "سياسة التعقيم",
    description: "جميع الشاليهات تمر بجلسات تعقيم قبل كل حجز، ويتم تسجيلها في سجل التعقيم المعروض للعملاء.",
  },
  {
    title: "حماية البيانات",
    description: "نقوم بإخفاء بيانات التواصل بين العملاء والملاك وشركاء النقل، وكل التراسل يتم عبر فريق الدعم.",
  },
];

export default function Policies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">السياسات والمعايير</h1>
            <p className="text-muted-foreground">معايير الحجز، الإلغاء، التعقيم، وحماية البيانات على المنصة.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {policies.map((policy) => (
              <Card key={policy.title} className="bg-background">
                <CardHeader>
                  <CardTitle>{policy.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  {policy.description}
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
