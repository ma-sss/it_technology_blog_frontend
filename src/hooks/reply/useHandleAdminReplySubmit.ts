import { Dispatch, SetStateAction, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { reply } from "../../types/reply";
import { user } from "../../types/user";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../../store/adminInfo";
import { useMessage } from "../useMessage";
import { adminReplyAuth, userIndexAuth } from "../../Auth";
import { urlOnlyClient } from "../../Client";

type Props = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    commentInfo: { id: number; user_name: string; text: string };
    setReplies: Dispatch<SetStateAction<reply[]>>;
    setUsers: Dispatch<SetStateAction<user[]>>;
    setReplyError: Dispatch<SetStateAction<string[]>>;
};

export const useHandleAdminReplySubmit = () => {
    const adminId = useRecoilValue(adminInfo);
    const { showMessage } = useMessage();

    const handleAdminReplySubmit = useCallback(
        async (props: Props) => {
            const {
                text,
                setText,
                commentInfo,
                setReplies,
                setUsers,
                setReplyError,
            } = props;

            try {
                const res = await adminReplyAuth(adminId, commentInfo, {
                    text,
                });
                res.data.status === "SUCCESS" &&
                    showMessage({
                        title: "返信しました",
                        status: "success",
                    });
                setReplyError(res.data.errors);

                const replyRes = await axios.get(
                    // Client.tsとAuth.tsを使いたいが非同期処理と相性が悪い？せいで上手く表示できないためClient.tsから直接urlを取得(admin返信時の返信取得)
                    `${urlOnlyClient}/user/replies`
                );
                setReplies(replyRes.data.data);
                console.log(res.data.data);

                const userRes = await userIndexAuth();
                setUsers(userRes.data.data);
                
                setText("");
            } catch (error) {
                console.log(error);
            }
        },
        [adminId, showMessage]
    );
    return { handleAdminReplySubmit };
};
