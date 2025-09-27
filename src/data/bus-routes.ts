export interface BusPartner {
  id: string;
  name: string;
  provinceFrom: string;
  provinceTo: string;
  pickupPoints: string[];
  schedule: string;
  capacity: number;
  charterAvailable: boolean;
  basePrice: number;
  discountPercent: number;
  verified: boolean;
}

export const busPartners: BusPartner[] = [
  {
    id: "partner-1",
    name: "رحلات الوسام",
    provinceFrom: "الرياض",
    provinceTo: "الشرقية",
    pickupPoints: ["محطة العليا", "محطة ديراب"],
    schedule: "يوميًا 9 صباحًا و5 مساءً",
    capacity: 40,
    charterAvailable: true,
    basePrice: 160,
    discountPercent: 25,
    verified: true,
  },
  {
    id: "partner-2",
    name: "نقل الخليج",
    provinceFrom: "الشرقية",
    provinceTo: "مكة",
    pickupPoints: ["محطة الدمام", "محطة الخبر"],
    schedule: "الخميس - السبت",
    capacity: 30,
    charterAvailable: true,
    basePrice: 220,
    discountPercent: 18,
    verified: true,
  },
];
