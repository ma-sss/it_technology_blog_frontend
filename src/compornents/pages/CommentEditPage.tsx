import { ChangeEvent, FC, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useHandleCommentEdit } from "../../hooks/comment/useHandleCommentEdit";
import { useHandleCommentDelete } from "../../hooks/comment/useHandleCommentDelete";
import { showCommentInfo } from "../../store/showCommentInfo";
import { commentInfoType } from "../../types/commentInfoType";
import { adminInfo } from "../../store/adminInfo";

export const CommentEditPage: FC = memo(() => {
    const [commentInfo, setCommentInfo] = useRecoilState(showCommentInfo);
    const adminId = useRecoilValue(adminInfo);

    const navigate = useNavigate();

    const { HandleCommentEdit } = useHandleCommentEdit();
    const { HandleCommentDelete } = useHandleCommentDelete();

    useEffect(() => {
        // adminId.id が null の場合はログインページにリダイレクト
        if (adminId.id === null) {
            alert('ログインしてください'); // ダイアログやモーダルなど適切な形でログイン通知を表示する
            navigate("/sign_in"); // ログインページへリダイレクト
        }
    }, [adminId.id,navigate]);

    return (
        <Box p={4}>
            <Text fontSize="xl" fontWeight="bold">
                コメント設定画面
            </Text>
            {commentInfo.admin_id !== null ? (
                <div>
                    <p>管理者のコメント</p>
                </div>
            ) : (
                <div>
                    <p>{`ユーザーネーム: ${commentInfo.user_name} のコメント`}</p>
                </div>
            )}
            <Input
                value={commentInfo.text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCommentInfo((prevCommentInfo: commentInfoType) => ({
                        ...prevCommentInfo,
                        text: e.target.value,
                    }))
                }
            />

            <Flex mt={4} justify="center">
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => HandleCommentEdit()}
                    mr={4}
                >
                    編集
                </Button>

                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => HandleCommentDelete()}
                >
                    削除
                </Button>
            </Flex>
            <Flex mt={4} justify="center">
                <PrimaryButton onClick={() => window.history.back()}>
                    前のページへ戻る
                </PrimaryButton>
            </Flex>
        </Box>
    );
});
