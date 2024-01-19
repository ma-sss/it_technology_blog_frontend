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
            <VStack spacing={4} align="center">
                <Text fontSize="2xl" fontWeight="bold">
                    ようこそ!IT技術ブログへ🚀
                </Text>
                <Text>
                    こちらでは、このウェブアプリ自体の作り方や技術的なトピックを段階ごとに初心者の方でも理解できるように、わかりやすく解説しています。
                </Text>
                <Text fontWeight="bold">仮の投稿やコメントと返信</Text>
                <Text>
                    仮の投稿を3つ用意しています。まずはその仮の投稿にコメントしたり、コメントに対して返信したりして、自由に触ってどのようなブログなのか見てみてください。
                </Text>
                <Text>ここで得られる知識やスキルを活かして、あなたのIT技術が成長することを願っています。一緒にプログラミングの世界を楽しみましょう!!!💻✨</Text>
            </VStack>
            <VStack justify="center">
                <VStack spacing={4} align="start">
                    <Box as="p" p={4} fontSize="3xl" fontWeight="bold">
                        投稿一覧
                    </Box>
                </VStack>

                <VStack align="center" justify="center">
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
