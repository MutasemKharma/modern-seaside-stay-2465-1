import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

export type UserRole = "Guest" | "Customer" | "ChaletOwner" | "Admin" | "Ops";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  locale: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  availableUsers: AuthUser[];
  login: (role: UserRole) => void;
  logout: () => void;
  switchLocale: (locale: string) => void;
  isAuthenticated: boolean;
  hasRole: (...roles: UserRole[]) => boolean;
}

const sampleUsers: Record<UserRole, AuthUser> = {
  Guest: {
    id: "guest",
    name: "ضيف",
    email: "guest@example.com",
    role: "Guest",
    locale: "ar",
  },
  Customer: {
    id: "customer-1",
    name: "سارة العمري",
    email: "customer@example.com",
    role: "Customer",
    locale: "ar",
  },
  ChaletOwner: {
    id: "owner-1",
    name: "عبدالله المالك",
    email: "owner@example.com",
    role: "ChaletOwner",
    locale: "ar",
  },
  Admin: {
    id: "admin-1",
    name: "فريق الإدارة",
    email: "admin@example.com",
    role: "Admin",
    locale: "ar",
  },
  Ops: {
    id: "ops-1",
    name: "دعم العمليات",
    email: "ops@example.com",
    role: "Ops",
    locale: "ar",
  },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setLanguage } = useLanguage();
  const [user, setUser] = useState<AuthUser | null>(sampleUsers.Guest);

  const availableUsers = useMemo(() => Object.values(sampleUsers), []);

  const login = (role: UserRole) => {
    const nextUser = sampleUsers[role];
    setUser(nextUser ?? sampleUsers.Guest);
    setLanguage(nextUser?.locale ?? "ar");
  };

  const logout = () => {
    setUser(sampleUsers.Guest);
    setLanguage("ar");
  };

  const switchLocale = (locale: string) => {
    if (!user) return;
    setUser({ ...user, locale });
    setLanguage(locale);
  };

  const contextValue: AuthContextValue = {
    user,
    availableUsers,
    login,
    logout,
    switchLocale,
    isAuthenticated: user?.role !== "Guest",
    hasRole: (...roles: UserRole[]) => (user ? roles.includes(user.role) : false),
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
