import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import { adminInfo } from "../../store/adminInfo";
import axios from "axios";
import { useMessage } from "../useMessage";
import { useCallback } from "react";

export const useSignOut = () => {
    const setAdminId = useSetRecoilState(adminInfo);

    const { showMessage } = useMessage();

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    const signOut = useCallback(() => {
        setAdminId({ id: null });

        axios
            .delete("http://localhost:3000/api/v1/admin/sign_out", {
                headers: {
                    "access-token": accessToken!,
                    "client": client!,
                    "uid": uid!,
                },
            })
            .then((res) => {
                console.log(res);

                Cookies.remove("uid");
                Cookies.remove("client");
                Cookies.remove("access-token");
                showMessage({ title: "ログアウトしました", status: "warning" });
            })
            .catch((error) => console.log(error));
    },[accessToken, client, setAdminId, uid, showMessage])

    return { signOut };
};
