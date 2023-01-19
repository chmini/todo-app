import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import * as yup from "yup";

import api from "@/api";
import { Button } from "@/components/shared";
import { accessTokenState } from "@/recoil/auth";
import { sleep } from "@/utils/sleep";

import type { LoginFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export default function LoginForm() {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      // 로딩 처리를 위한 임시 장치
      await sleep(1000);

      const { message, token } = await api.login(formData);
      setAccessToken(token);
      toast.success(message);
    } catch (error) {
      /**
       * 로그인 실패처리
       * 1. 토스트
       * 2. 에러 메시지 렌더링
       */
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        이메일
        <input id="email" placeholder="wanted@email.com" type="email" {...register("email")} />
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
    </form>
  );
}
