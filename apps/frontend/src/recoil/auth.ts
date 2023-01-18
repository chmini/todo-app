import { atom, selector } from "recoil";

import { localStorageEffect } from "./storage";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  effects: [localStorageEffect("accessToken")],
});

export const isAuthenticatedState = selector({
  key: "isAuthenticatedState",
  get: ({ get }) => get(accessTokenState) !== "",
});
