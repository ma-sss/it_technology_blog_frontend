import { Routes, Route } from "react-router-dom";
import { Top } from "../compornents/pages/Top";
import { SignIn } from "../compornents/pages/SignIn";
import { SignUp } from "../compornents/pages/Signup";
import { PostShowPage } from "../compornents/pages/PostShowPage";
import { PostPage } from "../compornents/pages/PostPage";
import { CommentShowPage } from "../compornents/pages/CommentShowPage";
import { Page404 } from "../compornents/pages/Page404";
import { HeaderLayout } from "../compornents/templates/HeaderLayout";
import { ReplyPage } from "../compornents/pages/ReplyPage";

export const Router = () => {
  return (
    <HeaderLayout>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/post_show_page" element={<PostShowPage />} />
        <Route path="/post_page" element={<PostPage />} />
        <Route path="/comment_show_page" element={<CommentShowPage />} />
        <Route path="/reply_page" element={<ReplyPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HeaderLayout>
  );
};
