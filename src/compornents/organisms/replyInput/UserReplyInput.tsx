import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import { PrimaryInput } from "../../atoms/PrimaryInput";
import { PrimaryTextarea } from "../../atoms/PrimaryTextarea";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { ErrorDisplay } from "../../molecules/ErrorDisply";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    nameAndReplyError: Array<string>;
    onClick: () => void;
}

export const UserReplyInput: FC<Props> = memo((props) => {
    const { name, setName, text, setText, nameAndReplyError, onClick } = props;

    const navigate = useNavigate();

    return (
        <Box>
            <ErrorDisplay errorsArray={nameAndReplyError} />
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
    )
})