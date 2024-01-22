import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Link, Text, VStack } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import { showCommentInfo } from "../../store/showCommentInfo";
import { reply } from "../../types/reply";

export const PostAndCommentPage: FC = memo(() => {
    const [commentError, setCommentError] = useState<string[]>([]);
    const [nameAndCommentError, setNameAndCommentError] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const [comments, setComments] = useState<Array<comment>>([]);
    const [replies, setReplies] = useState<Array<reply>>([]);
    const [users, setUsers] = useState<Array<user>>([]);

    const setCommentInfo = useSetRecoilState(showCommentInfo);
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
                const commentReplies = replies.filter(
                    (reply) => reply.comment_id === comment.id
                ).length;

                return (
                    <div key={comment.id}>
                        {comment.post_id === postInfo.id && (
                            <div>
                                {comment.user_id ? ( // ユーザーコメントの場合
                                    <Link
                                        m={1}
                                        style={{
                                            border: "3px solid orange",
                                            padding: "8px",
                                            borderRadius: "10px",
                                            display: "inline-block",
                                        }}
                                        onClick={() => {
                                            //user.idとcomment.user_idが同じならsetCommentInfoにcommentedUser.idを入れる
                                            const commentedUser = users.find(
                                                (user) =>
                                                    user.id === comment.user_id
                                            );
                                            if (commentedUser) {
                                                navigate(
                                                    "/comment_and_reply_page"
                                                );
                                                setCommentInfo({
                                                    id: comment.id,
                                                    user_id: comment.user_id,
                                                    admin_id: null,
                                                    user_name:
                                                        commentedUser.name,
                                                    text: comment.text,
                                                });
                                            }
                                        }}
                                    >
                                        <Text fontWeight="bold">{`ユーザーネーム: ${
                                            users.find(
                                                (user) =>
                                                    user.id === comment.user_id
                                            )?.name
                                        }`}</Text>
                                        <p>{`コメント内容: ${comment.text}`}</p>
                                        <Flex
                                            align="center"
                                            justifyContent="center"
                                            color="orange.500"
                                        >
                                            <ChatIcon
                                                boxSize={6}
                                                ml={4}
                                                mr={1}
                                            />
                                            <Text fontWeight="bold">
                                                {commentReplies}
                                            </Text>
                                        </Flex>
                                    </Link>
                                ) : comment.admin_id !== null ? ( // 管理者コメントの場合
                                    <Link
                                        m={1}
                                        style={{
                                            border: "3px solid teal",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                        }}
                                        onClick={() => {
                                            navigate("/comment_and_reply_page");
                                            setCommentInfo({
                                                id: comment.id,
                                                user_id: null,
                                                admin_id: comment.admin_id,
                                                user_name: "",
                                                text: comment.text,
                                            });
                                        }}
                                    >
                                        <Text fontWeight="bold">管理者</Text>
                                        <p>{`コメント内容: ${comment.text}`}</p>
                                        <Flex
                                            align="center"
                                            justifyContent="center"
                                            color="teal"
                                        >
                                            <ChatIcon
                                                boxSize={6}
                                                ml={4}
                                                mr={1}
                                            />
                                            <Text fontWeight="bold">
                                                {commentReplies}
                                            </Text>
                                        </Flex>
                                    </Link>
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
