import { FC, memo, useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../types/post";
import {
    Box,
    Flex,
    Link,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { showPostInfo } from "../../store/showPostInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { comment } from "../../types/comment";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { NumberAndSpeechBubbble } from "../molecules/NumberAndSpeechBubble";
import { urlOnlyClient } from "../../Client";

export const PostListPage: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);
    const [comments, setComments] = useState<Array<comment>>([]);

    const postInfo = useRecoilValue(showPostInfo);

    const navigate = useNavigate();

    const setPostInfo = useSetRecoilState(showPostInfo);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Client.tsとAuth.tsを使いたいが非同期処理と相性が悪い？せいで上手く表示できないためClient.tsから直接urlを取得(postを全て取得)
                const postsRes = await axios.get(
                    `${urlOnlyClient}/admin/posts`
                );
                setPosts(postsRes.data.data);

                // Client.tsとAuth.tsを使いたいが非同期処理と相性が悪い？せいで上手く表示できないためClient.tsから直接urlを取得(commentを全て取得)
                const commentsRes = await axios.get(
                    `${urlOnlyClient}/user/comments`
                );
                setComments(commentsRes.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
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
                                        <Text
                                            color="black"
                                            fontWeight="bold"
                                            isTruncated
                                        >
                                            {post.title}
                                        </Text>
                                        <Flex
                                            justifyContent="space-between"
                                            mt={2}
                                        >
                                            <NumberAndSpeechBubbble color="orange">
                                                {postComments}
                                            </NumberAndSpeechBubbble>
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
