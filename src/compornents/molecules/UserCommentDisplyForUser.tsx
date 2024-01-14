import { Box, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { comment } from "../../types/comment";

type Props = {
    key: number;
    comment: comment;
};

export const UserCommentDisplyForUser: FC<Props> = memo((props) => {
    const { key, comment } = props;
    return (
        <Box key={key} bg="gray.100" p={4} borderRadius="md">
            <p>{`ユーザーネーム: ${comment.user_name}`}</p>
            <Text>{comment.text}</Text>
        </Box>
    );
});
