import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { useTokenActions } from "@/store/auth";

import type { SignupFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

interface SignupFormValues extends SignupFormData {
  passwordConfirmation: string;
}

const schema = yup.object({
  email: yup.string().required("이메일을 입력해주세요").email("이메일 형식이 아닙니다다"),
  password: yup.string().required("비밀번호를 입력해주세요").min(8, "비밀번호는 8자리 이상입니다"),
  passwordConfirmation: yup
    .string()
    .required("비밀번호를 다시 입력해주세요")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
});

export default function SignupForm() {
  const { setToken } = useTokenActions();

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: yupResolver(schema) });

  const signupMutation = useMutation((formData: SignupFormData) => api.signup(formData), {
    onSuccess: ({ message, token }) => {
      setToken(token);
      enqueueSnackbar(message, { variant: "success" });
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (formValues) => {
    const { email, password } = formValues;
    signupMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message}
            id="email"
            label="이메일"
            placeholder="papa@email.com"
            variant="outlined"
            {...register("email")}
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            id="password"
            label="비밀번호"
            type="password"
            variant="outlined"
            {...register("password")}
          />
          <TextField
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            id="passwordConfirmation"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            {...register("passwordConfirmation")}
          />
        </Stack>
        <Button size="large" type="submit" variant="contained">
          회원가입
        </Button>
      </Stack>
    </form>
  );
}
