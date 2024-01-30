import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { showReplyInfo } from "../../store/showReplyInfo";
import { useMessage } from "../useMessage";
import { adminReplyDeleteAuth, userReplyDeleteAuth } from "../../Auth";

export const useHandleReplyDelete = () => {
    const navigate = useNavigate();

    const replyInfo = useRecoilValue(showReplyInfo);

    const { showMessage } = useMessage();

    const HandleReplyDelete = useCallback(async () => {

        const endpoint = replyInfo.user_id
            ? userReplyDeleteAuth(replyInfo)
            : adminReplyDeleteAuth(replyInfo);

        try {
            const res = await endpoint;
            res.data.status === "SUCCESS" &&
                showMessage({
                    title: "返信を一件削除しました",
                    status: "warning",
                });
            navigate("/comment_and_reply_page");
        } catch (error) {
            console.log(error);
        }
    }, [navigate, showMessage, replyInfo]);

    return { HandleReplyDelete };
};
