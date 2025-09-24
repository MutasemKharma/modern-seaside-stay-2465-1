import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { getApartmentById } from "@/data/apartments";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ApartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const apartment = useMemo(() => (id ? getApartmentById(id) : undefined), [id]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 container">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Not found</h2>
            <Button variant="outline" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const submit = async () => {
    try {
      if (!form.fullName || !form.email || !form.checkIn || !form.checkOut) {
        toast.error("Please fill all required fields.");
        return;
      }
      setLoading(true);
      const { error } = await supabase.from("bookings").insert({
        apartment_id: apartment.id,
        apartment_name: apartment.name,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        check_in: form.checkIn,
        check_out: form.checkOut,
        guests: form.guests,
        notes: form.notes,
        price_per_night: apartment.price,
        currency: "JOD",
        status: "pending",
        source: "website",
      });
      if (error) throw error;
      toast.success("Request sent! We'll contact you shortly.");
      navigate("/booking");
    } catch (e: any) {
      toast.error(e.message || "Failed to send booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <section className="py-10 border-b">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{apartment.name}</h1>
                <p className="text-muted-foreground">{apartment.description}</p>
                <div className="mt-4 text-lg font-semibold">{apartment.price} JD / {t.booking.summary.night}</div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{t.booking.title || "Book this chalet"}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+962…" />
                </div>
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input id="guests" type="number" min={1} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
                </div>
                <div>
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input id="checkIn" type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="checkOut">Check-out</Label>
                  <Input id="checkOut" type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special requests?" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-lg font-semibold">Total: —</div>
                <Button onClick={submit} disabled={loading} className="btn-primary">
                  {loading ? "Submitting..." : "Request booking"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}