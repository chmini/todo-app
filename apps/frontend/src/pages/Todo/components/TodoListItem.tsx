import React from "react";

import { Delete } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { ConfirmDialog } from "@/components";
import { useModalActions } from "@/store/modal";

import { useTodoActions } from "../store";

import TodoDetail from "./TodoDetail";

import type { Todo } from "@/api/todo";

interface Props {
  todo: Todo;
}

export default function TodoListItem({ todo }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { updateCurrentTodo } = useTodoActions();
  const { openModal, closeModal } = useModalActions();

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
    if ((event.target as HTMLElement).closest("button")) return;

    updateCurrentTodo(event.currentTarget.dataset.id ?? "");
    openModal({
      children: (
        <React.Suspense>
          <TodoDetail />
        </React.Suspense>
      ),
      props: {
        fullWidth: true,
        maxWidth: "md",
        PaperProps: { sx: { height: "60vh" } },
      },
    });
  };

  const handleListDelete = () => {
    const handleConfirm = () => {
      mutate(todo.id);
      closeModal();
    };

    openModal({
      children: (
        <ConfirmDialog
          confirmColor="error"
          confirmMessage="Delete"
          content={
            <>
              Are you sure you want to delete the <strong>{todo.title}</strong>?
            </>
          }
          onConfirm={handleConfirm}
        />
      ),
      props: {
        onKeyUp: (event) => {
          if (!(event.key === "Enter")) return;
          handleConfirm();
        },
      },
    });
  };

  return (
    <ListItem
      disablePadding
      divider
      data-id={todo.id}
      secondaryAction={
        <Tooltip placement="left" title="Delete">
          <IconButton edge="end" onClick={handleListDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
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
