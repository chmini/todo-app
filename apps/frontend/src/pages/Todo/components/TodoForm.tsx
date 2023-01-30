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
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm<TodoFormData>({ resolver: yupResolver(schema) });

  const queryClient = useQueryClient();
  const { mutate } = useMutation((formData: TodoFormData) => api.createTodo(formData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      // TODO 성공 스낵바(메시지, 투두 여는 버튼) 추가
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
      <TextField label="To do Name" variant="standard" {...register("title")} />
      <TextField multiline label="Description" variant="standard" {...register("content")} />
      <Button size="large" type="submit">
        Add To Do
      </Button>
    </Stack>
  );
}
