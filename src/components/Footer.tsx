import { BRAND_NAME, PLATFORM_CONTACT_EMAIL } from "@/lib/branding";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-primary">{BRAND_NAME}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.brand.headline}</p>
            <p className="text-xs text-muted-foreground">
              {t.footer.vision(BRAND_NAME)}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">{t.footer.links.faq}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/policies" className="hover:text-primary">
                  {t.footer.links.policies}
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-primary">
                  {t.nav.support}
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-primary">
                  {t.nav.offers}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">{t.transport.title}</h4>
            <p className="text-sm text-muted-foreground">{t.transport.subtitle}</p>
            <Link to="/transport" className="text-sm text-primary underline">
              {t.nav.transport}
            </Link>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">{t.footer.contact}</h4>
            <p className="text-sm text-muted-foreground">{PLATFORM_CONTACT_EMAIL}</p>
            <p className="text-xs text-muted-foreground">{t.support.sla}</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
