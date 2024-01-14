import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import { showCommentInfo } from "../store/showCommentInfo";

export const useFetchComment = () => {
    const navigate = useNavigate();

    const setCommentInfo = useSetRecoilState(showCommentInfo);

    const FetchComment = (
        user_id: number,
        user_name: string,
        comment_id: number
    ) => {
        axios
            .get(
                `http://localhost:3000/api/v1/user/${user_id}/comment/${comment_id}`
            )
            .then((res) => {
                setCommentInfo({
                    id: res.data.data.id,
                    user_name: res.data.data.user_name,
                    text: res.data.data.text,
                });
            })
            .catch((error) => console.log(error));
    };
    return { FetchComment };
};
