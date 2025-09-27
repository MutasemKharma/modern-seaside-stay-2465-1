import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PLATFORM_CONTACT_EMAIL } from "@/lib/branding";
import { Headset, MessageSquare, Mail } from "lucide-react";

export default function Support() {
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
            <h1 className="text-4xl font-bold">{t.support.title}</h1>
            <p className="text-muted-foreground">{t.support.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="bg-background">
              <CardHeader className="flex items-center justify-end gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Headset className="h-6 w-6" />
                </div>
                <CardTitle>{t.support.createTicket}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>{t.support.subtitle}</p>
                <Button className="w-full">{t.support.createTicket}</Button>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="flex items-center justify-end gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle>الدردشة المباشرة</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>تواصل مع فريق العمليات لحلول فورية للحجوزات والنقل.</p>
                <Button variant="outline" className="w-full">
                  بدء محادثة
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="flex items-center justify-end gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>البريد المعتمد</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>{PLATFORM_CONTACT_EMAIL}</p>
                <p>{t.support.sla}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
