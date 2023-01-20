import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import * as yup from "yup";

import api from "@/api";
import { isLoginError } from "@/api/auth";
import { Button } from "@/components/shared";
import { accessTokenState } from "@/recoil/auth";
import { sleep } from "@/utils/sleep";

import type { LoginFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

interface LoginFormValues extends LoginFormData {
  loginError: string;
}

// TODO Add validation error message
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export default function LoginForm() {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });

  const loginMutation = useMutation((formData: LoginFormData) => api.login(formData), {
    onSuccess: ({ message, token }) => {
      setAccessToken(token);
      toast.success(message);
    },
    onError: (error) => {
      if (isLoginError(error)) {
        setError("loginError", {
          message: "아이디 또는 비밀번호를 잘못 입력했습니다.\n 입력하신 내용을 다시 확인해주세요.",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    // 로딩 처리를 위한 임시 장치
    await sleep(1000);
    loginMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        이메일
        <input id="email" placeholder="wanted@email.com" type="text" {...register("email")} />
      </label>
      {errors.email?.message}
      <label htmlFor="password">
        패스워드
        <input id="password" type="password" {...register("password")} />
      </label>
      {errors.password?.message}
      <Button isLoading={isSubmitting} type="submit">
        로그인
      </Button>
      {errors.loginError?.message}
    </form>
  );
}
