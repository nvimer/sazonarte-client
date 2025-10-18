/**
 * PRIVATE ROUTE COMPONENT
 *
 * Protects routes that require authentication.
 * If user is not logged in, redirects to login page.
 */

import { useAuth } from "@/hooks";
import type React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking authentication, show loading.
  if (isLoading) {
    return (
      <div>
        <div>Cargando...</div>
      </div>
    );
  }

  // If is not autheticated, show the protected content
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, shoy the protected content
  return <>{children}</>;
}
