import fetch from '../utils/fetch'

import {
  DivisionStata
} from "@/enumerate";

/* 
 电催列表或队列列表 
 */
const phoneCollectionList = (status, page, size, contentType, contentData, timeType, startTimeData, endTimeData) => fetch.get('/divisionManager/phoneCollectionList', {
  status: DivisionStata[status], //状态
  page, //页码
  size, //每页条数
  contentType, //内容类型
  contentData, //内容参数
  timeType, //日期类型
  startTimeData, //开始日期
  endTimeData, //结束日期 
})

/* 加入电催队列 */
const joinPhoneDivisionArray = (parm, status) => fetch.post('/divisionManager/joinPhoneDivisionArray', {
  parm, //id组成的字符串
})

/* 加入队列 */
const joinEntrustDivisionArray = (parm, status) => fetch.post('/divisionManager/joinEntrustDivisionArray', {
  parm, //id组成的字符串
})

/*重新加入队列  */
const afreshDivision = (parm) => fetch.post('/divisionManager/afreshDivision', {
  parm //id组成的字符串
})

/* 踢出电催队列 */
const quitPhoneDivisionArray = (parm, status) => fetch.post('/divisionManager/quitPhoneDivisionArray', {
  parm,
})

/* 踢出队列 */
const quitEntrustDivisionArray = (parm, status) => fetch.post('/divisionManager/quitEntrustDivisionArray', {
  parm,
})

/* 确定 */
const confirmPhoneDivision = (parm) => fetch.post('/divisionManager/confirmPhoneDivision', {
  parm
})

/* 列表 */
const entrustCollectionList = (status, page, size, contentType, contentData, timeType, startTimeData, endTimeData) => fetch.get('/divisionManager/entrustCollectionList', {
  status: DivisionStata[status], //状态
  page, //页码
  size, //每页条数
  contentType, //内容类型
  contentData, //内容参数
  timeType, //日期类型
  startTimeData, //开始日期
  endTimeData, //结束日期 
})

/*案件重新退回给电催团队  */
const backDivision = (parm) => fetch.post('/divisionManager/backDivision', {
  parm //id组成的字符串
})

/*案件重新退回给电催团队  */
const joinWaitArray = (parm) => fetch.post('/divisionManager/joinWaitArray', {
  parm //id组成的字符串
})


/*获取预览数据  */

const previewEntrustDivision = (parm, arg) => fetch.post('/divisionManager/previewEntrustDivision', {
  parm, //id组成的字符串
  arg
})

/*获取电催预览数据  */

const previewPhoneDivision = (parm, arg) => fetch.post('/divisionManager/previewPhoneDivision', {
  parm, //id组成的字符串
  arg
})

/*确定  */

const confirmEntrustDivision = (parm) => fetch.post('/divisionManager/confirmEntrustDivision', {
  parm, //id组成的字符串
})

/*案件归属  */

const belongCollectionList = (page, size, contentType, contentData) => fetch.get('/divisionManager/belongCollectionList', {
  page, //页码
  size, //每页条数
  contentType, //内容类型
  contentData, //内容参数
})

const downloadPhoneCollectionList = (status, page, size, contentType, contentData, timeType, startTimeData, endTimeData) => fetch.get('/divisionManager/downloadPhoneCollectionList', {
  status: DivisionStata[status], //状态
  page, //页码
  size, //每页条数
  contentType, //内容类型
  contentData, //内容参数
  timeType, //日期类型
  startTimeData, //开始日期
  endTimeData, //结束日期 
})

const downloadEntrustCollectionList = (status, page, size, contentType, contentData, timeType, startTimeData, endTimeData) => fetch.get('/divisionManager/downloadEntrustCollectionList', {
  status: DivisionStata[status], //状态
  page, //页码
  size, //每页条数
  contentType, //内容类型
  contentData, //内容参数
  timeType, //日期类型
  startTimeData, //开始日期
  endTimeData, //结束日期 
})
export {
  phoneCollectionList, //获取电催列表
  joinPhoneDivisionArray, //加入电催队列
  joinEntrustDivisionArray, //加入队列
  afreshDivision, //重新
  quitPhoneDivisionArray, //退出电催队列
  quitEntrustDivisionArray, //退出队列
  entrustCollectionList, //获取列表
  backDivision, //退回电催
  previewEntrustDivision, //预览案件
  previewPhoneDivision, //预览电催案件
  confirmPhoneDivision, //确认电催
  confirmEntrustDivision, //确定
  belongCollectionList, //案件归属,
  downloadPhoneCollectionList, //下载电催案件列表
  downloadEntrustCollectionList,  //下载案件列表
  joinWaitArray,//加入电催
}
