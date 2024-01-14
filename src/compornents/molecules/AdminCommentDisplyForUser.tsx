import { FC, memo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { comment } from "../../types/comment";

type Props = {
    key: number;
    comment: comment;
};

export const AdminCommentDisplyForUser: FC<Props> = memo((props) => {
    const { key, comment, } = props;
    return (
        <Box key={key} bg="green.100" p={4} borderRadius="md">
            <p>管理者コメント</p>
            <Text>{comment.text}</Text>
        </Box>
    );
});
