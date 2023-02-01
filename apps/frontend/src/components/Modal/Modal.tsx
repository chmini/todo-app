import { Dialog } from "@mui/material";

import { useModal, useModalActions } from "@/store/modal";

export default function Modal() {
  const modal = useModal();
  const { closeModal } = useModalActions();

  return (
    <Dialog open={!!modal} onClose={closeModal} {...modal?.props}>
      {modal?.children}
    </Dialog>
  );
}
