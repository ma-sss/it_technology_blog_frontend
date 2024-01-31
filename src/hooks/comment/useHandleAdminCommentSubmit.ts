import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { comment } from "../../types/comment";
import { useMessage } from "../useMessage";
import { adminCommentAuth } from "../../Auth";
import { urlOnlyClient } from "../../Client";

type Props = {
    postInfo: { id: number; title: string; content: string };
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    setComments: Dispatch<SetStateAction<comment[]>>;
    setCommentError: Dispatch<SetStateAction<string[]>>;
    adminId: { id: number };
};

export const useHandleAdmincommentSubmit = () => {
    const { showMessage } = useMessage();

    const handleAdminCommentSubmit = useCallback(
        async (props: Props) => {
            const {
                postInfo,
                text,
                setText,
                setComments,
                setCommentError,
                adminId,
            } = props;

            try {
                const res = await adminCommentAuth(adminId, {
                    post_id: postInfo.id,
                    text,
                });
                console.log(res.data.status);
                setCommentError(res.data.data);

                // Client.tsとAuth.tsを使いたいが非同期処理と相性が悪い？せいで上手く表示できないためClient.tsから直接urlを取得(Adminコメント後のcomment取得)
                const commentRes = await axios.get(
                    `${urlOnlyClient}/user/comments`
                );
                setComments(commentRes.data.data);

                res.data.status === "SUCCESS" &&
                    showMessage({
                        title: "コメントしました",
                        status: "success",
                    });
                setText("");
            } catch (error) {
                console.log(error);
            }
        },
        [showMessage]
    );

    return { handleAdminCommentSubmit };
};
