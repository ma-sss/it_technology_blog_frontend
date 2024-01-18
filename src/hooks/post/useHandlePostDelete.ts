import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";


export const useHandlePostDelete = () => {
    const navigate = useNavigate();

    const postInfo = useRecoilValue(showPostInfo);

    const HandlePostDelete = useCallback(
        () => {

            const accessToken = Cookies.get("access-token");
            const client = Cookies.get("client");
            const uid = Cookies.get("uid");

            axios
                .delete(`http://localhost:3000/api/v1/admin/posts/${postInfo.id}`, {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                })
                .then(() => navigate("/"))
                .catch((error) => console.log(error));
        },
        [navigate, postInfo.id]
    );

    return { HandlePostDelete };
};
