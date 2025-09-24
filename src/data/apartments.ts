import type { ApartmentProps } from "@/components/ApartmentCard";

export const apartments: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description:
      "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: [
      "Wi-Fi",
      "Kitchen",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Balcony",
    ],
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description:
      "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: [
      "Wi-Fi",
      "Kitchen",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Washing Machine",
    ],
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description:
      "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"],
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description:
      "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image:
      "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: [
      "Wi-Fi",
      "Full Kitchen",
      "2 Bathrooms",
      "Air Conditioning",
      "TV",
      "Terrace",
      "Jacuzzi",
    ],
  },
  {
    id: "5",
    name: "Classic Double Room",
    description:
      "Comfortable hotel room with modern amenities and partial sea views.",
    price: 120,
    capacity: 2,
    size: 28,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    location: "Hotel building",
    features: [
      "Wi-Fi",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Mini Fridge",
    ],
  },
  {
    id: "6",
    name: "Garden View Apartment",
    description:
      "Peaceful apartment surrounded by lush gardens, just a short walk from the beach.",
    price: 160,
    capacity: 3,
    size: 55,
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    location: "Garden area",
    features: [
      "Wi-Fi",
      "Kitchen",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Terrace",
    ],
  },
];

export const getApartmentById = (id: string) =>
  apartments.find((a) => a.id === id);

export type { ApartmentProps };