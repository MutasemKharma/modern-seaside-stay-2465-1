import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { chalets } from "@/data/chalets";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ShieldCheck, Droplets, MapPin, CalendarCheck } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function ChaletDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  const chalet = useMemo(() => chalets.find((item) => item.id === id), [id]);

  if (!chalet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg">{t.search.results.empty}</p>
            <Button asChild>
              <Link to="/chalets">{t.nav.chalets}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {chalet.photos.map((photo) => (
                    <CarouselItem key={photo}>
                      <img src={photo} alt={chalet.name} className="h-[400px] w-full rounded-3xl object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{chalet.name}</h1>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{chalet.province}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chalet.verified && <Badge className="bg-emerald-500/10 text-emerald-600">{t.chalet.details.verified}</Badge>}
                    {chalet.poolSanitized && <Badge className="bg-primary/10 text-primary">{t.chalet.details.sanitized}</Badge>}
                    {chalet.transportIncluded && <Badge variant="secondary">{t.chalet.badges.transport}</Badge>}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{chalet.description}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-end gap-2 text-lg">
                        {t.chalet.details.amenities}
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2 text-sm text-muted-foreground">
                        {chalet.amenities.map((amenity) => (
                          <li key={amenity} className="text-right">
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-end gap-2 text-lg">
                        {t.chalet.details.rules}
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2 text-sm text-muted-foreground">
                        {chalet.rules.map((rule) => (
                          <li key={rule}>{rule}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-end gap-2 text-lg">
                      {t.chalet.details.sanitation}
                      <Droplets className="h-5 w-5 text-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {chalet.sanitationLogs.map((log) => (
                        <li key={log.date} className="flex items-center justify-between gap-2">
                          <span>{log.provider}</span>
                          <span>{log.date}</span>
                          <span className="text-xs">{log.notes}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="text-sm text-muted-foreground">{t.booking.summary}</span>
                      <span className="text-2xl font-bold">{chalet.nightlyRate.toLocaleString()} ر.س</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>{t.booking.cashback}: {chalet.cashbackPercent ?? 0}%</span>
                    <span>{t.search.filters.capacity}: {chalet.maxGuests}</span>
                    <span>{t.search.filters.rating ?? "التقييم"}: {chalet.rating.toFixed(1)}</span>
                  </CardContent>
                </Card>
              </div>
            </div>
            <aside className="space-y-6">
              <BookingForm />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-end gap-2 text-lg">
                    {t.chalet.details.availability}
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• التواصل يتم عبر فريق الدعم فقط</p>
                  <p>• التحويل للمالك بعد تسجيل الوصول</p>
                  <p>• النقل بالحافلات يدار من فريق العمليات</p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
