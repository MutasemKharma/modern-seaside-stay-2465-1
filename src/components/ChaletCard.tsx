import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Droplets, ShieldCheck } from "lucide-react";
import type { Chalet } from "@/data/chalets";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRAND_NAME } from "@/lib/branding";

interface ChaletCardProps {
  chalet: Chalet;
}

export function ChaletCard({ chalet }: ChaletCardProps) {
  const { t } = useLanguage();

  const badges = [
    chalet.poolSanitized ? t.chalet.badges.clean : null,
    chalet.cashbackPercent ? `${t.chalet.badges.cashback}` : null,
    chalet.transportIncluded ? t.chalet.badges.transport : null,
  ].filter(Boolean);

  return (
    <Card className="overflow-hidden border-2 border-primary/10">
      <Carousel className="w-full">
        <CarouselContent>
          {chalet.photos.map((photo) => (
            <CarouselItem key={photo}>
              <img src={photo} alt={chalet.name} className="h-56 w-full object-cover" loading="lazy" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap justify-between gap-3">
          <CardTitle className="text-2xl font-bold">{chalet.name}</CardTitle>
          <div className="flex items-center gap-1 text-primary">
            <Star className="h-4 w-4 fill-primary" />
            <span>{chalet.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{chalet.province}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{chalet.description}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge} className="bg-primary/10 text-primary">
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>{t.chalet.details.verified}</span>
          </div>
          {chalet.poolSanitized && (
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-sky-500" />
              <span>{t.chalet.details.sanitized}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold">{chalet.nightlyRate.toLocaleString()}</span>
            <span className="ms-2 text-sm text-muted-foreground">/ ليلة</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {t.booking.cashback}: {chalet.cashbackPercent ?? 0}%
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button asChild className="w-full">
          <Link to={`/chalets/${chalet.id}`}>{t.chalet.details.book}</Link>
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          {BRAND_NAME} – {t.support.subtitle}
        </p>
      </CardFooter>
    </Card>
  );
}

export type { Chalet };
