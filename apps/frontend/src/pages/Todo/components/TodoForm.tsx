import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";

import type { TodoFormData } from "@/api/todo";
import type { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string(),
});

export default function TodoForm() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit } = useForm<TodoFormData>({ resolver: yupResolver(schema) });

  const { mutate } = useMutation((formData: TodoFormData) => api.createTodo(formData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  const onSubmit: SubmitHandler<TodoFormData> = (formData) => {
    mutate(formData);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <TextField label="할일 추가" variant="filled" {...register("title")} />
      <TextField multiline label="메모" rows={6} variant="filled" {...register("content")} />
      <Button size="large" type="submit">
        추가
      </Button>
    </Stack>
  );
}
