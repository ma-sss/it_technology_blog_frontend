import { atom } from "recoil";

export const showPostState = atom({
    key: "showPostState",
    default: { post_id: null, title: null, content: null },
});
