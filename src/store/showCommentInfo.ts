import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const showCommentInfo = atom({
    key: "showCommentInfo",
    default: { id: null, text: "" },
    effects_UNSTABLE: [persistAtom],
});
