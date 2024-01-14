import { Box, Link, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { comment } from "../../types/comment";

type Props = {
    key: number;
    comment: comment;
    onClick: () => void;
};

export const UserCommentDisplyForAdmin: FC<Props> = memo((props) => {
    const { key, comment, onClick } = props;
    return (
        <Box key={key} bg="gray.100" p={4} borderRadius="md">
            <Link
                onClick={onClick}
            >
                <p>{`ユーザーネーム: ${comment.user_name}`}</p>
                <Text>{comment.text}</Text>
            </Link>
        </Box>
    );
});
