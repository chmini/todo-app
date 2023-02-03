import type React from "react";

import { create } from "zustand";

import type { DialogProps, DrawerProps } from "@mui/material";

type ModalProps = Omit<DialogProps, "open" | "onClose"> | Omit<DrawerProps, "open" | "onClose">;

interface ModalSetting {
  id: string;
  children: React.ReactNode;
  props?: ModalProps;
}

interface ModalActions {
  openModal: (props: Omit<ModalSetting, "id">) => void;
  closeModal: () => void;
}

interface ModalState {
  modals: ModalSetting[];
  open: boolean;
  current: ModalSetting | null;
  actions: ModalActions;
}

const useModalStore = create<ModalState>()((set) => ({
  modals: [],
  open: false,
  current: null,
  actions: {
    openModal: (props: Omit<ModalSetting, "id">) =>
      set((state) => {
        const newModal = { id: crypto.randomUUID(), ...props };
        return {
          modals: [...state.modals, newModal],
          current: newModal,
          open: true,
        };
      }),
    closeModal: () =>
      set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== state.current?.id),
        open: false,
      })),
  },
}));

export const useCurrentModal = () => useModalStore((state) => state.current);

export const useModalOpen = () => useModalStore((state) => state.open);

export const useModalActions = () => useModalStore((state) => state.actions);
