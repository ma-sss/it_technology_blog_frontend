import { FC, memo } from "react";
import { Box, Link, Text } from "@chakra-ui/react";

import { comment } from "../../../types/comment";

type Props = {
    key: number;
    comment: comment;
    onClick: () => void;
};

export const AdminCommentDisplyForUser: FC<Props> = memo((props) => {
    const { key, comment, onClick } = props;
    return (
        <Link
            as={Box}
            key={key}
            bg="green.100"
            p={4}
            borderRadius="md"
            _hover={{ textDecoration: "none", bg: "green.200" }}
            onClick={onClick}
        >
            <Text>管理者コメント</Text>
            <Text>{comment.text}</Text>
        </Link>
    );
});
