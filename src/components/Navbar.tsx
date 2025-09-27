import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BRAND_NAME } from "@/lib/branding";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { path: "/", key: "home" },
  { path: "/chalets", key: "chalets" },
  { path: "/offers", key: "offers" },
  { path: "/transport", key: "transport" },
  { path: "/support", key: "support" },
];

const DASHBOARD_LINKS = [
  { path: "/customer", key: "customer" },
  { path: "/owner", key: "owner" },
  { path: "/admin", key: "admin" },
  { path: "/ops", key: "ops" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLinks = () => (
    <ul className="hidden lg:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <li key={link.key}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              cn(
                "font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-foreground/80",
              )
            }
          >
            {t.nav[link.key as keyof typeof t.nav]}
          </NavLink>
        </li>
      ))}
      <li>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">{t.nav.dashboards}</span>
          <div className="flex items-center gap-2">
            {DASHBOARD_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    isActive ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
                  )
                }
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );

  const renderAuthActions = () => (
    <div className="hidden lg:flex items-center gap-2">
      <LanguageSelector />
      <ThemeToggle />
      {isAuthenticated ? (
        <Button variant="outline" onClick={logout}>
          {t.nav.logout}
        </Button>
      ) : (
        <Button asChild>
          <Link to="/login">{t.nav.login}</Link>
        </Button>
      )}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur shadow" : "bg-background/70",
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex flex-col text-end lg:text-start">
          <span className="text-xs uppercase tracking-widest text-primary">{BRAND_NAME}</span>
          <span className="text-sm text-muted-foreground">{t.brand.subheadline}</span>
        </Link>

        {renderNavLinks()}
        {renderAuthActions()}

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 end-0 w-80 max-w-[85vw] overflow-y-auto bg-card p-6 shadow-xl transition-transform",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{BRAND_NAME}</div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn("text-base font-medium", isActive ? "text-primary" : "text-foreground/80")
                }
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </NavLink>
            ))}
            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-muted-foreground">{t.nav.dashboards}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DASHBOARD_LINKS.map((link) => (
                  <NavLink
                    key={link.key}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "rounded-full border px-3 py-1 text-xs",
                        isActive ? "border-primary text-primary" : "border-border text-muted-foreground",
                      )
                    }
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              {isAuthenticated ? (
                <Button className="w-full" variant="secondary" onClick={() => (logout(), setMobileMenuOpen(false))}>
                  {t.nav.logout}
                </Button>
              ) : (
                <Button className="w-full" onClick={() => setMobileMenuOpen(false)} asChild>
                  <Link to="/login">{t.nav.login}</Link>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{t.auth.currentRole(user?.name ?? t.nav.home)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
