import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { reply } from "../../types/reply";
import { user } from "../../types/user";
import { useMessage } from "../useMessage";
import { userIndexAuth, userReplyAuth } from "../../Auth";
import { urlOnlyClient } from "../../Client";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    commentInfo: { id: number; user_name: string; text: string };
    setReplies: Dispatch<SetStateAction<reply[]>>;
    setUsers: Dispatch<SetStateAction<user[]>>;
    setNameAndReplyError: Dispatch<SetStateAction<string[]>>;
};

export const useHandleUserReplySubmit = () => {
    const { showMessage } = useMessage();

    const handleUserReplySubmit = useCallback(
        async (props: Props) => {
            const {
                name,
                setName,
                text,
                setText,
                commentInfo,
                setReplies,
                setUsers,
                setNameAndReplyError,
            } = props;

            try {
                const res = await userReplyAuth(commentInfo, {
                    reply: {
                        text: text,
                    },
                    user: {
                        name: name,
                    },
                });
                res.data.reply.status === "SUCCESS" &&
                    showMessage({
                        title: "返信しました",
                        status: "success",
                    });
                console.log(res.data.error);
                setNameAndReplyError(res.data.error);

                const replyRes = await axios.get(
                    // Client.tsとAuth.tsを使いたいが非同期処理と相性が悪い？せいで上手く表示できないためClient.tsから直接urlを取得(userが返信時の返信取得)
                    `${urlOnlyClient}/user/replies`
                );
                setReplies(replyRes.data.data);
                console.log(replyRes.data.data);

                const userRes = await userIndexAuth();
                setUsers(userRes.data.data);
                console.log(userRes.data.data);

                setName("");
                setText("");
            } catch (error) {
                console.log(error);
            }
        },
        [showMessage]
    );

    return { handleUserReplySubmit };
};
