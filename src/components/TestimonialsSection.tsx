import { ShieldCheck, Sparkles, Building2, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRAND_NAME } from "@/lib/branding";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const roleBlocks = [
    {
      title: t.customer.dashboard.title,
      description: t.customer.dashboard.expiryReminder,
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      bullets: t.hero.perks,
    },
    {
      title: t.owner.dashboard.title,
      description: t.owner.dashboard.message,
      icon: <Building2 className="h-6 w-6 text-primary" />,
      bullets: t.owner.perks,
    },
    {
      title: t.admin.dashboard.title,
      description: t.support.sla,
      icon: <Workflow className="h-6 w-6 text-primary" />,
      bullets: [t.admin.dashboard.catalog, t.admin.dashboard.payments, t.admin.dashboard.transport, t.admin.dashboard.analytics],
    },
  ];

  return (
    <section className="bg-muted/30 py-16">
      <div className="container space-y-12">
        <div className="text-center" dir="rtl">
          <h2 className="text-3xl font-bold">{BRAND_NAME}</h2>
          <p className="mt-2 text-muted-foreground">{t.brand.subheadline}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {roleBlocks.map((block) => (
            <Card key={block.title} className="border-primary/20">
              <CardHeader className="flex flex-col items-start gap-3" dir="rtl">
                <div className="rounded-full bg-primary/10 p-3 text-primary">{block.icon}</div>
                <CardTitle className="text-2xl">{block.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{block.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground" dir="rtl">
                  {block.bullets.map((item) => (
                    <li key={item} className="flex items-center justify-end gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
