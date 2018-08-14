/* 案件模块api
 */

import fetch from '../utils/fetch'

/* 案件列表 
*/
const outBoundList = (currPage, pageSize, searchType, keyWord, searchRangeType, min, max, outboundStatus, dateTime) => fetch.get('/outBoundManage/outBoundList', {
  currPage,  //页码
  pageSize,  //每页条数
  searchType,  //内容类型
  keyWord,  //内容参数
  searchRangeType,  //范围搜索类型
  min,  //范围搜索最小值
  max,  //范围搜索最大值
  dateMin: dateTime[0] || "",  //日期时间搜索最小值
  dateMax: dateTime[1] || "",  //日期时间搜索最大值
  outboundStatus,  //状态
})

/* 审批案件列表
*/
const outApproveList = (currPage, pageSize, searchType, keyWord, status) => fetch.get('/outBoundManage/outApproveList', {
  currPage,  //页码
  pageSize,  //每页条数
  searchType,  //内容类型
  keyWord, //内容参数
  status
})

/* 审批查看
*/
const outRecordDetail = (applyId) => fetch.get('/outBoundManage/outRecordDetail', {
  applyId, //id
})

/**
 * 审批录入
 */
const addOutRecord = (collectId, applyId, name, orderNumber, outboundAddress, outboundTime, outboundStore, outboundPerson, contactState, commitmentTime, commitmentAmount, feedback) => fetch.post('/outBoundManage/addOutRecord', {
  collectId, //ID
  applyId, //申请ID
  name, //客户姓名
  orderNumber, //订单号
  outboundAddress, //地址
  outboundTime, //日期
  outboundStore, //门店
  outboundPerson, //人员
  contactState, //接触情况
  commitmentTime, //承诺日期
  commitmentAmount, //承诺金额
  feedback, //情况反馈
})

/**
 * 审批通过/拒绝
 */
const batchOutApprove = (applyIds, handleCode, rejectReason, remark) => fetch.post('/outBoundManage/batchOutApprove', {
  applyIds, //待审批案件ID数组
  handleCode, //待审批案件通过/拒绝操作码[1:批量通过 2:批量拒绝]
  rejectReason,
  remark,
})

/*
批量导出案件 
 */
const downloadOutBound = (currPage, pageSize, searchType, keyWord, searchRangeType, min, max, outboundStatus, dateTime) => fetch.get('/outBoundManage/downloadOutBound', {
  currPage,  //页码
  pageSize,  //每页条数
  searchType,  //内容类型
  keyWord,  //内容参数
  searchRangeType,  //范围搜索类型
  min,  //范围搜索最小值
  max,  //范围搜索最大值
  outboundStatus,  //状态
  dateMin: dateTime[0] || "",  //日期时间搜索最小值
  dateMax: dateTime[1] || "",  //日期时间搜索最大值
})

const downloadOutApprove = (currPage, pageSize, searchType, keyWord, status) => fetch.get('/outBoundManage/downloadOutBound', {
  currPage,  //页码
  pageSize,  //每页条数
  searchType,  //内容类型
  keyWord, //内容参数
  status
})


export {
  outBoundList, outApproveList, outRecordDetail, addOutRecord, batchOutApprove, downloadOutBound, downloadOutApprove
}