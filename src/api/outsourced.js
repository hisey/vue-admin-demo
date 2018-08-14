/* 案件模块api
 */

import fetch from '../utils/fetch'

/* 案件列表 
*/
const entrustManageList = (page, size, contentType, contentData) => fetch.get('/entrustManager/entrustManageList', {
    page,
    size,
    contentType,  //内容类型
    contentData  //内容参数
})

/* 待审核列表
*/
const waitApprovalList = (page, size, contentType, contentData, status) => fetch.get('/entrustManager/waitApprovalList', {
    page,
    size,
    contentType,  //内容类型
    contentData, //内容参数
    status  //案件状态,
})

/* 审批查看
*/
const approvalView = (parm) => fetch.get('/entrustManager/approvalView', {
    parm, //id
})

/**
 * 审批
 */
const approvalCheck = (collectionApplyIds, status, rejectReason, remark) => fetch.post('/entrustManager/approvalCheck',{
  collectionApplyIds, //申请表id集
  status, //审核状态（0待审批;1通过;2已拒绝）
  rejectReason, //拒绝原因
  remark //备注
})

/**
 * 下载待审批列表
 */
const downloadEntrustManageList = (page, size, contentType, contentData, status) => fetch.get('/entrustManager/downloadEntrustManageList', {
  page,
  size,
  contentType,  //内容类型
  contentData, //内容参数
  status  //案件状态
})

/**
 * 下载待审批列表
 */
const downloadWaitApprovalList = (page, size, contentType, contentData, status) => fetch.get('/entrustManager/downloadWaitApprovalList', {
  page,
  size,
  contentType,  //内容类型
  contentData, //内容参数
  status  //案件状态
})

export {
  entrustManageList, waitApprovalList, approvalView, approvalCheck, downloadEntrustManageList, downloadWaitApprovalList
}