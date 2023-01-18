import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/shared";
import { sleep } from "@/utils/sleep";

import type { SubmitHandler } from "react-hook-form";

interface LoginFormValue {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValue>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<LoginFormValue> = async (data) => {
    // ANCHOR 로딩을 보기 위한 장치
    await sleep(1000);
    console.log(data);
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
