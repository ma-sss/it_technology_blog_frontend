import { Box, Link, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { user } from "../../../types/user";
import { comment } from "../../../types/comment";

type Props = {
    key: number;
    user: user;
    comment: comment;
    onClick: () => void;
};

export const UserCommentDisplyForUser: FC<Props> = memo((props) => {
    const { key, user, comment, onClick } = props;
    return (
        <Link
            as={Box}
            key={key}
            bg="gray.100"
            p={4}
            borderRadius="md"
            _hover={{ textDecoration: "none", bg: "gray.200" }}
            onClick={onClick}
        >
            <p>{`ユーザーネーム: ${user.name}`}</p>
            <Text>{comment.text}</Text>
        </Link>
    );
});
