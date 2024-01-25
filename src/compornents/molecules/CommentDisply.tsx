import { FC, ReactNode, memo } from "react";
import { Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { user } from "../../types/user";
import { showCommentInfo } from "../../store/showCommentInfo";
import { comment } from "../../types/comment";
import { NumberAndSpeechBubbble } from "./NumberAndSpeechBubble";
import { reply } from "../../types/reply";
import { adminInfo } from "../../store/adminInfo";

type Props = {
    color: string;
    children: ReactNode;
    users: Array<user>;
    replies: Array<reply>;
    comment: comment;
};

export const CommentDisply: FC<Props> = memo((props) => {
    const { color, children, users, replies, comment } = props;

    const adminId = useRecoilValue(adminInfo);
    const setCommentInfo = useSetRecoilState(showCommentInfo);

    const navigate = useNavigate();

    const commentReplies = replies.filter(
        (reply) => reply.comment_id === comment.id
    ).length;

    return (
        <Link
            m={1}
            style={{
                border: `3px solid ${color}`,
                padding: "8px",
                borderRadius: "4px",
                display: "inline-block",
            }}
            onClick={() => {
                //user.idとcomment.user_idが同じならsetCommentInfoにcommentedUser.idを入れる
                const commentedUser = users.find(
                    (user) => user.id === comment.user_id
                );
                if (commentedUser) {
                    setCommentInfo({
                        id: comment.id,
                        user_id: comment.user_id,
                        admin_id: null,
                        user_name: commentedUser.name,
                        text: comment.text,
                    });
                } else {
                    setCommentInfo({
                        id: comment.id,
                        user_id: null,
                        admin_id: adminId.id,
                        user_name: "",
                        text: comment.text,
                    });
                }
                navigate("/comment_and_reply_page");
            }}
        >
            {children}
            <p>{`コメント内容: ${comment.text}`}</p>
            <NumberAndSpeechBubbble color={color}>
                {commentReplies}
            </NumberAndSpeechBubbble>
        </Link>
    );
});
