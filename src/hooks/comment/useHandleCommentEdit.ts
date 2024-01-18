import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { showCommentInfo } from "../../store/showCommentInfo";
import { commentInfoType } from "../../types/commentInfoType";

export const useHandleCommentEdit = () => {
    const [commentInfo, setCommentInfo] = useRecoilState(showCommentInfo);

    const HandleCommentEdit = useCallback(() => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        const endpoint = commentInfo.user_id
            ? `http://localhost:3000/api/v1/user/comments/${commentInfo.id}`
            : `http://localhost:3000/api/v1/admin/comments/${commentInfo.id}`;

        axios
            .patch(
                endpoint,
                {
                    text: commentInfo.text,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then(() => {
                const fetchEndpoint = commentInfo.user_id
                    ? `http://localhost:3000/api/v1/user/comments/${commentInfo.id}`
                    : `http://localhost:3000/api/v1/admin/comments/${commentInfo.id}`;

                axios
                    .get(fetchEndpoint)
                    .then((res) => {
                        console.log(res)
                        setCommentInfo((prevCommentInfo: commentInfoType) => ({
                            ...prevCommentInfo,
                            text: res.data.data.text
                        }));
                        window.history.back();
                    })
                    .catch((res) => console.log(res));
            })
            .catch((error) => console.log(error));
    }, [commentInfo.id, commentInfo.text, commentInfo.user_id, setCommentInfo]);

    return { HandleCommentEdit };
};
