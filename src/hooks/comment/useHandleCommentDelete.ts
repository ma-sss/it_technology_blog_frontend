import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { showCommentInfo } from "../../store/showCommentInfo";
import { useRecoilValue } from "recoil";

export const useHandleCommentDelete = () => {
    const navigate = useNavigate();

    const commentInfo = useRecoilValue(showCommentInfo);

    const HandleCommentDelete = useCallback(() => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        const endpoint = commentInfo.user_id
            ? `http://localhost:3000/api/v1/user/comments/${commentInfo.id}`
            : `http://localhost:3000/api/v1/admin/comments/${commentInfo.id}`;

        axios
            .delete(endpoint, {
                headers: {
                    "access-token": accessToken!,
                    client: client!,
                    uid: uid!,
                },
            })
            .then(() => navigate("/post_and_comment_page"))
            .catch((error) => console.log(error));
    }, [navigate, commentInfo]);

    return { HandleCommentDelete };
};
