import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryTextarea } from "../../atoms/PrimaryTextarea";
import { Box, Button } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { ErrorDisplay } from "../../molecules/ErrorDisply";

type Props = {
    text: string;
    replyError: Array<string>;
    setText: Dispatch<SetStateAction<string>>;
    onClick: () => void;
};

export const AdminReplyInput: FC<Props> = memo((props) => {
    const { text, replyError, setText, onClick } = props;

    const navigate = useNavigate();

    return (
        <Box>
            <ErrorDisplay errorsArray={replyError}/>
            <PrimaryTextarea
                placeholder="返信内容"
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                }
            />
            <Button
                colorScheme="teal"
                variant="outline"
                onClick={onClick}
                mr={4}
            >
                返信内容を投稿する
            </Button>
            <PrimaryButton onClick={() => navigate("/post_and_comment_page")}>
                戻る
            </PrimaryButton>
        </Box>
    );
});
