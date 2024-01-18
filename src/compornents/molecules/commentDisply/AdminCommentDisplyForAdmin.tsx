import { FC, memo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { comment } from "../../../types/comment";

type Props = {
    key: number;
    comment: comment;
    onClick: () => void;
};

export const AdminCommentDisplyForAdmin: FC<Props> = memo((props) => {
    const { key, comment, onClick } = props;
    return (
        <Box
        key={key}
        bg="green.100"
        p={4}
        borderRadius="md"
    >
        <Link
            onClick={onClick}
        >
            <p>管理者コメント</p>
            <Text>{comment.text}</Text>
        </Link>
    </Box>
    );
});
