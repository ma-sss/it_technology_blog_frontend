import { Box } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { PrimaryTextarea } from "../atoms/PrimaryTextarea";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    onClick: () => void;
};

export const AdminCommentInput: FC<Props> = memo((props) => {
    const { text, setText, onClick } = props;
    return (
        <Box p={4}>
                    <p>管理者コメント入力欄</p>
                    <PrimaryTextarea
                        placeholder="コメント"
                        value={text}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setText(e.target.value)
                        }
                    />
                    <PrimaryButton onClick={onClick}>
                        投稿する
                    </PrimaryButton>
                </Box>
    );
});

