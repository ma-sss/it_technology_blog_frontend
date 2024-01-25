import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { Box, Button, Input, Select, Textarea } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import Cookies from "js-cookie";

import { adminInfo } from "../../store/adminInfo";
import { useNavigate } from "react-router-dom";
import { ErrorDisplay } from "../molecules/ErrorDisply";
import { useMessage } from "../../hooks/useMessage";

export const PostPage: FC = memo(() => {
    const [titleAndContentError, setTitleAndContentError] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const adminId = useRecoilValue(adminInfo);

    const { showMessage } = useMessage();

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    const handlePostSubmit = useCallback(() => {
        axios
            .post(
                `http://localhost:3000/api/v1/admin/${adminId.id}/post`,
                {
                    title: title,
                    content: content,
                    category: category,
                },
                {
                    headers: {
                        "access-token": accessToken!,
                        client: client!,
                        uid: uid!,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setTitleAndContentError(res.data.error);
                if (res.data.status === "SUCCESS") {
                    showMessage({ title: "投稿しました", status: "success" });
                    navigate("/");
                }
            })
            .catch((error) => console.log(error.data));
    }, [accessToken, adminId, client, content, navigate, title, uid, category, showMessage]);

    return (
        <Box p={4}>
            <p>投稿ページ</p>
            <ErrorDisplay errorsArray={titleAndContentError} />
            <Input
                placeholder="タイトル"
                mb={4}
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <Select
                placeholder="Select a category"
                mb={4}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="other">other</option>
            </Select>
            <Textarea
                placeholder="内容"
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
