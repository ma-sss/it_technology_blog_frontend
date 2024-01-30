import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import { adminInfo } from "../../store/adminInfo";
import { useMessage } from "../useMessage";
import { useCallback } from "react";
import { signOutAuth } from "../../Auth";

export const useSignOut = () => {
    const setAdminId = useSetRecoilState(adminInfo);

    const { showMessage } = useMessage();

    const signOut = useCallback(async () => {
        try {
            const res = await signOutAuth();

            console.log(res);
            Cookies.remove("uid");
            Cookies.remove("client");
            Cookies.remove("access-token");
            setAdminId({ id: null });
            res.status === 200 &&
                showMessage({ title: "ログアウトしました", status: "warning" });
        } catch (error) {
            console.log(error);
        }
    }, [setAdminId, showMessage]);

    return { signOut };
};
