import { Link } from "react-router-dom";

import { LoginForm } from "@/components/Login";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <Link to="/signup">회원가입 하러가기</Link>
    </>
  );
}
