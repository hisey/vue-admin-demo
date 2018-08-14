import fetch from '../utils/fetch'


/* 登录 */
const login = (mobile, password, code) => fetch.post('/login', {
    mobile,
    password,
    code
})

/* 注销 */
const loginout = () => fetch.get('/loginout', {})

/* 修改密码 */
const updatePassword = (oldPassword, password, confirmPassword) => fetch.post('/adminManage/updatePassword', {
    oldPassword, password, confirmPassword
})



export { login, loginout, updatePassword }

