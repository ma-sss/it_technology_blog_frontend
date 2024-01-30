import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import { adminInfo } from "../../store/adminInfo";
import { useMessage } from "../useMessage";
import { signInAuth } from "../../Auth";

export const useAdminAuth = () => {
    const navigate = useNavigate();

    const setAdminId = useSetRecoilState(adminInfo);

    const { showMessage } = useMessage();

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                const res = await signInAuth({ email, password });

                console.log(res.data.data.id);

                const accessToken = res.headers["access-token"];
                const client = res.headers["client"];
                const uid = res.headers["uid"];

                Cookies.set("access-token", accessToken);
                Cookies.set("client", client);
                Cookies.set("uid", uid);

                setAdminId({ id: res.data.data.id });
                res.status === 200 &&
                    showMessage({
                        title: "ログインしました",
                        status: "success",
                    });
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        },
        [navigate, setAdminId, showMessage]
    );

    return { login };
};
