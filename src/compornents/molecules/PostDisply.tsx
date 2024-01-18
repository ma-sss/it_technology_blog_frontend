import { FC, memo } from "react";
import { Link, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
    postInfo: { id: number; title: string; content: string };
};

export const PostDisply: FC<Props> = memo((props) => {
    const { postInfo } = props;

    const navigate = useNavigate();

    return (
        <Link p={4}>
            <VStack
                onClick={() => navigate("/post_edit_page")}
                textAlign="center"
                spacing={4}
            >
                <Text fontSize="2xl" fontWeight="bold">
                    {postInfo.title}
                </Text>
                <Text fontSize="lg">{postInfo.content}</Text>
            </VStack>
        </Link>
    );
});
