/* 
催收管理模块API
 */

import fetch from '../utils/fetch'
/* 
逾期账户列表
 */
const overdueBidList = (page, size, contentType, contentData, isCommitmentRepay, queryType, startData, endData) => fetch.get('/bidManager/overdueBidList', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    isCommitmentRepay, //是否承诺还款 0：否 1：是
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})

/* 
逾期导出
 */
const exportOverdueBids = (page, size, contentType, contentData, isCommitmentRepay, queryType, startData, endData) => fetch.get('/bidManager/exportOverdueBids', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    isCommitmentRepay, //是否承诺还款 0：否 1：是
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})

/* 
已还款账户列表
 */

const payedBidList = (page, size, contentType, contentData, isCommitmentRepay, queryType, startData, endData) => fetch.get('/bidManager/payedBidList', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    isCommitmentRepay, //是否承诺还款 0：否 1：是
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})

/* 
已还款导出
 */
const exportPayedBids = (page, size, contentType, contentData, isCommitmentRepay, queryType, startData, endData) => fetch.get('/bidManager/exportPayedBids', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    isCommitmentRepay, //是否承诺还款 0：否 1：是
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})





/* 
已结清账户列表
 */
const getSettleBidsList = (page, size, contentType, contentData, queryType, startData, endData) => fetch.get('/bidManager/getSettleBidsList', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})
/* 
已结清导出
 */
const exportSettleBids = (page, size, contentType, contentData, queryType, startData, endData) => fetch.get('/bidManager/exportSettleBids', {
    page, //页码
    size, //每页条数
    contentType, //内容类型(1客户姓名；2手机号；3订单号；4客户地区；5催收负责人)
    contentData, //内容参数
    queryType, //查询类型(1逾期天数；2逾期总额；3逾期期数4:借款日期 5：结清日期)
    startData, //开始日期
    endData, //结束日期 
})


/* 账户基本信息 
*/
const baseInfoDetail = (bidId) => fetch.get('/bidDetailManager/baseInfoDetail', {
    bidId,  //催收账户ID
})

/* 催收记录列表 
*/
const collectionRecordList = (bidId, page, size) => fetch.get('/bidDetailManager/collectionRecordList', {
    bidId,  //催收账户ID
    page,  //当前页
    size,  //要显示的个数
})

/* 账单记录列表 
*/
const billInfoDetail = (bidId) => fetch.get('/bidDetailManager/billInfoDetail', {
    bidId,  //催收账户ID
})

/* 外访记录列表 
*/
const outboundRecordList = (bidId, page, size) => fetch.get('/bidDetailManager/outboundRecordList', {
    bidId,  //催收账户ID，
    page: page || 1,
    size: size || 20,
})

/* 委外记录列表 
*/
const entrustRecordList = (bidId, page, size) => fetch.get('/bidDetailManager/entrustRecordList', {
    bidId,  //催收账户ID，
    page: page || 1,
    size: size || 20,
})

/* 
获取催收短信模板
*/
const getMsgTemplate = (bidId) => fetch.get('/bidDetailManager/getMsgTemplate', { bidId })

/* 
同步数据
*/
const syncManual = (orderNumber) => fetch.get('/syncManager/syncManual', { orderNumber })

/* 
获取逾期最久账单明细
 */
const getTheLatestOverBill = (bidId) => fetch.get('/bidDetailManager/getTheLatestOverBill', { bidId })

const sendMsgToUser = (mobile, content) => fetch.post('/bidDetailManager/sendMsgToUser', {
    mobile: "18961880576",
    content
})

/* 
获取通讯录
 */
const phoneBookDetail = (bidId) => fetch.get('/bidDetailManager/phoneBookDetail', { bidId })

/* 
通话详单
 */
const callDetail = (bidId) => fetch.get('/bidDetailManager/callDetail', { bidId })

/*
位置信息 
 */
const locationDetail = (bidId) => fetch.get('/bidDetailManager/locationDetail', { bidId })

/* 
获取委外公司
 */
const getCompanyInfo = (bidId) => fetch.get('/bidDetailManager/getCompanyInfo', { bidId })

/* 
保存催收记录 
*/
const saveCollectionRecord = (collectionBidId, name, mobile, relation, status, commitmentTime, commitmentAmount, remark, collectionTime, entrustCompanyId, ) => fetch.post('/bidDetailManager/saveCollectionRecord', {
    collectionBidId,
    name,
    mobile,
    relation,
    status,
    commitmentTime,
    commitmentAmount,
    remark,
    collectionTime,
    entrustCompanyId,
})

/* 
保存线下凭证
 */

const savePayedProof = (bidId, billId, amount, memo, filePath) => fetch.post('/bidDetailManager/savePayedProof', {
    bidId,
    billId,
    amount,
    memo,
    filePath
})

/* 
获取催收记录
*/

const getCollectionInfo = (bidId) => fetch.get('/bidDetailManager/getCollectionInfo', { bidId })

/*
保存委外申请记录 
 */
const saveEntrustApplyRecord = (state, applyReason, collectionBidId) => fetch.post('/bidDetailManager/saveEntrustApplyRecord', {
    state,
    collectionBidId,
    applyReason,
})

/*
保存外访申请记录 
 */
const saveOutboundApplyRecord = (state, applyReason, collectionBidId, address, companyAddress, otherAddress) => fetch.post('/bidDetailManager/saveOutboundApplyRecord', {
    state,
    collectionBidId,
    applyReason,
    address,
    companyAddress,
    otherAddress
})

const riskInfoDetail = (bidId) => fetch.get('/bidDetailManager/riskInfoDetail', {
    bidId
})


export {
    baseInfoDetail,
    collectionRecordList,
    billInfoDetail,
    outboundRecordList,
    entrustRecordList,
    getMsgTemplate,
    syncManual,
    getTheLatestOverBill,
    overdueBidList,     //逾期列表
    exportOverdueBids,  //导出逾期列表
    payedBidList,       //已还款列表
    exportPayedBids,    //导出已还款列表
    exportSettleBids,
    getSettleBidsList,
    sendMsgToUser,
    phoneBookDetail,
    callDetail,
    locationDetail,
    getCompanyInfo,
    saveCollectionRecord,
    savePayedProof,
    getCollectionInfo,
    saveEntrustApplyRecord,  //委外申请
    saveOutboundApplyRecord,  //外访申请
    riskInfoDetail, //获取风控报告链接
}