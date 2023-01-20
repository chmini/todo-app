import { Link } from "react-router-dom";

import SignupForm from "@/components/Signup/SignupForm";

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <Link to="/login">로그인 하러가기</Link>
    </>
  );
}
