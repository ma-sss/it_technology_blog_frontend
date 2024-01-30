import { FC, memo } from "react";
import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import parse from "html-react-parser";

import { adminInfo } from "../../store/adminInfo";

type Props = {
    postInfo: { id: number; title: string; content: string };
};

export const PostDisply: FC<Props> = memo((props) => {
    const adminId = useRecoilValue(adminInfo);
    const { postInfo } = props;

    const navigate = useNavigate();

    return adminId.id !== null ? (
        <Link p={12} onClick={() => navigate("/post_edit_page")}>
            <VStack textAlign="center" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <div>{parse(postInfo.content)}</div>
            </VStack>
        </Link>
    ) : (
        <Box p={12}>
            <VStack textAlign="center" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <Text fontSize="lg">{postInfo.content}</Text>
            </VStack>
        </Box>
    );
});
