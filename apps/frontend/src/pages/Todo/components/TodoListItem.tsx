import React from "react";

import { ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { ConfirmDialog } from "@/components";

import { useTodoActions } from "../store";

import type { Todo } from "@/api/todo";

interface Props {
  todo: Todo;
}

export default function TodoListItem({ todo }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { updateCurrentTodoId } = useTodoActions();

  const queryClient = useQueryClient();

  const { mutate } = useMutation((id: string) => api.deleteTodo(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      enqueueSnackbar("Deleted successfully", { variant: "success" });
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  const handleListSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    const { id } = event.currentTarget.dataset;
    if (id) updateCurrentTodoId(id);
  };

  return (
    <ListItem
      disablePadding
      divider
      data-id={todo.id}
      secondaryAction={
        <ConfirmDialog
          confirmMessage="Delete"
          position="end"
          tooltip="Delete"
          variant="error"
          content={
            <>
              Are you sure you want to delete the <strong>{todo.title}</strong>?
            </>
          }
          onConfirm={() => {
            mutate(todo.id);
          }}
        />
      }
      sx={{
        "& .MuiListItemSecondaryAction-root": {
          visibility: "hidden",
        },
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": {
            "& .MuiListItemSecondaryAction-root": {
              visibility: "visible",
            },
          },
        },
      }}
      onClick={handleListSelect}
    >
      <ListItemButton sx={{ gap: 1 }}>
        <ListItemText
          primary={<Typography sx={{ wordBreak: "break-word" }}>{todo.title}</Typography>}
          secondary={todo.content}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
    </ListItem>
  );
}
