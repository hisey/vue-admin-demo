import fetch from "../utils/fetch";

/* 登录 */
const login = param => fetch.post("/login", param);
const thirdJoin = param => fetch.post("/third/join", param);
export { login, thirdJoin };
