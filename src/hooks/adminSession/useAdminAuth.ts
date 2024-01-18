import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import axios from "axios";

import { adminInfo } from "../../store/adminInfo";

export const useAdminAuth = () => {
    const navigate = useNavigate();

    const setAdminId = useSetRecoilState(adminInfo);

    const login = useCallback(
        (email: string, password: string) => {
            axios
                .post(
                    "http://localhost:3000/api/v1/admin/sign_in",
                    {
                        email: email,
                        password: password,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res.data.data.id);

                    const accessToken = res.headers["access-token"];
                    const client = res.headers["client"];
                    const uid = res.headers["uid"];

                    Cookies.set("access-token", accessToken);
                    Cookies.set("client", client);
                    Cookies.set("uid", uid);

                    setAdminId({id: res.data.data.id});
                    
                    navigate("/");
                })
                .catch((error) => console.log(error));
        },
        [navigate, setAdminId]
    );
    return { login };
};
