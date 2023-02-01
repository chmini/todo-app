import { create } from "zustand";

interface TodoState {
  current: string;
  actions: TodoActions;
}

interface TodoActions {
  updateCurrentTodo: (newId: string) => void;
}

const useTodoStore = create<TodoState>()((set) => ({
  current: "",
  actions: {
    updateCurrentTodo: (newTodo: string) => set((state) => ({ current: newTodo })),
  },
}));

export const useCurrentTodo = () => useTodoStore((state) => state.current);

export const useTodoActions = () => useTodoStore((state) => state.actions);
