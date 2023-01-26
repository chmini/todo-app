import { useLocation, Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@/store/auth";

interface Props {
  children: JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const isAuthenticated = useIsAuthenticated();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}
