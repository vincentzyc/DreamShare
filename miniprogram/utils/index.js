/**
 * 时间格式化
 * @param {格式化时间格式,yyyy-mm-dd HH:MM:SS} fmt 
 * @param {需要格式化的时间对象,默认new Date()} date 
 */
 export function formatDate(fmt, date) {
  fmt = fmt || 'yyyy-mm-dd HH:MM:SS'
  date = date || new Date()
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}