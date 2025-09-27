import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, type Location } from "react-router-dom";
import type { UserRole } from "@/contexts/AuthContext";

const ROLE_DESTINATIONS: Record<UserRole, string> = {
  Guest: "/",
  Customer: "/customer",
  ChaletOwner: "/owner",
  Admin: "/admin",
  Ops: "/ops",
};

export default function Login() {
  const { t } = useLanguage();
  const { availableUsers, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const roleLabels: Record<UserRole, string> = {
    Guest: t.auth.guest,
    Customer: t.nav.customer,
    ChaletOwner: t.nav.owner,
    Admin: t.nav.admin,
    Ops: t.nav.ops,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (role: UserRole) => {
    login(role);
    const redirect = (location.state as { from?: Location })?.from?.pathname ?? ROLE_DESTINATIONS[role];
    navigate(redirect, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <section className="container py-16">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <h1 className="text-4xl font-bold">{t.auth.welcome}</h1>
            <p className="text-muted-foreground">{t.brand.subheadline}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {availableUsers.map((user) => (
              <Card key={user.id} className="bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl">{t.auth.as(roleLabels[user.role])}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{t.auth.currentRole(roleLabels[user.role])}</p>
                  <Button className="w-full" onClick={() => handleLogin(user.role)}>
                    {t.nav.login}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
