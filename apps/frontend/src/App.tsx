import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RequireAuth, RequireNonAuth } from "@/components/hoc";
import { LoginPage, NotFoundPage, SignupPage, TodoPage } from "@/pages";
import { useIsAuthenticated } from "@/store/auth";

export default function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isAuthenticated ? <TodoPage /> : <LoginPage />} path="/" />
        <Route
          path="/login"
          element={
            <RequireNonAuth>
              <LoginPage />
            </RequireNonAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireNonAuth>
              <SignupPage />
            </RequireNonAuth>
          }
        />
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <TodoPage />
            </RequireAuth>
          }
        />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
