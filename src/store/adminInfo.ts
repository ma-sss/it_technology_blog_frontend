import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const adminInfo = atom({
    key: "adminInfo",
    default: { id: null },
    effects_UNSTABLE: [persistAtom]
});