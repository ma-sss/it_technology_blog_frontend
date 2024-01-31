// axios-case-converterは、snake_case / camelCaseを変換するため利用
import applyCaseMiddleware from "axios-case-converter";
// axiosをインポート
import axios from "axios";

// ヘッダーはケバブケースのままにする
const options = {
    ignoreHeaders: true,
};

// URLの共通部分を設定
export const Client = applyCaseMiddleware(
    axios.create({
        baseURL: "http://localhost:3000/api/v1",
    }),
    options
);

//非同期処理との相性が悪い？ため上のClientとAuth.tsが使えないところに使用（原因不明・修正要す）
export const urlOnlyClient = "http://localhost:3000/api/v1";
