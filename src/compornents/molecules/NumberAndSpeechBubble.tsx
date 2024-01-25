import { FC, ReactNode, memo } from "react";
import { Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

type Props = {
    children: ReactNode;
    color: string;
};

export const NumberAndSpeechBubbble: FC<Props> = memo((props) => {
    const { children, color } = props;

    return (
        <Text mr={3} color={`${color}.500`} fontWeight="bold">
            <ChatIcon boxSize={6} ml={1} mr={1} />
            {children}
        </Text>
    );
});
