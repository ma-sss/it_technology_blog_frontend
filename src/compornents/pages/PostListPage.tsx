import { FC, memo, useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../types/post";
import {
    Box,
    Flex,
    HStack,
    Link,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { showPostInfo } from "../../store/showPostInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { comment } from "../../types/comment";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const PostListPage: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);
    const [comments, setComments] = useState<Array<comment>>([]);

    const postInfo = useRecoilValue(showPostInfo);

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

    console.log(postInfo.category);
    console.log(posts);

    return (
        <Box p={4}>
            <VStack justify="center">
                <VStack spacing={4} align="start">
                    <Box as="p" p={4} fontSize="3xl" fontWeight="bold">
                        投稿カテゴリー一覧
                    </Box>
                </VStack>
                <Wrap justify="center" p={{ base: 4, md: 10 }}>
                    {posts
                        .filter((post) => post.category === postInfo.category)
                        .map((post) => {
                            const postComments = comments.filter(
                                (comment) => comment.post_id === post.id
                            ).length;
                            return (
                                <WrapItem key={post.id} maxW={270}>
                                    <Link
                                        m={1}
                                        p={4}
                                        border="2px"
                                        borderColor="teal.500"
                                        borderRadius="lg"
                                        width="100%"
                                        key={post.id}
                                        fontSize="lg"
                                        onClick={() => {
                                            setPostInfo({
                                                id: post.id,
                                                category: postInfo.category,
                                                title: post.title,
                                                content: post.content,
                                            });
                                            navigate("/post_and_comment_page");
                                        }}
                                    >
                                        <Text color="black" fontWeight="bold" isTruncated>
                                            {post.title}
                                        </Text>
                                        <Flex
                                            justifyContent="space-between"
                                            mt={2}
                                        >
                                            <Text
                                                mr={3}
                                                color="orange.500"
                                                fontWeight="bold"
                                            >
                                                <ChatIcon
                                                    boxSize={6}
                                                    ml={1}
                                                    mr={1}
                                                />
                                                {postComments}{" "}
                                            </Text>
                                            {post.updated_at && (
                                                <Text>
                                                    {`更新日: ${
                                                        new Date(
                                                            post.updated_at
                                                        )
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }`}
                                                </Text>
                                            )}
                                        </Flex>
                                    </Link>
                                </WrapItem>
                            );
                        })}
                </Wrap>
                <PrimaryButton onClick={() => navigate("/")}>
                    戻る
                </PrimaryButton>
            </VStack>
        </Box>
    );
});
