import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { showCommentInfo } from "../../store/showCommentInfo";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { adminInfo } from "../../store/adminInfo";
import Cookies from "js-cookie";

export const CommentShowPage: FC = memo(() => {
    const [comment, setComment] = useState<string>();

    const commentInfo = useRecoilValue(showCommentInfo);
    const adminId = useRecoilValue(adminInfo);

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    useEffect(() => {
        // コメント情報が変更された場合にcommentステートを更新
        setComment(commentInfo.text);
    }, [commentInfo.text]);

    const handleEdit = () => {
        axios
            .put(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comment/${commentInfo.id}`,
                {
                    text: comment,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then(() => window.history.back())
            .catch((error) => console.log(error));
    };

    const handleDelete = () => {
        axios
            .delete(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comment/${commentInfo.id}`,
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then(() => window.history.back())
            .catch((error) => console.log(error));
    };

    return (
        <Box p={4}>
            <Input
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                }
            />

            <Flex mt={4} justify="space-between">
                {/* 戻るボタン */}
                <Button
                    onClick={() => window.history.back()}
                    colorScheme="teal"
                >
                    戻る
                </Button>

                {/* 編集ボタン */}
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={handleEdit}
                >
                    編集
                </Button>

                {/* 削除ボタン */}
                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={handleDelete}
                >
                    削除
                </Button>
            </Flex>
        </Box>
    );
});
