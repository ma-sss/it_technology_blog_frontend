import { Dispatch, SetStateAction, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { reply } from "../../types/reply";
import { user } from "../../types/user";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../../store/adminInfo";

type Props = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    commentInfo: { id: number; user_name: string; text: string };
    setReplies: Dispatch<SetStateAction<reply[]>>;
    setUsers: Dispatch<SetStateAction<user[]>>;
    setReplyError: Dispatch<SetStateAction<string[]>>;
};

export const useHandleAdminReplySubmit = () => {
    const adminId = useRecoilValue(adminInfo);

    const handleAdminReplySubmit = useCallback(
        (props: Props) => {
            const { text, setText, commentInfo, setReplies, setUsers, setReplyError } = props;

            const accessToken = Cookies.get("access-token");
            const client = Cookies.get("client");
            const uid = Cookies.get("uid");

            axios
                .post(
                    `http://localhost:3000/api/v1/admin/${adminId.id}/comment/${commentInfo.id}/reply`,
                    {
                        text: text,
                    },
                    {
                        headers: {
                            "access-token": accessToken!,
                            "client": client!,
                            "uid": uid!,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.errors);
                    setReplyError(res.data.errors);
                    axios
                        .get(`http://localhost:3000/api/v1/user/replies`)
                        .then((res) => {
                            setReplies(res.data.data);
                            console.log(res.data.data);
                        })
                        .catch((error) => console.log(error));
                    axios
                        .get(`http://localhost:3000/api/v1/users`)
                        .then((res) => setUsers(res.data.data))
                        .catch((res) => console.log(res));
                    setText("");
                });
        },
        [adminId.id]
    );
    return { handleAdminReplySubmit };
};
