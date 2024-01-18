import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const showPostInfo = atom({
    key: "showPostInfo",
    default: { id: null, title: "", content: "" },
    effects_UNSTABLE: [persistAtom],
});
