import React from "react";

const useModal = () => {
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return { open, openModal, closeModal };
};

export default useModal;
