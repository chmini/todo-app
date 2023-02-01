import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { useModalActions } from "@/store/modal";

interface Props {
  title?: string;
  content?: string | JSX.Element;
  confirmMessage: string;
  confirmColor?: "inherit" | "error" | "success" | "warning" | "info" | "primary" | "secondary";
  onConfirm: () => void;
}

export default function ConfirmDialog({ title, content, confirmMessage, confirmColor, onConfirm }: Props) {
  const { closeModal } = useModalActions();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: (theme) => theme.palette.grey[500] }} onClick={closeModal}>
          Cancel
        </Button>
        <Button color={confirmColor} onClick={handleConfirm}>
          {confirmMessage}
        </Button>
      </DialogActions>
    </>
  );
}
