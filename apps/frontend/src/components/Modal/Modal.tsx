import { Dialog } from "@mui/material";

import { useCurrentModal, useModalActions, useModalOpen } from "@/store/modal";

export default function Modal() {
  const open = useModalOpen();
  const current = useCurrentModal();
  const { closeModal } = useModalActions();

  return (
    <Dialog open={open} onClose={closeModal} {...current?.props}>
      {current?.children}
    </Dialog>
  );
}
