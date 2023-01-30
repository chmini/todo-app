import React from "react";

import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import useModal from "@/hooks/useModal";

interface Props {
  content?: string | JSX.Element;
  confirmMessage: string;
  position?: "start" | "end";
  title?: string;
  tooltip: string;
  variant: "error" | "warning" | "info" | "success";
  onConfirm: () => void;
}

export default function ConfirmDialog({
  title,
  content,
  confirmMessage,
  position,
  tooltip,
  variant,
  onConfirm,
}: Props) {
  const { open, openModal, closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!(event.key === "Enter")) return;

    handleConfirm();
  };

  return (
    <>
      <Tooltip placement="left" title={tooltip}>
        <IconButton edge={position} onClick={openModal}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={closeModal} onKeyUp={handleEnterKey}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: grey[500] }} onClick={closeModal}>
            Cancel
          </Button>
          <Button color={variant} onClick={handleConfirm}>
            {confirmMessage}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
