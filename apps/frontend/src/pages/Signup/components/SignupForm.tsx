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

import type { SignupFormData } from "@/api/auth";
import type { SubmitHandler } from "react-hook-form";

interface SignupFormValues extends SignupFormData {
  passwordConfirmation: string;
}

const schema = yup.object({
  email: yup.string().required("Please enter your e-mail").email("This is not an email format"),
  password: yup.string().required("Please enter your password").min(8, "Your password is at least 8 digits long"),
  passwordConfirmation: yup
    .string()
    .required("Please reenter your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function SignupForm() {
  const { setToken } = useAuthActions();

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: yupResolver(schema) });

  const { isLoading, mutate } = useMutation((formData: SignupFormData) => api.signup(formData), {
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
    mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message}
            id="email"
            label="Email Address"
            placeholder="papa@email.com"
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
          <TextField
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            id="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            variant="outlined"
            {...register("passwordConfirmation")}
          />
        </Stack>
        <LoadingButton loading={isLoading} size="large" type="submit" variant="contained">
          sign up
        </LoadingButton>
      </Stack>
    </form>
  );
}
