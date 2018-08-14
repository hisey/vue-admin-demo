/* 系统管理模块api
 */

import fetch from '../utils/fetch'

/*
获取角色列表 
 */
const getRoleList = () => fetch.get('/adminManage/roleList', {})


const getAreaList = () => fetch.get('/adminManage/areaList', {})


/* 
用户列表 
*/
const getAdminsList = (currPage, pageSize, roleId, groupId, searchType, searchWord, isWork) => fetch.get('/adminManage/showAdminsList', {
  currPage, //页号
  pageSize, //页大小
  roleId,  //角色ID
  groupId,  //组别ID
  searchType,  //搜索类型 
  searchWord, //搜索关键字
  isWork, //职位状态 
})

/**
 * 添加用户
 */
const addAdmins = (name, mobile, password, area, roleId, groupId, status, doorArea) => fetch.post('/adminManage/addAdmins', {
  name,
  mobile,
  password,
  area,
  roleId,
  groupId,
  status,
  doorArea
})
const editAdmins = (name, password, mobile, area, roleId, groupId, status, doorArea, id) => fetch.post('/adminManage/editAdmins', {
  name,
  password,
  mobile,
  area,
  roleId,
  groupId,
  status,
  doorArea,
  id,
})

// 通过id 获取用户信息
const getAdminInfo = (adminId) => fetch.get('/adminManage/getAdminsInfo', {
  adminId
})

// 获取角色组列表
const getRoleGroupList = () => fetch.get('/adminManage/roleGroupList', {

})

// 获取公司列表
const showCompanyList = (currPage, pageSize, companyName, companyRankCode, contactName, adminName) => fetch.get('/adminManage/showCompanyList', {
  currPage, pageSize, companyName, companyRankCode, contactName, adminName
})

// 获取公司信息
const getCompanyInfo = (companyId) => fetch.get('/adminManage/getCompanyInfo', {
  companyId
})


// 获取对接人列表
const entrustAdminList = () => fetch.get('/adminManage/entrustAdminList', {

})

//新增公司 
const addCompany = (companyName, companyRankCode, contactName, contactMobile, corporationName, firstTimeFormat, companyAddress, bankName, accountName, account, adminId, ) => fetch.post('/adminManage/addCompany', {
  companyName,
  companyRankCode,
  contactName,
  contactMobile,
  corporationName,
  firstTimeFormat,
  companyAddress,
  bankName,
  accountName,
  account,
  adminId,
})

//编辑公司
const editCompany = (companyId, companyName, companyRankCode, contactName, contactMobile, corporationName, firstTimeFormat, companyAddress, bankName, accountName, account, adminId, ) => fetch.post('/adminManage/editCompany', {
  companyId,
  companyName,
  companyRankCode,
  contactName,
  contactMobile,
  corporationName,
  firstTimeFormat,
  companyAddress,
  bankName,
  accountName,
  account,
  adminId,
})
/* 待审核列表
*/
// const waitApprovalList = (page, size, contentType, contentData) => fetch.get('/entrustManager/waitApprovalList', {
//     page,  //页码
//     size,  //每页条数
//     contentType,  //内容类型
//     contentData, //内容参数
// })

// /* 审批查看
// */
// const approvalView = (parm) => fetch.get('/entrustManager/approvalView', {
//     parm, //id
// })

/*重置密码  */
const resetPassword = (adminId, password, confirmPassword) => fetch.post('/adminManage/resetPassword',{ adminId, password, confirmPassword })

export {
  getRoleList, getAdminsList, addAdmins, getAdminInfo, getRoleGroupList, editAdmins, showCompanyList, getCompanyInfo, entrustAdminList, addCompany, editCompany, getAreaList, resetPassword
  // , waitApprovalList, approvalView
}