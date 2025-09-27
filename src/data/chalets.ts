import { differenceInDays, addDays } from "date-fns";
import { DEFAULT_CASHBACK_PERCENT } from "@/lib/branding";

export type Amenity =
  | "pool"
  | "sanitizedPool"
  | "wifi"
  | "bbq"
  | "parking"
  | "kidsArea"
  | "privateGarden"
  | "firepit";

export interface SanitizationLog {
  date: string;
  provider: string;
  notes: string;
}

export interface Chalet {
  id: string;
  name: string;
  province: string;
  nightlyRate: number;
  maxGuests: number;
  rating: number;
  amenities: Amenity[];
  description: string;
  photos: string[];
  verified: boolean;
  sanitationBadgeLevel: "gold" | "silver" | "bronze";
  sanitationLogs: SanitizationLog[];
  poolSanitized: boolean;
  mapUrl: string;
  coordinates: [number, number];
  dynamicPricing?: {
    peakMultiplier: number;
    weekendMultiplier: number;
  };
  rules: string[];
  cashbackPercent?: number;
  transportIncluded?: boolean;
}

export const chalets: Chalet[] = [
  {
    id: "chalet-1",
    name: "واحة الفيحاء",
    province: "الرياض",
    nightlyRate: 950,
    maxGuests: 12,
    rating: 4.8,
    amenities: ["pool", "sanitizedPool", "wifi", "bbq", "privateGarden"],
    description:
      "شاليه فاخر بمسبح داخلي معقم وساحة خارجية واسعة، مع خدمات تعقيم مسجلة وخدمة صيانة دورية.",
    photos: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-4ce9e1c1ba4a?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
    sanitationBadgeLevel: "gold",
    sanitationLogs: [
      {
        date: "2024-09-01",
        provider: "CleanPlus",
        notes: "تعقيم شامل مع تغيير فلاتر المسبح",
      },
      {
        date: "2024-08-20",
        provider: "PurePools",
        notes: "تنظيف أسبوعي مع اختبار جودة المياه",
      },
    ],
    poolSanitized: true,
    mapUrl: "https://api.mapbox.com/styles/v1/mapbox/streets-v11.html",
    coordinates: [24.7136, 46.6753],
    dynamicPricing: {
      peakMultiplier: 1.35,
      weekendMultiplier: 1.15,
    },
    rules: ["الدفع الإلكتروني المفضل", "ممنوع التدخين داخل الصالات", "الدخول من 3 مساءً والخروج 11 صباحاً"],
    cashbackPercent: DEFAULT_CASHBACK_PERCENT,
    transportIncluded: true,
  },
  {
    id: "chalet-2",
    name: "شاليه المروج",
    province: "الشرقية",
    nightlyRate: 720,
    maxGuests: 8,
    rating: 4.6,
    amenities: ["pool", "wifi", "bbq", "parking", "kidsArea"],
    description:
      "شاليه عائلي مع مسبح خاص وساحة لعب للأطفال، يتضمن باقات نقل مخفضة من الدمام والخبر.",
    photos: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
    sanitationBadgeLevel: "silver",
    sanitationLogs: [
      {
        date: "2024-08-28",
        provider: "SafeStay",
        notes: "تعقيم أسبوعي للمسابح والحدائق",
      },
    ],
    poolSanitized: true,
    mapUrl: "https://api.mapbox.com/styles/v1/mapbox/light-v10.html",
    coordinates: [26.4207, 50.0888],
    dynamicPricing: {
      peakMultiplier: 1.25,
      weekendMultiplier: 1.1,
    },
    rules: ["يمنع إقامة الحفلات الصاخبة", "التواصل مع الدعم لأي طلب إضافي"],
    cashbackPercent: DEFAULT_CASHBACK_PERCENT,
  },
  {
    id: "chalet-3",
    name: "مرج الطائف",
    province: "مكة",
    nightlyRate: 840,
    maxGuests: 10,
    rating: 4.9,
    amenities: ["pool", "sanitizedPool", "wifi", "bbq", "firepit", "privateGarden"],
    description: "شاليه جبلي بإطلالة على مرتفعات الهدا مع مسبح دافئ معقم وخدمات صيانة مخفضة للمالكين.",
    photos: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    verified: true,
    sanitationBadgeLevel: "gold",
    sanitationLogs: [
      {
        date: "2024-09-02",
        provider: "PurePools",
        notes: "تعقيم شامل للمسبح مع اختبار جودة المياه",
      },
    ],
    poolSanitized: true,
    mapUrl: "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11.html",
    coordinates: [21.4373, 39.1979],
    dynamicPricing: {
      peakMultiplier: 1.4,
      weekendMultiplier: 1.2,
    },
    rules: ["حيوانات أليفة حسب موافقة مسبقة", "جميع الطلبات عبر فريق الدعم"],
    cashbackPercent: DEFAULT_CASHBACK_PERCENT + 3,
    transportIncluded: true,
  },
];

export interface BookingAddon {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "bus" | "food" | "gift";
}

export const bookingAddons: BookingAddon[] = [
  {
    id: "bus-dammam",
    title: "حافلة الدمام ↔︎ الشرقية",
    description: "خصم 25٪ على حافلات الدرجة المريحة من وإلى الشاليه.",
    price: 120,
    type: "bus",
  },
  {
    id: "bus-riyadh",
    title: "نقل خاص من الرياض",
    description: "حافلة خاصة تتسع لـ 18 شخص شامل التعقيم قبل الرحلة.",
    price: 450,
    type: "bus",
  },
  {
    id: "food-bbq",
    title: "باقة شواء محلية",
    description: "خصم 15٪ على قائمة الشواء للشركات الشريكة.",
    price: 90,
    type: "food",
  },
  {
    id: "gift-welcome",
    title: "هدايا ترحيبية",
    description: "مجموعة هدايا محلية للعائلات المسافرة لأول مرة.",
    price: 0,
    type: "gift",
  },
];

export function calculateCashback(amount: number, percent = DEFAULT_CASHBACK_PERCENT, nights = 1) {
  const base = (amount * percent) / 100;
  const extra = nights > 2 ? base * 0.1 : 0;
  return Math.round((base + extra) * 100) / 100;
}

export function cashbackExpiry(date: Date) {
  const expiresAt = addDays(date, 7);
  const daysLeft = differenceInDays(expiresAt, new Date());
  return { expiresAt, daysLeft: Math.max(daysLeft, 0) };
}
