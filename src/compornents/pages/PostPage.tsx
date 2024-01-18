import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

import { adminInfo } from "../../store/adminInfo";
import { useNavigate } from "react-router-dom";

export const PostPage: FC = memo(() => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const adminId = useRecoilValue(adminInfo);

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    const handlePostSubmit = useCallback(() => {
        axios.post(
            `http://localhost:3000/api/v1/admin/${adminId.id}/post`,
            {
                admin_id: adminId,
                title: title,
                content: content,
            },
            {
                headers: {
                    "access-token": accessToken!,
                    "client": client!,
                    "uid": uid!,
                },
            }
        ).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => console.log(error));
    },[accessToken, adminId, client, content, navigate, title, uid]);

    return (
        <Box p={4}>
            <p>投稿ページ</p>
            <Input
                placeholder="タイトル"
                mb={4}
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <Textarea
                placeholder="コンテンツ"
                mb={4}
                value={content}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                }
            />
            <Button colorScheme="teal" onClick={handlePostSubmit}>
                投稿する
            </Button>
        </Box>
    );
});
