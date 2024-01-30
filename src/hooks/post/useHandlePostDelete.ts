import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { useMessage } from "../useMessage";
import { postDeleteAuth } from "../../Auth";

export const useHandlePostDelete = () => {
    const navigate = useNavigate();

    const { showMessage } = useMessage();

    const postInfo = useRecoilValue(showPostInfo);

    const HandlePostDelete = useCallback(async () => {
        try {
            const res = await postDeleteAuth(postInfo);
            res.data.status === "SUCCESS" &&
                showMessage({
                    title: "投稿を一件削除しました",
                    status: "warning",
                });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }, [navigate, showMessage, postInfo]);

    return { HandlePostDelete };
};
