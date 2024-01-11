import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useSignOut } from "../../hooks/useSignOut";

// memo必要と思われる
export const Header: FC = () => {
    const navigate = useNavigate();

    const {signOut} = useSignOut();

    return (
        <Flex
            as="nav"
            bg="teal.500"
            color="gray.50"
            align="center"
            justify="space-between"
            padding={{ base: 3, md: 5 }}
        >
            <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                <Heading as="h1" fontSize={{ base: "md", md: "lg" }} onClick={() => navigate("/")}>
                    IT技術ブログ
                </Heading>
            </Flex>
            <Flex
                align="center"
                fontSize="sm"
                flexGrow={2}
                display={{ base: "none", md: "flex" }}
            >
                <Box pr={4}>
                    <Link onClick={() => navigate("/sign_in")}>SignIn</Link>
                </Box>
                <Box pr={4}>
                    <Link onClick={() => navigate("/sign_up")}>SignUp</Link>
                </Box>
                <Box pr={4}>
                    <Link onClick={() => navigate("/post_page")}>投稿ページ</Link>
                </Box>
                <Link onClick={() => signOut()}>SignOut</Link>
            </Flex>
        </Flex>
    );
};
