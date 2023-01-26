import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { useTokenActions } from "@/store/auth";

import type { LoginFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

interface LoginFormValues extends LoginFormData {
  loginError: string;
}

// TODO Add validation error message
const schema = yup.object({
  email: yup.string().required("이메일을 입력해주세요").email("이메일 형식이 아닙니다"),
  password: yup.string().required("비밀번호를 입력해주세요").min(8, "비밀번호는 8자리 이상입니다"),
});

export default function LoginForm() {
  const { setToken } = useTokenActions();

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(schema) });

  const loginMutation = useMutation((formData: LoginFormData) => api.login(formData), {
    onSuccess: ({ message, token }) => {
      setToken(token);
      enqueueSnackbar(message, {
        variant: "success",
      });
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        setError("loginError", {
          message: error.message,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (formData) => {
    loginMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          id="email"
          label="이메일"
          variant="standard"
          {...register("email")}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          id="password"
          label="비밀번호"
          type="password"
          variant="standard"
          {...register("password")}
        />
        {!!errors.loginError && (
          <Typography color="error" variant="body2">
            {errors.loginError.message}
          </Typography>
        )}
        <Button type="submit" variant="contained">
          로그인
        </Button>
      </Stack>
    </form>
  );
}
