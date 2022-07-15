// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
/**
 * 时间格式化
 * @param {格式化时间格式,yyyy-mm-dd HH:MM:SS} fmt 
 * @param {需要格式化的时间对象,默认new Date()} date 
 */
function formatDate(fmt, date) {
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

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * event 参数包含小程序端调用传入的 data
 */
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  const db = cloud.database()

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()

  const openid = wxContext.OPENID
  //获取数据库中当前用户的备忘信息
  const res = await db.collection("memo").where({
    _openid: openid
  }).get()

  // if (res.data.length > 0) {
  //   userType = res.data[0].user_type
  //   await db.collection('memo').where({
  //     _openid: openid
  //   }).update({
  //     data: {
  //       last_login_time: formatDate()
  //     }
  //   })
  // } else {
  //   userType = 1
  //   await db.collection('memo').add({
  //     data: {
  //       _openid: openid,
  //       user_type: 1,
  //       register_time: formatDate()
  //     }
  //   })
  // }

  return {
    event,
    data: res.data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

