import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { showCommentInfo } from "../../store/showCommentInfo";
import { commentInfoType } from "../../types/commentInfoType";
import { useMessage } from "../useMessage";
import {
    adminCommentEditAuth,
    adminCommentShowAuth,
    userCommentEditAuth,
    userCommentShowAuth,
} from "../../Auth";

export const useHandleCommentEdit = () => {
    const [commentInfo, setCommentInfo] = useRecoilState(showCommentInfo);

    const { showMessage } = useMessage();

    const HandleCommentEdit = useCallback(async () => {
        const endpoint = commentInfo.user_id
            ? userCommentEditAuth(commentInfo, { text: commentInfo.text })
            : adminCommentEditAuth(commentInfo, { text: commentInfo.text });

        try {
            const res = await endpoint;
            console.log(res.data.status);
            res.data.status === "SUCCESS" &&
                showMessage({
                    title: "コメントを編集しました",
                    status: "success",
                });
            const fetchEndpoint = commentInfo.user_id
                ? userCommentShowAuth(commentInfo)
                : adminCommentShowAuth(commentInfo);

            const commentRes = await fetchEndpoint;
            setCommentInfo((prevCommentInfo: commentInfoType) => ({
                ...prevCommentInfo,
                text: commentRes.data.data.text,
            }));
            window.history.back();
        } catch (error) {
            console.log(error);
        }
    }, [commentInfo, setCommentInfo, showMessage]);

    return { HandleCommentEdit };
};
