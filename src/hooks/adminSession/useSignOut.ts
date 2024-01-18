import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

import { adminInfo } from "../../store/adminInfo";
import axios from "axios";

export const useSignOut = () => {
    const setAdminId = useSetRecoilState(adminInfo);

    const navigate = useNavigate();

    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    const signOut = () => {
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
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return { signOut };
};
