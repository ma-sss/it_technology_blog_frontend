import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useState } from "react";

export const PostPage: FC = memo(() => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePostSubmit = () => {
        // Add logic to submit the post
        console.log("Post submitted:", { title, content });
    };

    return (
        <Box p={4}>
            <p>投稿ページ</p>
            <Input placeholder="タイトル" mb={4} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            <Textarea placeholder="コンテンツ" mb={4} value={content} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
            <Button colorScheme="teal" onClick={handlePostSubmit}>
                投稿する
            </Button>
        </Box>
    );
});
