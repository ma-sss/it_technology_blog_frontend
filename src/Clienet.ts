// axios-case-converterは、snake_case / camelCaseを変換するため利用
import applyCaseMiddleware from "axios-case-converter";
// axiosをインポート
import axios from "axios";

// ヘッダーはケバブケースのままにする
const options = {
    ignoreHeaders: true,
};

// URLの共通部分を設定
const Client = applyCaseMiddleware(
    axios.create({
        baseURL: "http://localhost:3000/api/v1",
    }),
    options
);

export default Client;
