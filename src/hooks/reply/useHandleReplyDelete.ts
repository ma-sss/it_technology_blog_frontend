import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showReplyInfo } from "../../store/showReplyInfo";
import { useMessage } from "../useMessage";

export const useHandleReplyDelete = () => {
    const navigate = useNavigate();

    const replyInfo = useRecoilValue(showReplyInfo);

    const { showMessage } = useMessage();

    const HandleReplyDelete = useCallback(
        () => {

            const accessToken = Cookies.get("access-token");
            const client = Cookies.get("client");
            const uid = Cookies.get("uid");

            const endpoint = replyInfo.user_id
                ? `http://localhost:3000/api/v1/user/replies/${replyInfo.id}`
                : `http://localhost:3000/api/v1/admin/replies/${replyInfo.id}`;

            axios
                .delete(endpoint, {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                })
                .then(() => {
                    showMessage({ title: "返信を一件削除しました", status: "warning"})    
                    navigate("/comment_and_reply_page")
                })
                .catch((error) => console.log(error));
        },
        [navigate, showMessage, replyInfo.id, replyInfo.user_id]
    );

    return { HandleReplyDelete };
};
