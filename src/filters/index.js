import dayjs from "dayjs";
export function timeAgo(time) {
  let date1 = dayjs(Date.now());
  let date2 = dayjs(time);
  let minute = date1.diff(date2, "minute");
  let hour = date1.diff(date2, "hour");
  let day = date1.diff(date2, "day");
  if (minute < 60) {
    return `${minute}分钟`;
  } else if (hour < 24) {
    return `${hour}小时`;
  } else {
    return `${day}天`;
  }
}

// 限制文字显示字数
export function limit(val, param) {
  let result = val;
  if (result && result.length > param) {
    result = result.substring(0, param) + "...";
  }
  return result;
}

//时间戳转换为时间
export function dataFormat(time) {
  time = Number(time);
  return dayjs(time);
}
