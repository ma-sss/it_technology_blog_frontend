import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";

import { showPostInfo } from "../../store/showPostInfo";
import { adminInfo } from "../../store/adminInfo";
import { comment } from "../../types/comment";
import { useFetchComment } from "../../hooks/useFetchComment";
import { AdminCommentInput } from "../organisms/AdminCommentInput";
import { UserCommentInput } from "../organisms/UserCommentInput";
import { UserCommentDisplyForUser } from "../molecules/UserCommentDisplyForUser";
import { AdminCommentDisplyForUser } from "../molecules/AdminCommentDisplyForUser";
import { UserCommentDisplyForAdmin } from "../molecules/UserCommentDisplyForAdmin";
import { AdminCommentDisplyForAdmin } from "../molecules/AdminCommentDisplyForAdmin";
import { useHandleUserCommentSubmit } from "../../hooks/useHandleUsercommentSubmit";
import { useHandleAdmincommentSubmit } from "../../hooks/useHandleAdminCommentSubmit";
import { PostDisply } from "../molecules/PostDisply";
import { Text, VStack } from "@chakra-ui/react";

export const PostShowPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const [comments, setComments] = useState<Array<comment>>([]);

    const { FetchComment } = useFetchComment();

    const postInfo = useRecoilValue(showPostInfo);
    const adminId = useRecoilValue(adminInfo);

    const { handleAdminCommentSubmit } = useHandleAdmincommentSubmit();
    const { handleUserCommentSubmit } = useHandleUserCommentSubmit();

    // 選んだpostに対してのコメントを全て取得
    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/v1/user/${postInfo.post_id}/comments`
            )
            .then((res) => setComments(res.data.data))
            .catch((res) => console.log(res));
    }, [setComments, postInfo.post_id]);

    return (
        <>
            <PostDisply postInfo={postInfo}/>
            <VStack textAlign="center" spacing={4}>
                <Text fontSize="xl" fontWeight="bold" >
                    コメント一覧
                </Text>
            </VStack>
            {comments.map((comment, index) =>
                adminId.id ? (
                    comment.admin_id ? (
                        <AdminCommentDisplyForAdmin
                            key={index}
                            comment={comment}
                            onClick={() => {
                                navigate("/comment_show_page");
                                FetchComment(
                                    comment.user_id,
                                    comment.user_name,
                                    comment.id
                                );
                            }}
                        />
                    ) : (
                        <UserCommentDisplyForAdmin
                            key={index}
                            comment={comment}
                            onClick={() => {
                                navigate("/comment_show_page");
                                FetchComment(
                                    comment.user_id,
                                    comment.user_name,
                                    comment.id
                                );
                            }}
                        />
                    )
                ) : comment.admin_id ? (
                    <AdminCommentDisplyForUser
                        key={index}
                        comment={comment}
                    />
                ) : (
                    <UserCommentDisplyForUser key={index} comment={comment} />
                )
            )}

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
                            setName,
                            setText,
                        })
                    }
                />
            )}
        </>
    );
});
