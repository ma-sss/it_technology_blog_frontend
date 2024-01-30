import { ChangeEvent, FC, memo, useCallback, useState } from "react";
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { adminInfo } from "../../store/adminInfo";
import { useNavigate } from "react-router-dom";
import { ErrorDisplay } from "../molecules/ErrorDisply";
import { useMessage } from "../../hooks/useMessage";
import { postAuth } from "../../Auth";

export const PostPage: FC = memo(() => {
    const [titleAndContentError, setTitleAndContentError] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const adminId = useRecoilValue(adminInfo);

    const { showMessage } = useMessage();

    const handlePostSubmit = useCallback(async () => {
        try {
            const res = await postAuth(adminId, {title, content, category });
            console.log(res.data);
            setTitleAndContentError(res.data.error);
            if (res.data.status === "SUCCESS") {
                showMessage({ title: "投稿しました", status: "success" });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }, [
        adminId,
        content,
        navigate,
        title,
        category,
        showMessage,
    ]);

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
            <ReactQuill
                placeholder="内容"
                value={content}
                modules={{
                    toolbar: [
                        [{ size: ["small", false, "large", "huge"] }], // 文字の大きさ
                        ["bold", "italic", "underline"],
                        ["link", "image", "code-block"],
                        [{ align: [] }], // 中央寄せを含む
                    ],
                }}
                theme="snow"
                onChange={(value) => {
                    setContent(value);
                }}
            />
            <Button colorScheme="teal" onClick={handlePostSubmit}>
                投稿する
            </Button>
        </Box>
    );
});
