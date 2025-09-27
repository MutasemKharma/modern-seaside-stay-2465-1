import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage, SupportedLocale } from "@/contexts/LanguageContext";

const LANG_OPTIONS = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={(value) => setLanguage(value as SupportedLocale)}>
        <SelectTrigger className="w-[96px] h-10 border-none bg-transparent focus:ring-0" aria-label="Select language">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue placeholder="Language" />
          </div>
        </SelectTrigger>
        <SelectContent align="start" className="w-[160px]">
          {LANG_OPTIONS.map((option) => (
            <SelectItem key={option.code} value={option.code} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span>{option.flag}</span>
                <span>{option.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
