import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { comment } from "../../types/comment";
import { user } from "../../types/user";
import { useMessage } from "../useMessage";

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

    const handleUserCommentSubmit = useCallback((props: Props) => {
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

        axios
            .post("http://localhost:3000/api/v1/user/comments", {
                comment: {
                    post_id: postInfo.id,
                    text: text,
                },
                user: {
                    name: name,
                },
            })
            .then((res) => {
                showMessage({
                    title: "コメントしました",
                    status: "success",
                });
                setNameAndCommentError(res.data.error);
                axios
                    .get(`http://localhost:3000/api/v1/user/comments`)
                    .then((res) => setComments(res.data.data))
                    .catch((res) => console.log(res));
                axios
                    .get(`http://localhost:3000/api/v1/users`)
                    .then((res) => setUsers(res.data.data))
                    .catch((res) => console.log(res));
                setName("");
                setText("");
            })
            .catch((error) => console.log(error));
    }, [showMessage]);

    return { handleUserCommentSubmit };
};
