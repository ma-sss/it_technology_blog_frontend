import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const showReplyInfo = atom({
    key: "showReplyInfo",
    default: { id: null, user_id: null, admin_id: null, user_name: "",text: "" },
    effects_UNSTABLE: [persistAtom],
});
