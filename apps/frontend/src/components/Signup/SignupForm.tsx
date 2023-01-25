import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import api from "@/api";
import { Button } from "@/components/shared";
import { useTokenActions } from "@/store/auth";
import { sleep } from "@/utils/sleep";

import type { SignupFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

interface SignupFormValues extends SignupFormData {
  passwordConfirmation: string;
  signupError: string;
}

// TODO Add validation error message
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

export default function SignupForm() {
  const { setToken } = useTokenActions();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: yupResolver(schema) });

  const signupMutation = useMutation((formData: SignupFormData) => api.signup(formData), {
    onSuccess: ({ message, token }) => {
      setToken(token);
      navigate("/", { replace: true });
      toast.success(message);
    },
    onError: (error) => {
      // TODO 에러 처리
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (formValues) => {
    const { email, password } = formValues;
    // 로딩 처리를 위한 임시 장치
    await sleep(1000);
    signupMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        이메일
        <input id="email" placeholder="wanted@email.com" type="text" {...register("email")} />
      </label>
      {errors.email?.message}
      <label htmlFor="password">
        비밀번호
        <input id="password" type="password" {...register("password")} />
      </label>
      {errors.password?.message}
      <label htmlFor="passwordConfirmation">
        비밀번호 확인
        <input id="passwordConfirmation" type="password" {...register("passwordConfirmation")} />
      </label>
      {errors.passwordConfirmation?.message}
      <Button type="submit">회원가입</Button>
    </form>
  );
}
