import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { reply } from "../../types/reply";
import { user } from "../../types/user";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    commentInfo: { id: number; user_name: string; text: string };
    setReplies: Dispatch<SetStateAction<reply[]>>;
    setUsers: Dispatch<SetStateAction<user[]>>;
};

export const useHandleUserReplySubmit = () => {
    const handleUserReplySubmit = useCallback((props: Props) => {
        const { name, setName, text, setText, commentInfo, setReplies, setUsers } = props;

        axios
            .post(
                `http://localhost:3000/api/v1/user/comment/${commentInfo.id}/reply`,
                {
                    name: name,
                    text: text,
                }
            )
            .then((res) => {
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
    }, []);

    return { handleUserReplySubmit };
};
