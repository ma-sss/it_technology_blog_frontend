import { FC, memo, useEffect, useState } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { showPostInfo } from "../../store/showPostInfo";
import { adminInfo } from "../../store/adminInfo";
import { comment } from "../../types/comment";
import { AdminCommentInput } from "../organisms/commentInput/AdminCommentInput";
import { UserCommentInput } from "../organisms/commentInput/UserCommentInput";
import { useHandleUserCommentSubmit } from "../../hooks/comment/useHandleUsercommentSubmit";
import { useHandleAdmincommentSubmit } from "../../hooks/comment/useHandleAdminCommentSubmit";
import { PostDisply } from "../molecules/PostDisply";
import { user } from "../../types/user";
import { reply } from "../../types/reply";
import { CommentDisply } from "../molecules/CommentDisply";

export const PostAndCommentPage: FC = memo(() => {
    const [commentError, setCommentError] = useState<string[]>([]);
    const [nameAndCommentError, setNameAndCommentError] = useState<string[]>(
        []
    );
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const [comments, setComments] = useState<Array<comment>>([]);
    const [replies, setReplies] = useState<Array<reply>>([]);
    const [users, setUsers] = useState<Array<user>>([]);

    const postInfo = useRecoilValue(showPostInfo);
    const adminId = useRecoilValue(adminInfo);

    const { handleAdminCommentSubmit } = useHandleAdmincommentSubmit();
    const { handleUserCommentSubmit } = useHandleUserCommentSubmit();

    // commentとuserを全て持ってくる
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/user/comments`)
            .then((res) => setComments(res.data.data))
            .catch((error) => console.log(error));
        axios
            .get(`http://localhost:3000/api/v1/user/replies`)
            .then((res) => setReplies(res.data.data))
            .catch((res) => console.log(res));
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => setUsers(res.data.data))
            .catch((error) => console.log(error));
    }, [setComments, postInfo.id]);

    return (
        <>
            <PostDisply postInfo={postInfo} />
            <VStack textAlign="center" spacing={4}>
                <Text pb={3} fontSize="xl" fontWeight="bold">
                    コメント一覧
                </Text>
            </VStack>
            {comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        {comment.post_id === postInfo.id && (
                            <div>
                                {comment.user_id ? ( // ユーザーコメントの場合
                                    <CommentDisply
                                        color="orange"
                                        users={users}
                                        replies={replies}
                                        comment={comment}
                                    >
                                        <Text fontWeight="bold">{`ユーザーネーム: ${
                                            users.find(
                                                (user) =>
                                                    user.id === comment.user_id
                                            )?.name
                                        }`}</Text>
                                    </CommentDisply>
                                ) : comment.admin_id !== null ? ( // 管理者コメントの場合
                                    <CommentDisply
                                        color="teal"
                                        users={users}
                                        replies={replies}
                                        comment={comment}
                                    >
                                        <Text fontWeight="bold">管理者</Text>
                                    </CommentDisply>
                                ) : null}
                            </div>
                        )}
                    </div>
                );
            })}

            {adminId.id ? (
                <AdminCommentInput
                    text={text}
                    setText={setText}
                    commentError={commentError}
                    onClick={() =>
                        handleAdminCommentSubmit({
                            postInfo,
                            text,
                            setText,
                            setComments,
                            setCommentError,
                            adminId,
                        })
                    }
                />
            ) : (
                <UserCommentInput
                    name={name}
                    setName={setName}
                    text={text}
                    setText={setText}
                    nameAndCommentError={nameAndCommentError}
                    onClick={() =>
                        handleUserCommentSubmit({
                            postInfo,
                            name,
                            text,
                            setComments,
                            setUsers,
                            setName,
                            setText,
                            setNameAndCommentError,
                        })
                    }
                />
            )}
        </>
    );
});
