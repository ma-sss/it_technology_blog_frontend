import { Box } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

import { useNavigate } from "react-router-dom";
import { showCommentInfo } from "../../store/showCommentInfo";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { PrimaryTextarea } from "../atoms/PrimaryTextarea";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const ReplyPage: FC = memo(() => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const navigate = useNavigate();

    const commentInfo = useRecoilValue(showCommentInfo);

    const handlePostSubmit = useCallback(() => {
        axios
            .post(
                `http://localhost:3000/api/v1/user/replies`,
                {
                    name: name,
                    text: text,
                }
            )
            .then((res) => {
                console.log(res);
                navigate("/post_show_page");
            })
            .catch((error) => console.log(error));
    }, [navigate, name, text]);

    return (
        <Box p={4}>
            <p>{commentInfo.user_name}</p>
            <p>{commentInfo.text}</p>
            <p>返信内容</p>
            <PrimaryInput
                placeholder="名前"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
            />
            <PrimaryTextarea
                placeholder="返信内容"
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                }
            />
            <PrimaryButton onClick={handlePostSubmit}>
                投稿する
            </PrimaryButton>
            <PrimaryButton onClick={() => window.history.back()}>
                戻る
            </PrimaryButton>
        </Box>
    );
});
