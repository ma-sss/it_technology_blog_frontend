import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Link, Text, VStack } from "@chakra-ui/react";

import { post } from "../../types/post";
import { useSetRecoilState } from "recoil";
import { showPostInfo } from "../../store/showPostInfo";
import { postIndexAuth } from "../../Auth";

export const Top: FC = memo(() => {
    const [posts, setPosts] = useState<Array<post>>([]);

    const setPostInfo = useSetRecoilState(showPostInfo);

    const navigate = useNavigate();

    const categoryCounts = posts.reduce((counts, post) => {
        const category = post.category;
        counts[category] = (counts[category] || 0) + 1;
        return counts;
    }, {} as Record<string, number>);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await postIndexAuth();
                console.log(res.data.data[0].category);
                setPosts(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const getJapaneseCategoryLabel = (category: string): string => {
        switch (category) {
            case "frontend":
                return "フロントエンド";
            case "backend":
                return "バックエンド";
            case "tentative":
                return "仮の投稿";
            default:
                return "その他";
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="center">
                <Text fontSize="3xl" fontWeight="bold">
                    ようこそ!IT技術ブログへ🚀
                </Text>
                <Text>
                    こちらでは、このウェブアプリ自体の作り方や技術を
                    <br />
                    初心者の方でも理解しやすいように、わかりやすく解説しています。
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                    ログインなしで投稿の閲覧やコメントと返信の投稿が可能です！
                </Text>
                <Text>
                    順序通りに進めれば、このウェブアプリと同じものを作ることができます。
                    <br />
                    是非、技術の理解を深めながら、楽しく学んでいってください！！！
                </Text>
            </VStack>
            <VStack justify="center">
                <VStack spacing={4} align="start">
                    <Box as="p" p={4} fontSize="3xl" fontWeight="bold">
                        投稿カテゴリー一覧
                    </Box>
                </VStack>

                <VStack align="center" justify="center">
                    {Object.keys(categoryCounts).map((category) => (
                        <Link
                            key={category}
                            fontSize="lg"
                            onClick={() => {
                                setPostInfo({ category: category });
                                navigate("post_list_page");
                            }}
                        >
                            ⚪︎{getJapaneseCategoryLabel(category)}編 (
                            {categoryCounts[category]}件)
                        </Link>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
});
