import { Dispatch, SetStateAction, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { reply } from "../../types/reply";
import { user } from "../../types/user";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../../store/adminInfo";
import { useMessage } from "../useMessage";
import { adminReplyAuth, userIndexAuth } from "../../Auth";

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
                    // Auth.tsを使いたいが上手く表示できないため使用していない(admin返信時の返信取得)
                    "http://localhost:3000/api/v1/user/replies"
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
