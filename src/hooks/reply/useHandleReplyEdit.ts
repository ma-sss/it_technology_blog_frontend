import { useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

import { replyInfoType } from "../../types/replyInfoType";
import { showReplyInfo } from "../../store/showReplyInfo";
import { useMessage } from "../useMessage";
import {
    adminReplyEditAuth,
    adminReplyShowAuth,
    userReplyEditAuth,
    userReplyShowAuth,
} from "../../Auth";

export const useHandleReplyEdit = () => {
    const [replyInfo, setReplyInfo] = useRecoilState(showReplyInfo);

    const { showMessage } = useMessage();

    const HandleReplyEdit = useCallback(async () => {
        const endpoint = replyInfo.user_id
            ? userReplyEditAuth(replyInfo, { text: replyInfo.text })
            : adminReplyEditAuth(replyInfo, { text: replyInfo.text });

        try {
            const res = await endpoint;
            res.data.status === "SUCCESS" &&
                showMessage({
                    title: "返信を編集しました",
                    status: "success",
                });
            const fetchEndpoint = replyInfo.user_id
                ? userReplyShowAuth(replyInfo)
                : adminReplyShowAuth(replyInfo);

            const replyRes = await fetchEndpoint;
            setReplyInfo((prevReplyInfo: replyInfoType) => ({
                ...prevReplyInfo,
                text: replyRes.data.data.text,
            }));
            console.log(res.data.data.text);
            window.history.back();
        } catch (error) {
            console.log(error);
        }
    }, [replyInfo, setReplyInfo, showMessage]);

    return { HandleReplyEdit };
};
