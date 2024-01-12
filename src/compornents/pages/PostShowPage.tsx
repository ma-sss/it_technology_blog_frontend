import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Box, Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";

import { showPostInfo } from "../../store/showPostInfo";

export const PostShowPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [userComments, setUserComments] = useState<Array<any>>([]);

    const postInfo = useRecoilValue(showPostInfo);

    const navigate = useNavigate();

    console.log(postInfo);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/user/comments")
            .then((res) => setUserComments(res.data.data))
            .catch((res) => console.log(res));
    }, [setUserComments]);

    const handleCommentSubmit = useCallback(() => {
        axios
            .post("http://localhost:3000/api/v1/user/comments", {
                name: name,
                text: text,
            })
            .then((res) => {
                console.log(res);
                navigate("/post_show_page");
            })
            .catch((error) => console.log(error));
    }, [name, text, navigate]);

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
                {userComments.map((usercomment, index) => (
                    <Box key={index} bg="gray.100" p={4} borderRadius="md">
                        <Text>{usercomment.text}</Text>
                    </Box>
                ))}
            </VStack>
            <Box p={4}>
                <p>コメント入力欄</p>
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
                <Button colorScheme="teal" onClick={handleCommentSubmit}>
                    投稿する
                </Button>
            </Box>
        </Box>
    );
});
