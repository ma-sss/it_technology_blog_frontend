import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const showPostInfo = atom({
    key: "showPostState",
    default: { post_id: null, title: "", content: "" },
    effects_UNSTABLE: [persistAtom],
});
