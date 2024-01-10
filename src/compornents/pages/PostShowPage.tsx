import { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import { showPostState } from "../../store/showPostState";
import { Box, Text, VStack } from "@chakra-ui/react";

export const PostShowPage: FC = memo(() => {
    const postInfo = useRecoilValue(showPostState);
    return (
        <Box p={4}>
            <VStack align="start" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <Text fontSize="lg">{postInfo.content}</Text>
            </VStack>
        </Box>
    );
});
