import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { PrimaryTextarea } from "../../atoms/PrimaryTextarea";
import { Box, Button } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    onClick: () => void;
}

export const AdminReplyInput: FC<Props> = memo((props) => {
    const { text, setText, onClick } = props;

    return (
        <Box>
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
                    <PrimaryButton onClick={() => window.history.back()}>
                        戻る
                    </PrimaryButton>
                </Box>
    )
})