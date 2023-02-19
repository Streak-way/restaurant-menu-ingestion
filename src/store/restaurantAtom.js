import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const searchResAtom = atom({
  key: "searchResults",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});
