import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { comment } from "../types/comment";
import Cookies from "js-cookie";

type Props = {
    postInfo: { post_id: number; title: string; content: string };
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    setComments: Dispatch<SetStateAction<comment[]>>;
    adminId: {id: number};
};

export const useHandleAdmincommentSubmit = () => {

    const handleAdminCommentSubmit = useCallback((props: Props) => {
        const {postInfo, text, setText, setComments, adminId} = props;

        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        axios
            .post(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comments`,
                {
                    post_id: postInfo.post_id,
                    admin_id: adminId.id,
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
                console.log(res);
                axios
                    .get(
                        `http://localhost:3000/api/v1/user/${postInfo.post_id}/comments`
                    )
                    .then((res) => setComments(res.data.data))
                    .catch((res) => console.log(res));
                setText("");
            })
            .catch((error) => console.log(error));
    }, []);

    return { handleAdminCommentSubmit };
};
