import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface RequireRoleProps {
  roles: UserRole[];
  children: ReactNode;
}

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { hasRole } = useAuth();
  const location = useLocation();

  if (!hasRole(...roles)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
