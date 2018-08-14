import fetch from '../utils/fetch'

/* 获取案件数 */
const getCaseCount = () => fetch.get('/index', {})
export { getCaseCount }

