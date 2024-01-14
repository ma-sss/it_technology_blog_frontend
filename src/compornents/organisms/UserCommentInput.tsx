import { Box } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, memo } from "react";
import { PrimaryTextarea } from "../atoms/PrimaryTextarea";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    onClick: () => void;
};

export const UserCommentInput: FC<Props> = memo((props) => {
    const { name, setName, text, setText, onClick } = props;
    return (
        <Box p={4}>
            <p>ユーザーコメント入力欄</p>
            <PrimaryInput
                placeholder="名前"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)}
            />
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
