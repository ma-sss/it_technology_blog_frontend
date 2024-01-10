import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export const useAdminAuth = () => {
    const navigate = useNavigate();
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
                    console.log(res);

                    const accessToken = res.headers["access-token"];
                    const client = res.headers["client"];
                    const uid = res.headers["uid"];

                    Cookies.set("access-token", accessToken);
                    Cookies.set("client", client);
                    Cookies.set("uid", uid);

                    navigate("/");
                })
                .catch((res) => console.log(res));
        },
        [navigate]
    );
    return { login };
};
