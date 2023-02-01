import type React from "react";

import { create } from "zustand";

import type { DialogProps } from "@mui/material";

type ModalProps = Omit<DialogProps, "open" | "onClose">;

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
  current: ModalSetting | null;
  actions: ModalActions;
}

const useModalStore = create<ModalState>()((set) => ({
  modals: [],
  current: null,
  actions: {
    openModal: (props: Pick<ModalSetting, "children">) =>
      set((state) => {
        const newModal = { id: crypto.randomUUID(), ...props };
        return { modals: [...state.modals, newModal], current: newModal };
      }),
    closeModal: () =>
      set((state) => ({
        modals: state.modals.filter((modal) => modal.id !== state.current?.id),
        current: state.modals[state.modals.length - 2] || null,
      })),
  },
}));

export const useModal = () => useModalStore((state) => state.current);

export const useModalActions = () => useModalStore((state) => state.actions);
