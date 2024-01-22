import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { comment } from "../../types/comment";
import Cookies from "js-cookie";

type Props = {
    postInfo: { id: number; title: string; content: string };
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    setComments: Dispatch<SetStateAction<comment[]>>;
    setCommentError: Dispatch<SetStateAction<string[]>>;
    adminId: {id: number};
};

export const useHandleAdmincommentSubmit = () => {

    const handleAdminCommentSubmit = useCallback((props: Props) => {
        const {postInfo, text, setText, setComments, setCommentError, adminId} = props;

        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        axios
            .post(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comment`,
                {
                    post_id: postInfo.id,
                    text: text,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        "client": client!,
                        "uid": uid!,
                    },
                }
            )
            .then((res) => {
                console.log(res.data.data);
                setCommentError(res.data.data);
                axios
                    .get(
                        `http://localhost:3000/api/v1/user/comments`
                    )
                    .then((res) => setComments(res.data.data))
                    .catch((res) => console.log(res));
                    setText("");
            })
            .catch((error) => console.log(error));
    }, []);

    return { handleAdminCommentSubmit };
};
