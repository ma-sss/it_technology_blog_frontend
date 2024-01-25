import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { reply } from "../../types/reply";
import { user } from "../../types/user";
import { useMessage } from "../useMessage";

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

    const handleUserReplySubmit = useCallback((props: Props) => {
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

        axios
            .post(
                `http://localhost:3000/api/v1/user/comment/${commentInfo.id}/reply`,
                {
                    reply: {
                        text: text,
                    },
                    user: {
                        name: name,
                    },
                }
            )
            .then((res) => {
                showMessage({
                    title: "返信しました",
                    status: "success",
                });
                console.log(res.data.error);
                setNameAndReplyError(res.data.error);
                axios
                    .get(`http://localhost:3000/api/v1/user/replies`)
                    .then((res) => {
                        setReplies(res.data.data);
                        console.log(res.data.data);
                    })
                    .catch((error) => console.log(error));
                axios
                    .get(`http://localhost:3000/api/v1/users`)
                    .then((res) => setUsers(res.data.data))
                    .catch((res) => console.log(res));
                setName("");
                setText("");
            })
            .catch((error) => console.log(error));
    }, [showMessage]);

    return { handleUserReplySubmit };
};
