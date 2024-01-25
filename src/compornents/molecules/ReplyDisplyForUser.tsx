import { FC, ReactNode, memo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { user } from "../../types/user";
import { reply } from "../../types/reply";
import { showReplyInfo } from "../../store/showReplyInfo";

type Props = {
    color: string;
    children: ReactNode;
    users: Array<user>;
    reply: reply;
};

export const ReplyDisplyForUser: FC<Props> = memo((props) => {
    const { color, children, users, reply } = props;

    const setReplyInfo = useSetRecoilState(showReplyInfo);

    const navigate = useNavigate();

    return (
        <Box
            m={1}
            style={{
                border: `3px solid ${color}`,
                padding: "8px",
                borderRadius: "4px",
                display: "inline-block",
            }}
            onClick={() => {
                const repliedUser = users.find(
                    (user) => user.id === reply.user_id
                );
                if (repliedUser) {
                    setReplyInfo({
                        id: reply.id,
                        user_id: reply.user_id,
                        admin_id: null,
                        user_name: repliedUser.name,
                        text: reply.text,
                    });
                } else {
                    setReplyInfo({
                        id: reply.id,
                        user_id: null,
                        admin_id: reply.admin_id,
                        user_name: "",
                        text: reply.text,
                    });
                    navigate("/reply_edit_page");
                }
            }}
        >
            {children}
            <Text>{`返信内容: ${reply.text}`}</Text>
        </Box>
    );
});
