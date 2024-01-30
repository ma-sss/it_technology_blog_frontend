import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { comment } from "../../types/comment";
import { user } from "../../types/user";
import { useMessage } from "../useMessage";
import { userCommentAuth, userIndexAuth } from "../../Auth";

type Props = {
    postInfo: { id: number; title: string; content: string };
    name: string;
    text: string;
    setComments: Dispatch<SetStateAction<comment[]>>;
    setUsers: Dispatch<SetStateAction<user[]>>;
    setNameAndCommentError: Dispatch<SetStateAction<string[]>>;
    setName: Dispatch<SetStateAction<string>>;
    setText: Dispatch<SetStateAction<string>>;
};

export const useHandleUserCommentSubmit = () => {
    const { showMessage } = useMessage();

    const handleUserCommentSubmit = useCallback(
        async (props: Props) => {
            const {
                postInfo,
                name,
                setName,
                text,
                setText,
                setComments,
                setNameAndCommentError,
                setUsers,
            } = props;

            try {
                const res = await userCommentAuth({
                    comment: {
                        text: text,
                        post_id: postInfo.id,
                    },
                    user: {
                        name: name,
                    },
                });
                setNameAndCommentError(res.data.error);

                // Auth.tsを使いたいが上手く表示できないため使用していない(userコメント時のcomment取得)
                const commentRes = await axios.get(
                    "http://localhost:3000/api/v1/user/comments"
                );
                setComments(commentRes.data.data);

                const userRes = await userIndexAuth();
                setUsers(userRes.data.data);

                console.log(commentRes.data.data, userRes.data.data);

                res.data.comment?.status === "SUCCESS" &&
                    showMessage({
                        title: "コメントしました",
                        status: "success",
                    });
                setName("");
                setText("");
            } catch (error) {
                console.log(error);
            }
        },
        [showMessage]
    );

    return { handleUserCommentSubmit };
};
