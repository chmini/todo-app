import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { useAuthActions } from "@/store/auth";

import type { LoginFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  email: yup.string().required("Please enter your e-mail").email("This is not an email format"),
  password: yup.string().required("Please enter your password").min(8, "Your password is at least 8 digits long"),
});

export default function LoginForm() {
  const { setToken } = useAuthActions();

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  const { isLoading, mutate } = useMutation((formData: LoginFormData) => api.login(formData), {
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

  const onSubmit: SubmitHandler<LoginFormData> = (formData) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          id="email"
          label="Email Address"
          placeholder="papa@gmail.com"
          variant="outlined"
          {...register("email")}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          {...register("password")}
        />
        <LoadingButton loading={isLoading} size="large" type="submit" variant="contained">
          login
        </LoadingButton>
      </Stack>
    </form>
  );
}
