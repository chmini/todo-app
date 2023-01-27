import { create } from "zustand";

interface TodoState {
  currentId: string;
  actions: TodoActions;
}

interface TodoActions {
  updateCurrentTodoId: (newId: string) => void;
}

const useTodoStore = create<TodoState>()((set) => ({
  currentId: "",
  actions: {
    updateCurrentTodoId: (newId: string) => set(() => ({ currentId: newId })),
  },
}));

export const useCurrentTodoId = () => useTodoStore((state) => state.currentId);

export const useTodoActions = () => useTodoStore((state) => state.actions);
