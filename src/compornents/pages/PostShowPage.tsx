import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";

import { showPostInfo } from "../../store/showPostInfo";
import { adminInfo } from "../../store/adminInfo";
import Cookies from "js-cookie";

export const PostShowPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [comments, setComments] = useState<Array<any>>([]);

    const postInfo = useRecoilValue(showPostInfo);
    const adminId = useRecoilValue(adminInfo);

    console.log(comments);

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/v1/user/${postInfo.post_id}/comments`
            )
            .then((res) => setComments(res.data.data))
            .catch((res) => console.log(res));
    }, [setComments, postInfo.post_id]);

    const handleAdminCommentSubmit = useCallback(() => {
        axios
            .post(
                `http://localhost:3000/api/v1/admin/${adminId.id}/comments`,
                {
                    post_id: postInfo.post_id,
                    admin_id: adminId.id,
                    text: text,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                axios
                    .get(
                        `http://localhost:3000/api/v1/user/${postInfo.post_id}/comments`
                    )
                    .then((res) => setComments(res.data.data))
                    .catch((res) => console.log(res));
                setName("");
                setText("");
            })
            .catch((error) => console.log(error));
    }, [adminId.id, text, postInfo.post_id, accessToken, client, uid]);

    const handleUsercommentSubmit = useCallback(() => {
        axios
            .post("http://localhost:3000/api/v1/user/comments", {
                post_id: postInfo.post_id,
                name: name,
                text: text,
            })
            .then((res) => {
                console.log(res);
                axios
                    .get(
                        `http://localhost:3000/api/v1/user/${postInfo.post_id}/comments`
                    )
                    .then((res) => setComments(res.data.data))
                    .catch((res) => console.log(res));
                setName("");
                setText("");
            })
            .catch((error) => console.log(error));
    }, [name, text, postInfo.post_id]);

    return (
        <Box p={4}>
            <VStack align="start" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <Text fontSize="lg">{postInfo.content}</Text>
            </VStack>
            <VStack align="start" spacing={4}>
                <Text fontSize="xl" fontWeight="bold">
                    コメント一覧
                </Text>
                {comments.map((comment, index) =>
                    comment.admin_id ? (
                        <Box key={index} bg="green.100" p={4} borderRadius="md">
                            <p>管理者コメント</p>
                            <Text>{comment.text}</Text>
                        </Box>
                    ) : (
                        <Box key={index} bg="gray.100" p={4} borderRadius="md">
                            <p>ユーザーコメント</p>
                            <Text>{comment.text}</Text>
                        </Box>
                    )
                )}
            </VStack>
            {adminId.id ? (
                <Box p={4}>
                    <p>管理者コメント入力欄</p>
                    <Textarea
                        placeholder="コメント"
                        mb={4}
                        value={text}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setText(e.target.value)
                        }
                    />
                    {}
                    <Button
                        colorScheme="teal"
                        onClick={handleAdminCommentSubmit}
                    >
                        投稿する
                    </Button>
                </Box>
            ) : (
                <Box p={4}>
                    <p>ユーザーコメント入力欄</p>
                    <Input
                        placeholder="名前"
                        mb={4}
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                    <Textarea
                        placeholder="コメント"
                        mb={4}
                        value={text}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setText(e.target.value)
                        }
                    />
                    {}
                    <Button colorScheme="teal" onClick={handleUsercommentSubmit}>
                        投稿する
                    </Button>
                </Box>
            )}
        </Box>
    );
});
