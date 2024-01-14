import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { showCommentInfo } from "../../store/showCommentInfo";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { adminInfo } from "../../store/adminInfo";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useHandleCommentEdit } from "../../hooks/useHandleCommentEdit";
import { useHandleCommentDelete } from "../../hooks/useHandleCommentDelete";

export const CommentShowPage: FC = memo(() => {
    const [comment, setComment] = useState<string>("");

    const commentInfo = useRecoilValue(showCommentInfo);
    const adminId = useRecoilValue(adminInfo);

    const { HandleCommentEdit } = useHandleCommentEdit();
    const { HandleCommentDelete } = useHandleCommentDelete();

    useEffect(() => {
        // コメント情報が変更された場合にcommentステートを更新
        setComment(commentInfo.text);
    }, [commentInfo.text]);

    return (
        <Box p={4}>
            <Text fontSize="xl" fontWeight="bold">
                コメント設定画面
            </Text>
            <Input
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                }
            />

            <Flex mt={4} justify="center">
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => HandleCommentEdit({ comment, adminId, commentInfo })}
                    mr={4}
                >
                    編集
                </Button>

                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => HandleCommentDelete({comment, adminId, commentInfo})}
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
