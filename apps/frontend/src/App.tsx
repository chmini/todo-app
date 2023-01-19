import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";

import { RequireAuth, RequireNonAuth } from "@/components/hoc";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import TodoPage from "@/pages/Todo";
import { isAuthenticatedState } from "@/recoil/auth";

export default function App() {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return (
    <>
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
          <Route element={<SignupPage />} path="/signup" />
          <Route
            path="/todo"
            element={
              <RequireAuth>
                <TodoPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
