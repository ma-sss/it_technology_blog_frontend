import { ChangeEvent, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Flex, Input, Text } from "@chakra-ui/react";

import { showReplyInfo } from "../../store/showReplyInfo";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useHandleReplyDelete } from "../../hooks/reply/useHandleReplyDelete";
import { useHandleReplyEdit } from "../../hooks/reply/useHandleReplyEdit";
import { replyInfoType } from "../../types/replyInfoType";
import { adminInfo } from "../../store/adminInfo";

export const ReplyEditPage = memo(() => {
    const [replyInfo, setReplyInfo] = useRecoilState(showReplyInfo);
    const adminId = useRecoilValue(adminInfo);

    const navigate = useNavigate();

    const { HandleReplyEdit } = useHandleReplyEdit();
    const { HandleReplyDelete } = useHandleReplyDelete();

    useEffect(() => {
        // adminId.id が null の場合はログインページにリダイレクト
        if (adminId.id === null) {
            alert('ログインしてください'); // ダイアログやモーダルなど適切な形でログイン通知を表示する
            navigate("/sign_in"); // ログインページへリダイレクト
        }
    }, [adminId.id,navigate]);

    return (
        <>
            <Text fontSize="xl" fontWeight="bold">
                返信設定画面
            </Text>
            {replyInfo.admin_id !== null ? (
                <div>
                    <p>管理者の返信</p>
                </div>
            ) : (
                <div>
                    <p>{`ユーザーネーム: ${replyInfo.user_name} の返信`}</p>
                </div>
            )}

            <Input
                value={replyInfo.text}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setReplyInfo((prevReplyInfo: replyInfoType) => ({
                        ...prevReplyInfo,
                        text: e.target.value,
                    }))
                }
            />

            <Flex mt={4} justify="center">
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => HandleReplyEdit()}
                    mr={4}
                >
                    編集
                </Button>

                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => HandleReplyDelete()}
                >
                    削除
                </Button>
            </Flex>
            <Flex mt={4} justify="center">
                <PrimaryButton onClick={() => window.history.back()}>
                    前のページへ戻る
                </PrimaryButton>
            </Flex>
        </>
    );
});
