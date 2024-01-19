import { FC, memo, useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../types/post";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { showPostInfo } from "../../store/showPostInfo";
import { useSetRecoilState } from "recoil";
import { comment } from "../../types/comment";

export const Top: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);
    const [comments, setComments] = useState<Array<comment>>([]);

    const navigate = useNavigate();

    const setPostInfo = useSetRecoilState(showPostInfo);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/admin/posts")
            .then((res) => setPosts(res.data.data))
            .catch((res) => console.log(res));
        axios
            .get("http://localhost:3000/api/v1/user/comments")
            .then((res) => setComments(res.data.data))
            .catch((res) => console.log(res));
    }, []);

    return (
        <Box p={4}>
            <VStack spacing={4} align="start">
                <Box as="p" fontSize="2xl" fontWeight="bold">
                    投稿一覧
                </Box>
                <VStack align="start">
                    {posts.map((post) => {
                        const postComments = comments.filter(
                            (comment) => comment.post_id === post.id
                        ).length;

                        return (
                            <Link
                                key={post.id}
                                fontSize="lg"
                                onClick={() => {
                                    setPostInfo({
                                        id: post.id,
                                        title: post.title,
                                        content: post.content,
                                    });
                                    navigate("/post_and_comment_page");
                                }}
                            >
                                <Flex
                                    align="center"
                                    justifyContent="center"
                                    color="orange.500"
                                >
                                    <Text color="black">{post.title}</Text>
                                    <ChatIcon boxSize={6} ml={4} mr={1} />
                                    <Text fontWeight="bold">
                                        {postComments}
                                    </Text>
                                </Flex>
                            </Link>
                        );
                    })}
                </VStack>
            </VStack>
        </Box>
    );
});
