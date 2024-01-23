import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { useMessage } from "../useMessage";

export const useHandlePostDelete = () => {
    const navigate = useNavigate();

    const { showMessage } = useMessage();

    const postInfo = useRecoilValue(showPostInfo);

    const HandlePostDelete = useCallback(() => {
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
            .then(() => {
                showMessage({ title: "投稿を一件削除しました", status: "warning" });
                navigate("/");
            })
            .catch((error) => console.log(error));
    }, [navigate, postInfo.id, showMessage]);

    return { HandlePostDelete };
};
