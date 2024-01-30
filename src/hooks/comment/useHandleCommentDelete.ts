import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { showCommentInfo } from "../../store/showCommentInfo";
import { useRecoilValue } from "recoil";
import { useMessage } from "../useMessage";
import { adminCommentDeleteAuth, userCommentDeleteAuth } from "../../Auth";

export const useHandleCommentDelete = () => {
    const navigate = useNavigate();

    const commentInfo = useRecoilValue(showCommentInfo);

    const { showMessage } = useMessage();

    const HandleCommentDelete = useCallback(async () => {
        const endpoint = commentInfo.user_id
            ? userCommentDeleteAuth(commentInfo)
            : adminCommentDeleteAuth(commentInfo);

        try {
            const res = await endpoint;
            console.log(res.data);
            res.data.status === "SUCCESS" && showMessage({
                title: "コメントを一件削除しました",
                status: "warning",
            });
            navigate("/post_and_comment_page");
        } catch (error) {
            console.log(error);
        }
    }, [navigate, commentInfo, showMessage]);

    return { HandleCommentDelete };
};
