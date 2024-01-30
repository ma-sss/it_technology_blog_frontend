import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { postInfoType } from "../../types/postInfoType";
import { useMessage } from "../useMessage";
import { postEditAuth, postShowAuth } from "../../Auth";

export const useHandlePostEdit = () => {
    const [postInfo, setPostInfo] = useRecoilState(showPostInfo);
    const { showMessage } = useMessage();

    const HandlePostEdit = useCallback(async () => {
        try {
            await postEditAuth(postInfo, {
                title: postInfo.title,
                content: postInfo.content,
            });

            const updatedPost = await postShowAuth(postInfo);

            // setPostInfoでRecoilの状態を更新
            setPostInfo((prevPostInfo: postInfoType) => ({
                ...prevPostInfo,
                text: updatedPost.data.data.text,
            }));

            updatedPost.data.status === "SUCCESS" &&
                showMessage({
                    title: "投稿を編集しました",
                    status: "success",
                });

            console.log(updatedPost.data.data.text);
            window.history.back();
        } catch (error) {
            console.error("投稿編集エラー:", error);
        }
    }, [setPostInfo, showMessage, postInfo]);

    return { HandlePostEdit };
};
