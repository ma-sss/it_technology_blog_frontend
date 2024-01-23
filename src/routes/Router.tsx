import { Routes, Route } from "react-router-dom";
import { Top } from "../compornents/pages/Top";
import { SignIn } from "../compornents/pages/SignIn";
import { PostAndCommentPage } from "../compornents/pages/PostAndCommentPage";
import { PostPage } from "../compornents/pages/PostPage";
import { CommentEditPage } from "../compornents/pages/CommentEditPage";
import { Page404 } from "../compornents/pages/Page404";
import { HeaderLayout } from "../compornents/templates/HeaderLayout";
import { CommentAndReplyPage } from "../compornents/pages/CommentAndReplyPage";
import { ReplyEditPage } from "../compornents/pages/ReplyEditPage";
import { PostEditPage } from "../compornents/pages/PostEditPage";

export const Router = () => {
    return (
        <HeaderLayout>
            <Routes>
                <Route path="/" element={<Top />} />
                <Route path="/sign_in" element={<SignIn />} />
                <Route path="/post_page" element={<PostPage />} />
                <Route path="/post_edit_page" element={<PostEditPage />} />
                <Route
                    path="/post_and_comment_page"
                    element={<PostAndCommentPage />}
                />
                <Route
                    path="/comment_and_reply_page"
                    element={<CommentAndReplyPage />}
                />
                <Route
                    path="/comment_edit_page"
                    element={<CommentEditPage />}
                />
                <Route path="/reply_edit_page" element={<ReplyEditPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </HeaderLayout>
    );
};
