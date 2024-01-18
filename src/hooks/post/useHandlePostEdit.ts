import { useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { postInfoType } from "../../types/postInfoType";

export const useHandlePostEdit = () => {
    const [postInfo, setPostInfo] = useRecoilState(showPostInfo);

    const HandlePostEdit = useCallback(() => {
        const accessToken = Cookies.get("access-token");
        const client = Cookies.get("client");
        const uid = Cookies.get("uid");

        axios
            .patch(
                `http://localhost:3000/api/v1/admin/posts/${postInfo.id}`,
                {
                    title: postInfo.title,
                    content: postInfo.content,
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
                axios
                    .get(
                        `http://localhost:3000/api/v1/admin/posts/${postInfo.id}`
                    )
                    .then((res) => {
                        setPostInfo((prevPostInfo: postInfoType) => ({
                            ...prevPostInfo,
                            text: res.data.data.text,
                        }));
                        console.log(res.data.data.text);
                        window.history.back();
                    })
                    .catch((res) => console.log(res));
            })
            .catch((error) => console.log(error));
    }, [postInfo.id, setPostInfo, postInfo.content, postInfo.title]);

    return { HandlePostEdit };
};
