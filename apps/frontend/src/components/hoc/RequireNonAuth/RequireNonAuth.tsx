import { Navigate, useLocation } from "react-router-dom";

import { useIsAuthenticated } from "@/store/auth";

interface Props {
  children: JSX.Element;
}

export default function RequireNonAuth({ children }: Props) {
  const isAuthenticated = useIsAuthenticated();

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/todo" />;
  }

  return children;
}
