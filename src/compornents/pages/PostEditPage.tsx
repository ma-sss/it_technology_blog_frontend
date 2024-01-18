import { ChangeEvent, memo, useEffect } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import { showPostInfo } from "../../store/showPostInfo";
import { postInfoType } from "../../types/postInfoType";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useHandlePostDelete } from "../../hooks/post/useHandlePostDelete";
import { useHandlePostEdit } from "../../hooks/post/useHandlePostEdit";
import { adminInfo } from "../../store/adminInfo";
import { useNavigate } from "react-router-dom";

export const PostEditPage = memo(() => {
    const adminId = useRecoilValue(adminInfo);
    const [postInfo, setPostInfo] = useRecoilState(showPostInfo);

    const navigate = useNavigate();

    const { HandlePostEdit } = useHandlePostEdit();
    const { HandlePostDelete } = useHandlePostDelete();

    useEffect(() => {
        // adminId.id が null の場合はログインページにリダイレクト
        if (adminId.id === null) {
            alert('ログインしてください'); // ダイアログやモーダルなど適切な形でログイン通知を表示する
            navigate("/sign_in"); // ログインページへリダイレクト
        }
    }, [adminId.id,navigate]);

    return (
        <>
            <Text fontSize="xl" fontWeight="bold">
                投稿編集画面
            </Text>

            <Input
                value={postInfo.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPostInfo((prevpostInfo: postInfoType) => ({
                        ...prevpostInfo,
                        title: e.target.value,
                    }))
                }
            />

            <Input
                value={postInfo.content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPostInfo((prevpostInfo: postInfoType) => ({
                        ...prevpostInfo,
                        content: e.target.value,
                    }))
                }
            />

            <Flex mt={4} justify="center">
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => HandlePostEdit()}
                    mr={4}
                >
                    編集
                </Button>

                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => HandlePostDelete()}
                >
                    削除
                </Button>
            </Flex>
            <Flex mt={4} justify="center">
                <PrimaryButton onClick={() => window.history.back()}>
                    前のページへ戻る
                </PrimaryButton>
            </Flex>
        </>
    );
});
