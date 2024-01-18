import { FC, memo, useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../types/post";
import { Box, Link, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { showPostInfo } from "../../store/showPostInfo";
import { useSetRecoilState } from "recoil";

export const Top: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);

    const navigate = useNavigate();

    const setPostInfo = useSetRecoilState(showPostInfo)

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/admin/posts")
            .then((res) => setPosts(res.data.data))
            .catch((res) => console.log(res));
    }, []);

    return (
        <Box p={4}>
            <VStack spacing={4} align="start">
                <Box as="p" fontSize="2xl" fontWeight="bold">
                    投稿一覧
                </Box>
                <VStack align="start">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            fontSize="lg"
                            onClick={() => {
                                setPostInfo({id: post.id, title: post.title, content: post.content})
                                navigate("/post_and_comment_page");    
                            }}
                        >
                            {post.title}
                        </Link>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
});
