import fetch from "../utils/fetch";

/* 登录 */
const login = param => fetch.post("/login", param);
export { login };
