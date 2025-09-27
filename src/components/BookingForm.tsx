import { useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { CalendarIcon, Bus, Gift, UtensilsCrossed } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingAddons, calculateCashback } from "@/data/chalets";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRAND_NAME, COD_PROVINCES } from "@/lib/branding";

const defaultDate: DateRange = {
  from: new Date(),
  to: addDays(new Date(), 2),
};

export default function BookingForm() {
  const { language, t } = useLanguage();
  const [date, setDate] = useState<DateRange | undefined>(defaultDate);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const nights = useMemo(() => {
    if (!date?.from || !date?.to) return 1;
    return Math.max(1, Math.round((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)));
  }, [date]);

  const subtotal = 950 * nights;
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = bookingAddons.find((item) => item.id === addonId);
    return addon ? acc + addon.price : acc;
  }, 0);
  const total = subtotal + addonsTotal;
  const cashback = calculateCashback(subtotal, undefined, nights);

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-right" dir="rtl">
          {t.booking.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground" dir="rtl">
          {t.booking.contactlessSupport}
        </p>
      </CardHeader>
      <CardContent className="space-y-6" dir="rtl">
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="dates">
              {t.search.filters.date}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dates"
                  variant="outline"
                  className="justify-between text-right"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {date?.from && date?.to
                      ? `${format(date.from, "PPP", { locale: language === "ar" ? arSA : enUS })} - ${format(date.to, "PPP", {
                          locale: language === "ar" ? arSA : enUS,
                        })}`
                      : t.search.subtitle}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={language === "ar" ? arSA : enUS}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold">{t.chalet.sections.addons}</h3>
            <div className="grid gap-3">
              {bookingAddons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() =>
                    setSelectedAddons((prev) =>
                      prev.includes(addon.id) ? prev.filter((id) => id !== addon.id) : [...prev, addon.id],
                    )
                  }
                  className={`flex items-center justify-between rounded-xl border p-4 text-right transition-colors ${
                    selectedAddons.includes(addon.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {addon.type === "bus" && <Bus className="h-5 w-5 text-primary" />}
                    {addon.type === "food" && <UtensilsCrossed className="h-5 w-5 text-primary" />}
                    {addon.type === "gift" && <Gift className="h-5 w-5 text-primary" />}
                    <div>
                      <p className="font-medium">{addon.title}</p>
                      <p className="text-xs text-muted-foreground">{addon.description}</p>
                    </div>
                  </div>
                  <Badge variant={selectedAddons.includes(addon.id) ? "default" : "outline"}>
                    {addon.price === 0 ? "هدية" : `${addon.price.toLocaleString()} ر.س`}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4" dir="rtl">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t.booking.summary}</span>
            <span>{subtotal.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>{t.chalet.sections.addons}</span>
            <span>{addonsTotal.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between font-semibold text-primary">
            <span>المجموع</span>
            <span>{total.toLocaleString()} ر.س</span>
          </div>
          <div className="flex justify-between text-emerald-600">
            <span>{t.booking.cashback}</span>
            <span>{cashback.toLocaleString()} ر.س</span>
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground">
          <p>{t.booking.paymentMethods}</p>
          <ul className="list-disc pe-5 text-right">
            <li>{t.booking.stripe}</li>
            <li>
              {t.booking.cod} – {COD_PROVINCES.length ? COD_PROVINCES.join(", ") : "غير متاح حالياً"}
            </li>
          </ul>
        </div>
        <Button size="lg" className="w-full">
          {t.booking.confirm}
        </Button>
        <p className="text-xs text-center text-muted-foreground">{BRAND_NAME} • {t.booking.success}</p>
      </CardFooter>
    </Card>
  );
}
