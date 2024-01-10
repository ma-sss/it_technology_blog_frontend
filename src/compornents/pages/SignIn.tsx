import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export const SignIn: FC = memo(() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAdminAuth();

    return (
        <Flex align="center" justify="center" height="100vh">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" size="lg" textAlign="center">
                    管理者専用ログイン画面
                </Heading>
                <Divider my={4} />
                <Stack spacing={6} py={4} px={10}>
                    <Input
                        placeholder="email"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <PrimaryButton onClick={() => login(email, password)}>
                        ログイン
                    </PrimaryButton>
                </Stack>
            </Box>
        </Flex>
    );
});
