import { FC, memo, useEffect, useState } from "react";
import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

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
import { ReplyDisplyForAdmin } from "../molecules/ReplyDisplyForAdmin";
import { ReplyDisplyForUser } from "../molecules/ReplyDisplyForUser";
import { userIndexAuth } from "../../Auth";

export const CommentAndReplyPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const [users, setUsers] = useState<Array<user>>([]);
    const [replies, setReplies] = useState<Array<reply>>([]);

    const [replyError, setReplyError] = useState<Array<string>>([]);
    const [nameAndReplyError, setNameAndReplyError] = useState<Array<string>>(
        []
    );

    const navigate = useNavigate();

    const adminId = useRecoilValue(adminInfo);
    const commentInfo = useRecoilValue(showCommentInfo);

    const { handleAdminReplySubmit } = useHandleAdminReplySubmit();

    const { handleUserReplySubmit } = useHandleUserReplySubmit();

    //replyとuserを全て持ってくる
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Auth.tsを使いたいが上手く表示できないため使用していない(返信を全て取得)
                const repliesRes = await axios.get(
                    "http://localhost:3000/api/v1/user/replies"
                );
                setReplies(repliesRes.data.data);

                const usersRes = await userIndexAuth();
                setUsers(usersRes.data.data);
            } catch (error) {
                console.error("エラーが発生しました:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box p={4}>
            <VStack p={12} spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    コメント
                </Text>
                {adminId.id !== null ? (
                    // 管理者のためのリンク
                    <Link onClick={() => navigate("/comment_edit_page")}>
                        {commentInfo.admin_id !== null ? (
                            <Box>
                                <Text fontWeight="bold">管理者</Text>
                                <Text>{`コメント: ${commentInfo.text}`}</Text>
                            </Box>
                        ) : (
                            <Box>
                                <Text fontWeight="bold">{`ユーザーネーム: ${commentInfo.user_name}`}</Text>
                                <Text>{`コメント: ${commentInfo.text}`}</Text>
                            </Box>
                        )}
                    </Link>
                ) : (
                    // 一般ユーザーのための表示
                    <Box>
                        {commentInfo.admin_id !== null ? (
                            <Box>
                                <Text fontWeight="bold">管理者</Text>
                                <Text>{`コメント: ${commentInfo.text}`}</Text>
                            </Box>
                        ) : (
                            <Box>
                                <Text fontWeight="bold">{`ユーザーネーム: ${commentInfo.user_name}`}</Text>
                                <Text>{`コメント: ${commentInfo.text}`}</Text>
                            </Box>
                        )}
                    </Box>
                )}
            </VStack>

            <Text p={4} fontSize="xl" fontWeight="bold">
                返信一覧
            </Text>

            {replies.map((reply) => (
                <Box key={reply.id}>
                    {adminId.id !== null //　管理者の場合（ログイン中）返信表示がLinkになっています
                        ? reply.comment_id === commentInfo.id && (
                              <Box>
                                  {reply.user_id ? ( // ユーザーreplyの場合
                                      <ReplyDisplyForAdmin
                                          color="orange"
                                          users={users}
                                          reply={reply}
                                      >
                                          <Text fontWeight="bold">{`ユーザーネーム: ${
                                              users.find(
                                                  (user) =>
                                                      user.id === reply.user_id
                                              )?.name
                                          }`}</Text>
                                      </ReplyDisplyForAdmin>
                                  ) : reply.admin_id !== null ? ( // 管理者コメントの場合
                                      <ReplyDisplyForAdmin
                                          color="teal"
                                          users={users}
                                          reply={reply}
                                      >
                                          <Text fontWeight="bold">管理者</Text>
                                      </ReplyDisplyForAdmin>
                                  ) : null}
                              </Box>
                          )
                        : // ここからはadminId.id === nullで一般ユーザーの場合（ログアウト中）返信表示に対してのLinkをBoxに変更
                          reply.comment_id === commentInfo.id && (
                              <Box>
                                  {reply.user_id ? ( // ユーザーreplyの場合
                                      <ReplyDisplyForUser
                                          color="orange"
                                          users={users}
                                          reply={reply}
                                      >
                                          <Text fontWeight="bold">{`ユーザーネーム: ${
                                              users.find(
                                                  (user) =>
                                                      user.id === reply.user_id
                                              )?.name
                                          }`}</Text>
                                      </ReplyDisplyForUser>
                                  ) : reply.admin_id !== null ? ( // 管理者コメントの場合
                                      <ReplyDisplyForUser
                                          color="teal"
                                          users={users}
                                          reply={reply}
                                      >
                                          <Text fontWeight="bold">管理者</Text>
                                      </ReplyDisplyForUser>
                                  ) : null}
                              </Box>
                          )}
                </Box>
            ))}

            <Text p={5} fontSize="xl" fontWeight="bold">
                返信内容
            </Text>

            {adminId.id ? (
                <AdminReplyInput
                    text={text}
                    setText={setText}
                    replyError={replyError}
                    onClick={() =>
                        handleAdminReplySubmit({
                            text,
                            setText,
                            commentInfo,
                            setReplies,
                            setUsers,
                            setReplyError,
                        })
                    }
                />
            ) : (
                <UserReplyInput
                    name={name}
                    setName={setName}
                    text={text}
                    setText={setText}
                    nameAndReplyError={nameAndReplyError}
                    onClick={() =>
                        handleUserReplySubmit({
                            name,
                            setName,
                            text,
                            setText,
                            commentInfo,
                            setReplies,
                            setUsers,
                            setNameAndReplyError,
                        })
                    }
                />
            )}
        </Box>
    );
});
