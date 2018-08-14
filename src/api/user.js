import fetch from '../utils/fetch'


/*
 获取角色组
  */
const getRoleGroupList = () => fetch.get('/adminManage/roleGroupList', {})

/*
 获取角色组里面的成员 
 */
const getGroupAdminList = (groupIds) => fetch.get('/adminManage/groupAdminList', { groupIds })

/*
获取委外负责人列表 
 */
const getEntrustAdminList = () => fetch.get('/adminManage/entrustAdminList', {})

/*
获取委外公司列表 
 */
const getDivisionCompanyList = (adminIds) => fetch.get('/adminManage/divisionCompanyList', { adminIds })


export {
    getRoleGroupList, getGroupAdminList, getEntrustAdminList, getDivisionCompanyList
}