import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
    comment: string;
    adminId: {id: number};
    commentInfo: { id: null; user_name: ""; text: "" };
};

export const useHandleCommentEdit = () => {
    const HandleCommentEdit = useCallback((props: Props) => {
        const { comment, adminId, commentInfo } = props;

        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        axios
            .put(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comment/${commentInfo.id}`,
                {
                    text: comment,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then(() => window.history.back())
            .catch((error) => console.log(error));
    }, []);

    return { HandleCommentEdit };
};
