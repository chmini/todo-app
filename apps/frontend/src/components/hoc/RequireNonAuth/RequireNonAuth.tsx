import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isAuthenticatedState } from "@/recoil/auth";

interface Props {
  children: JSX.Element;
}

export default function RequireNonAuth({ children }: Props) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/todo" />;
  }

  return children;
}
