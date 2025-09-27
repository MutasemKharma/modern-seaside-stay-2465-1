import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.warn("404 route", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20" dir="rtl">
      <div className="rounded-3xl border bg-background p-10 text-center shadow-2xl">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.search.results.empty}</p>
        <Button asChild className="mt-6">
          <Link to="/">
            <Home className="ms-2 h-5 w-5" />
            {t.nav.home}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
