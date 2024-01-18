import { FC, memo, useEffect, useState } from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { showCommentInfo } from "../../store/showCommentInfo";
import { adminInfo } from "../../store/adminInfo";
import { reply } from "../../types/reply";
import { AdminReplyInput } from "../organisms/replyInput/AdminReplyInput";
import { UserReplyInput } from "../organisms/replyInput/UserReplyInput";
import { useHandleUserReplySubmit } from "../../hooks/reply/useHandleUserReplySubmit";
import { useHandleAdminReplySubmit } from "../../hooks/reply/useHandleAdminReplySubmit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user } from "../../types/user";
import { showReplyInfo } from "../../store/showReplyInfo";

export const CommentAndReplyPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const [users, setUsers] = useState<Array<user>>([]);
    const [replies, setReplies] = useState<Array<reply>>([]);

    const navigate = useNavigate();

    const adminId = useRecoilValue(adminInfo);
    const commentInfo = useRecoilValue(showCommentInfo);
    const setReplyInfo = useSetRecoilState(showReplyInfo);

    const { handleAdminReplySubmit } = useHandleAdminReplySubmit();

    const { handleUserReplySubmit } = useHandleUserReplySubmit();

    //replyとuserを全て持ってくる
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/user/replies`)
            .then((res) => setReplies(res.data.data))
            .catch((res) => console.log(res));
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => setUsers(res.data.data))
            .catch((res) => console.log(res));
    }, []);

    return (
        <Box p={4}>
            <Box p={5}>
                <Text fontSize="xl" fontWeight="bold">
                    コメント
                </Text>
            </Box>
            {commentInfo.admin_id !== null ? (
                <Link onClick={() => navigate("/comment_edit_page")}>
                    <p>管理者</p>
                    <p>{`コメント: ${commentInfo.text}`}</p>
                </Link>
            ) : (
                <Link onClick={() => navigate("/comment_edit_page")}>
                    <p>{`ユーザーネーム: ${commentInfo.user_name}`}</p>
                    <p>{`コメント: ${commentInfo.text}`}</p>
                </Link>
            )}

            <Text p={4} fontSize="xl" fontWeight="bold">
                返信一覧
            </Text>

            {replies.map((reply) => (
                <div key={reply.id}>
                    {reply.comment_id === commentInfo.id && (
                        <div>
                            {reply.user_id ? ( // ユーザーreplyの場合
                                <Link
                                    onClick={() => {
                                        //user.idとreply.user_idが同じならsetReplyInfoにcommentedUser.idを入れる
                                        const repliedUser = users.find(
                                            (user) => user.id === reply.user_id
                                        );
                                        if (repliedUser) {
                                            navigate("/reply_edit_page");
                                            setReplyInfo({
                                                id: reply.id,
                                                user_id: reply.user_id,
                                                admin_id: null,
                                                user_name: repliedUser.name,
                                                text: reply.text,
                                            });
                                        }
                                    }}
                                >
                                    <p>{`ユーザーネーム: ${
                                        users.find(
                                            (user) => user.id === reply.user_id
                                        )?.name
                                    }`}</p>
                                    <p>{`コメント内容: ${reply.text}`}</p>
                                </Link>
                            ) : reply.admin_id !== null ? ( // 管理者コメントの場合
                                <Link
                                    onClick={() => {
                                        navigate("/reply_edit_page");
                                        setReplyInfo({
                                            id: reply.id,
                                            user_id: null,
                                            admin_id: reply.admin_id,
                                            user_name: "",
                                            text: reply.text,
                                        });
                                    }}
                                >
                                    <p>管理者</p>
                                    <p>{`コメント内容: ${reply.text}`}</p>
                                </Link>
                            ) : null}
                        </div>
                    )}
                </div>
            ))}

            <Text p={5} fontSize="xl" fontWeight="bold">
                返信内容
            </Text>

            {adminId.id ? (
                <AdminReplyInput
                    text={text}
                    setText={setText}
                    onClick={() =>
                        handleAdminReplySubmit({
                            text,
                            setText,
                            commentInfo,
                            setReplies,
                            setUsers,
                        })
                    }
                />
            ) : (
                <UserReplyInput
                    name={name}
                    setName={setName}
                    text={text}
                    setText={setText}
                    onClick={() =>
                        handleUserReplySubmit({
                            name,
                            setName,
                            text,
                            setText,
                            commentInfo,
                            setReplies,
                            setUsers,
                        })
                    }
                />
            )}
        </Box>
    );
});
