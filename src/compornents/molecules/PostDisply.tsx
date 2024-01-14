import { FC, memo } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

type Props = {
    postInfo: { post_id: number; title: string; content: string };
};

export const PostDisply: FC<Props> = memo((props) => {
    const { postInfo } = props;

    return (
        <Box p={4}>
            <VStack textAlign="center" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <Text fontSize="lg">{postInfo.content}</Text>
            </VStack>
        </Box>
    );
});
