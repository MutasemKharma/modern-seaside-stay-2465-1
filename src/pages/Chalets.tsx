import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChaletCard } from "@/components/ChaletCard";
import { chalets, Amenity } from "@/data/chalets";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const amenities: { key: Amenity; label: string }[] = [
  { key: "pool", label: "مسبح خاص" },
  { key: "sanitizedPool", label: "مسبح معقم" },
  { key: "wifi", label: "واي فاي" },
  { key: "bbq", label: "منطقة شواء" },
  { key: "privateGarden", label: "حديقة خاصة" },
  { key: "kidsArea", label: "منطقة أطفال" },
];

export default function Chalets() {
  const { t } = useLanguage();
  const [province, setProvince] = useState("");
  const [sanitizedOnly, setSanitizedOnly] = useState(false);
  const [capacity, setCapacity] = useState(2);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 1500]);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

  const filteredChalets = useMemo(() => {
    return chalets.filter((chalet) => {
      const matchesProvince = province ? chalet.province === province : true;
      const matchesSanitized = sanitizedOnly ? chalet.poolSanitized : true;
      const matchesCapacity = chalet.maxGuests >= capacity;
      const matchesPrice = chalet.nightlyRate >= priceRange[0] && chalet.nightlyRate <= priceRange[1];
      const matchesSearch = search ? chalet.name.includes(search) || chalet.description.includes(search) : true;
      const matchesAmenities = selectedAmenities.length
        ? selectedAmenities.every((amenity) => chalet.amenities.includes(amenity))
        : true;
      return matchesProvince && matchesSanitized && matchesCapacity && matchesPrice && matchesSearch && matchesAmenities;
    });
  }, [province, sanitizedOnly, capacity, priceRange, selectedAmenities, search]);

  const provinces = Array.from(new Set(chalets.map((chalet) => chalet.province)));

  const resetFilters = () => {
    setProvince("");
    setSanitizedOnly(false);
    setCapacity(2);
    setPriceRange([500, 1500]);
    setSelectedAmenities([]);
    setSearch("");
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-24">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t.search.title}</h1>
              <p className="text-sm text-muted-foreground">{t.search.subtitle}</p>
            </div>
            <Button variant="outline" onClick={resetFilters}>
              {t.search.filters.reset}
            </Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
            <aside className="space-y-6 rounded-3xl border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.filters.province}</label>
                <select
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  className="w-full rounded-xl border px-4 py-2 text-right"
                >
                  <option value="">{t.search.filters.reset}</option>
                  {provinces.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.filters.price}</label>
                <Slider
                  value={priceRange}
                  min={300}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <p className="text-xs text-muted-foreground">
                  {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ر.س
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.filters.capacity}</label>
                <Input
                  type="number"
                  min={1}
                  value={capacity}
                  onChange={(event) => setCapacity(Number(event.target.value))}
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.filters.sanitized}</label>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground">{t.chalet.badges.clean}</span>
                  <Checkbox checked={sanitizedOnly} onCheckedChange={(checked) => setSanitizedOnly(Boolean(checked))} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.filters.amenities}</label>
                <div className="grid gap-2">
                  {amenities.map((amenity) => (
                    <label key={amenity.key} className="flex items-center justify-end gap-2 text-sm">
                      <span>{amenity.label}</span>
                      <Checkbox
                        checked={selectedAmenities.includes(amenity.key)}
                        onCheckedChange={(checked) =>
                          setSelectedAmenities((prev) =>
                            checked
                              ? [...prev, amenity.key]
                              : prev.filter((item) => item !== amenity.key),
                          )
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">{t.search.title}</label>
                <Input
                  placeholder={t.search.subtitle}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="text-right"
                />
              </div>
            </aside>
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <div>
                  {t.search.results.heading} – <span className="font-semibold text-primary">{filteredChalets.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="rounded-full">
                      {amenities.find((item) => item.key === amenity)?.label}
                    </Badge>
                  ))}
                  {sanitizedOnly && <Badge variant="secondary">{t.chalet.badges.clean}</Badge>}
                </div>
              </div>
              {filteredChalets.length === 0 ? (
                <div className="rounded-3xl border border-dashed bg-background/70 p-12 text-center text-muted-foreground">
                  {t.search.results.empty}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredChalets.map((chalet) => (
                    <ChaletCard key={chalet.id} chalet={chalet} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
