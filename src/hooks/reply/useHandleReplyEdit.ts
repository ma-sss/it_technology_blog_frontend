import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { replyInfoType } from "../../types/replyInfoType";
import { showReplyInfo } from "../../store/showReplyInfo";
import { useMessage } from "../useMessage";

export const useHandleReplyEdit = () => {
    const [replyInfo, setReplyInfo] = useRecoilState(showReplyInfo);

    const { showMessage } = useMessage();

    const HandleReplyEdit = useCallback(() => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        const endpoint = replyInfo.user_id
            ? `http://localhost:3000/api/v1/user/replies/${replyInfo.id}`
            : `http://localhost:3000/api/v1/admin/replies/${replyInfo.id}`;

        axios
            .patch(
                endpoint,
                {
                    text: replyInfo.text,
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
                showMessage({
                    title: "返信を編集しました",
                    status: "success",
                });
                const fetchEndpoint = replyInfo.user_id
                    ? `http://localhost:3000/api/v1/user/replies/${replyInfo.id}`
                    : `http://localhost:3000/api/v1/admin/replies/${replyInfo.id}`;

                axios
                    .get(fetchEndpoint)
                    .then((res) => {
                        setReplyInfo((prevReplyInfo: replyInfoType) => ({
                            ...prevReplyInfo,
                            text: res.data.data.text,
                        }));
                        console.log(res.data.data.text);
                        window.history.back();
                    })
                    .catch((res) => console.log(res));
            })
            .catch((error) => console.log(error));
    }, [
        replyInfo.id,
        replyInfo.text,
        replyInfo.user_id,
        setReplyInfo,
        showMessage,
    ]);

    return { HandleReplyEdit };
};
