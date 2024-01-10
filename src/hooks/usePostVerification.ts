import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { showPostState } from "../store/showPostState";

export const usePostVerification = () => {
    const navigate = useNavigate();

    const setPostInfo = useSetRecoilState(showPostState);

    const Verification = useCallback(
        (post_id: number) => {
            axios
                .get(`http://localhost:3000/api/v1/admin/posts/${post_id}`)
                .then((res) => {
                    console.log(res.data.data);
                    setPostInfo({post_id: res.data.data.id, title: res.data.data.title, content: res.data.data.content});
                    navigate("/post_show_page");
                })
                .catch((res) => console.log(res));
        },
        [setPostInfo, navigate]
    );
    return { Verification };
};
