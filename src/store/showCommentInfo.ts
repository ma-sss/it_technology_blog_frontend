import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const showCommentInfo = atom({
    key: "showCommentInfo",
    default: { id: null, user_id: null, admin_id: null, user_name: "", text: "" },
    effects_UNSTABLE: [persistAtom],
});

export const showCommentInfoSelector = selector({
    key: "showCommentInfoSelector",
    get: ({ get }) => {
        const commentInfo = get(showCommentInfo);
        return commentInfo;
    },
});
