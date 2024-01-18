import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Link, Text, VStack } from "@chakra-ui/react";
import { user } from "../../types/user";
import { showCommentInfo } from "../../store/showCommentInfo";

export const PostAndCommentPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const [comments, setComments] = useState<Array<comment>>([]);
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
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => setUsers(res.data.data))
            .catch((error) => console.log(error));
    }, [setComments, postInfo.id]);

    console.log(comments);

    return (
        <>
            <PostDisply postInfo={postInfo} />
            <VStack textAlign="center" spacing={4}>
                <Text fontSize="xl" fontWeight="bold">
                    コメント一覧
                </Text>
            </VStack>
            {comments.map((comment) => (
                <div key={comment.id}>
                    {comment.post_id === postInfo.id && (
                        <div>
                            {comment.user_id ? ( // ユーザーコメントの場合
                                <Link
                                    onClick={() => {
                                        //user.idとcomment.user_idが同じならsetCommentInfoにcommentedUser.idを入れる
                                        const commentedUser = users.find(
                                            (user) =>
                                                user.id === comment.user_id
                                        );
                                        if (commentedUser) {
                                            navigate("/comment_and_reply_page");
                                            setCommentInfo({
                                                id: comment.id,
                                                user_id: comment.user_id,
                                                admin_id: null,
                                                user_name: commentedUser.name,
                                                text: comment.text,
                                            });
                                        }
                                    }}
                                >
                                    <p>{`ユーザーネーム: ${
                                        users.find(
                                            (user) =>
                                                user.id === comment.user_id
                                        )?.name
                                    }`}</p>
                                    <p>{`コメント内容: ${comment.text}`}</p>
                                </Link>
                            ) : comment.admin_id !== null ? ( // 管理者コメントの場合
                                <Link
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
                                    <p>管理者</p>
                                    <p>{`コメント内容: ${comment.text}`}</p>
                                </Link>
                            ) : null}
                        </div>
                    )}
                </div>
            ))}

            {adminId.id ? (
                <AdminCommentInput
                    text={text}
                    setText={setText}
                    onClick={() =>
                        handleAdminCommentSubmit({
                            postInfo,
                            text,
                            setText,
                            setComments,
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
                    onClick={() =>
                        handleUserCommentSubmit({
                            postInfo,
                            name,
                            text,
                            setComments,
                            setUsers,
                            setName,
                            setText,
                        })
                    }
                />
            )}
        </>
    );
});
