import Cookies from "js-cookie";
import Client from "./Clienet";

// サインイン
export const signInAuth = (params) => {
    return Client.post("admin/sign_in", params);
};

// サインアウト
export const signOutAuth = () => {
    return Client.delete("admin/sign_out", {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//記事全て取得
export const postIndexAuth = () => {
    return Client.get("admin/posts");
};

//選択した記事取得
export const postShowAuth = (postInfo) => {
    return Client.get(`admin/posts/${postInfo.id}`);
};

//記事投稿
export const postAuth = (adminId, params) => {
    return Client.post(`admin/${adminId.id}/post`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//記事編集
export const postEditAuth = (postInfo, params) => {
    return Client.patch(`admin/posts/${postInfo.id}`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//記事削除
export const postDeleteAuth = (postInfo) => {
    return Client.delete(`admin/posts/${postInfo.id}`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//コメント全て取得
export const commentIndexAuth = () => {
    return Client.get("user/comments");
};

//選択したadminコメント取得
export const adminCommentShowAuth = (commentInfo) => {
    return Client.get(`admin/comments/${commentInfo.id}`);
};

//選択したuserコメント取得
export const userCommentShowAuth = (commentInfo) => {
    return Client.get(`user/comments/${commentInfo.id}`);
};

//adminコメント投稿
export const adminCommentAuth = (adminId, params) => {
    return Client.post(`admin/${adminId.id}/comment`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//userコメント投稿
export const userCommentAuth = (params) => {
    return Client.post(`user/comments`, params, {});
};

//adminコメント編集
export const adminCommentEditAuth = (commentInfo, params) => {
    return Client.patch(`admin/comments/${commentInfo.id}`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//userコメント編集
export const userCommentEditAuth = (commentInfo, params) => {
    return Client.patch(`user/comments/${commentInfo.id}`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//adminコメント削除
export const adminCommentDeleteAuth = (commentInfo) => {
    return Client.delete(`admin/comments/${commentInfo.id}`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//userコメント削除
export const userCommentDeleteAuth = (commentInfo) => {
    return Client.delete(`user/comments/${commentInfo.id}`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//返信全て取得
export const replyIndexAuth = () => {
    return Client.get("user/replies");
};

//選択したadminの返信を取得
export const adminReplyShowAuth = (replyInfo) => {
    return Client.get(`admin/replies/${replyInfo.id}`);
};

//選択したuserの返信を取得
export const userReplyShowAuth = (replyInfo) => {
    return Client.get(`user/replies/${replyInfo.id}`);
};

//adminの返信を投稿
export const adminReplyAuth = (adminId, commentInfo, params) => {
    return Client.post(
        `admin/${adminId.id}/comment/${commentInfo.id}/reply`,
        params,
        {
            headers: {
                "access-token": Cookies.get("access-token"),
                client: Cookies.get("client"),
                uid: Cookies.get("uid"),
            },
        }
    );
};

//userの返信を投稿
export const userReplyAuth = (commentInfo, params) => {
    return Client.post(`user/comment/${commentInfo.id}/reply`, params, {});
};

//adminの返信を編集
export const adminReplyEditAuth = (replyInfo, params) => {
    return Client.patch(`admin/replies/${replyInfo.id}`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//userの返信を編集
export const userReplyEditAuth = (replyInfo, params) => {
    return Client.patch(`user/replies/${replyInfo.id}`, params, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//adminの返信を削除
export const adminReplyDeleteAuth = (replyInfo) => {
    return Client.delete(`admin/replies/${replyInfo.id}`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//userの返信を削除
export const userReplyDeleteAuth = (replyInfo) => {
    return Client.delete(`user/replies/${replyInfo.id}`, {
        headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
        },
    });
};

//ユーザー全て取得
export const userIndexAuth = () => {
    return Client.get("users");
};
