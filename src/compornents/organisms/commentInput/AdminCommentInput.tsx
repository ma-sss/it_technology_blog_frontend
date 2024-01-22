import { Box, Button } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { PrimaryTextarea } from "../../atoms/PrimaryTextarea";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { ErrorDisplay } from "../../molecules/ErrorDisply";

type Props = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    commentError: Array<string>;
    onClick: () => void;
};

export const AdminCommentInput: FC<Props> = memo((props) => {
    const { text, setText, commentError, onClick } = props;
    return (
        <Box p={4}>
            <p>管理者コメント入力欄</p>
            <ErrorDisplay errorsArray={commentError}/>
            <PrimaryTextarea
                placeholder="コメント"
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setText(e.target.value)
                }
            />
            <Button
                colorScheme="teal"
                variant="outline"
                mr={4}
                onClick={onClick}
            >
                投稿する
            </Button>
            <PrimaryButton onClick={() => window.history.back()}>
                戻る
            </PrimaryButton>
        </Box>
    );
});
