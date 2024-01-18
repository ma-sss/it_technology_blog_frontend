import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { postInfoType } from "../../types/postInfoType";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useHandlePostDelete } from "../../hooks/post/useHandlePostDelete";
import { useHandlePostEdit } from "../../hooks/post/useHandlePostEdit";

export const PostEditPage = memo(() => {
    const [postInfo, setPostInfo] = useRecoilState(showPostInfo);

    const { HandlePostEdit } = useHandlePostEdit();
    const { HandlePostDelete } = useHandlePostDelete();

    return (
        <>
            <Text fontSize="xl" fontWeight="bold">
                投稿編集画面
            </Text>

            <Input
                value={postInfo.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPostInfo((prevpostInfo: postInfoType) => ({
                        ...prevpostInfo,
                        title: e.target.value,
                    }))
                }
            />

            <Input
                value={postInfo.content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPostInfo((prevpostInfo: postInfoType) => ({
                        ...prevpostInfo,
                        content: e.target.value,
                    }))
                }
            />

            <Flex mt={4} justify="center">
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => HandlePostEdit()}
                    mr={4}
                >
                    編集
                </Button>

                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => HandlePostDelete()}
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
