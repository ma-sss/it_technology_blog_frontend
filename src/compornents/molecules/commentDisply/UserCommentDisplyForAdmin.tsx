import { Box, Link, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { comment } from "../../../types/comment";
import { user } from "../../../types/user";

type Props = {
    key: number;
    user: user;
    comment: comment;
    onClick: () => void;
};

export const UserCommentDisplyForAdmin: FC<Props> = memo((props) => {
    const { key, user, comment, onClick } = props;
    return (
        <Box key={key} bg="gray.100" p={4} borderRadius="md">
            <Link
                onClick={onClick}
            >
                <p>{`ユーザーネーム: ${user.name}`}</p>
                <Text>{comment.text}</Text>
            </Link>
        </Box>
    );
});
