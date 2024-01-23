import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import { PrimaryTextarea } from "../../atoms/PrimaryTextarea";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { PrimaryInput } from "../../atoms/PrimaryInput";
import { ErrorDisplay } from "../../molecules/ErrorDisply";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    nameAndCommentError: Array<string>;
    onClick: () => void;
};

export const UserCommentInput: FC<Props> = memo((props) => {
    const { name, setName, text, setText, nameAndCommentError, onClick } = props;

    const navigate = useNavigate();

    return (
        <Box p={4}>
            <p>ユーザーコメント入力欄</p>
            <ErrorDisplay errorsArray={nameAndCommentError}/>
            <PrimaryInput
                placeholder="名前"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
            />
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
            <PrimaryButton onClick={() => navigate("/")}>
                戻る
            </PrimaryButton>
        </Box>
    );
});
