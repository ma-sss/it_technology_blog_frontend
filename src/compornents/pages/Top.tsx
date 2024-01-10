import { FC, memo, useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../types/post";
import { Box, Link, VStack } from "@chakra-ui/react";
import { usePostVerification } from "../../hooks/usePostVerification";

export const Top: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);

    const { Verification } = usePostVerification();

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
                            onClick={() => Verification(post.id)}
                        >
                            {post.title}
                        </Link>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
});
