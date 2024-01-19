import { FC, memo, useEffect, useState } from "react";
import { Box, Link, Text, VStack } from "@chakra-ui/react";
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
            <VStack p={12} spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    コメント
                </Text>
                {adminId.id !== null ? (
                    // 管理者のためのリンク
                    <Link onClick={() => navigate("/comment_edit_page")}>
                        {commentInfo.admin_id !== null ? (
                            <>
                                <p>管理者</p>
                                <p>{`コメント: ${commentInfo.text}`}</p>
                            </>
                        ) : (
                            <>
                                <p>{`ユーザーネーム: ${commentInfo.user_name}`}</p>
                                <p>{`コメント: ${commentInfo.text}`}</p>
                            </>
                        )}
                    </Link>
                ) : (
                    // 一般ユーザーのための表示
                    <Box>
                        {commentInfo.admin_id !== null ? (
                            <Box>
                                <Text>管理者</Text>
                                <Text>{`コメント: ${commentInfo.text}`}</Text>
                            </Box>
                        ) : (
                            <Box>
                                <Text>{`ユーザーネーム: ${commentInfo.user_name}`}</Text>
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
                <div key={reply.id}>
                    {adminId.id !== null
                        ? reply.comment_id === commentInfo.id && (
                              <div>
                                  {reply.user_id ? ( // ユーザーreplyの場合
                                      <Link
                                          m={1}
                                          style={{
                                              border: "3px solid orange",
                                              padding: "8px",
                                              borderRadius: "10px",
                                              display: "inline-block",
                                          }}
                                          onClick={() => {
                                              const repliedUser = users.find(
                                                  (user) =>
                                                      user.id === reply.user_id
                                              );
                                              if (repliedUser) {
                                                  navigate("/reply_edit_page");
                                                  setReplyInfo({
                                                      id: reply.id,
                                                      user_id: reply.user_id,
                                                      admin_id: null,
                                                      user_name:
                                                          repliedUser.name,
                                                      text: reply.text,
                                                  });
                                              }
                                          }}
                                      >
                                          <p>{`ユーザーネーム: ${
                                              users.find(
                                                  (user) =>
                                                      user.id === reply.user_id
                                              )?.name
                                          }`}</p>
                                          <p>{`返信内容: ${reply.text}`}</p>
                                      </Link>
                                  ) : reply.admin_id !== null ? ( // 管理者コメントの場合
                                      <Link
                                          m={1}
                                          style={{
                                              border: "3px solid teal",
                                              padding: "8px",
                                              borderRadius: "4px",
                                              display: "inline-block",
                                          }}
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
                                          <Text fontWeight="bold">管理者</Text>
                                          <p>{`返信内容: ${reply.text}`}</p>
                                      </Link>
                                  ) : null}
                              </div>
                          )
                        : reply.comment_id === commentInfo.id && (
                              <div>
                                  {reply.user_id ? ( // ユーザーreplyの場合
                                      <Box
                                          m={1}
                                          style={{
                                              border: "3px solid orange",
                                              padding: "8px",
                                              borderRadius: "10px",
                                              display: "inline-block",
                                          }}
                                      >
                                          <p>{`ユーザーネーム: ${
                                              users.find(
                                                  (user) =>
                                                      user.id === reply.user_id
                                              )?.name
                                          }`}</p>
                                          <p>{`返信内容: ${reply.text}`}</p>
                                      </Box>
                                  ) : reply.admin_id !== null ? ( // 管理者コメントの場合
                                      <Box
                                          m={1}
                                          style={{
                                              border: "3px solid teal",
                                              padding: "8px",
                                              borderRadius: "4px",
                                              display: "inline-block",
                                          }}
                                      >
                                          <Text fontWeight="bold">管理者</Text>
                                          <p>{`返信内容: ${reply.text}`}</p>
                                      </Box>
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
