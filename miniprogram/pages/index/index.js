//index.js
const app = getApp()

Page({
  data: {
    mainActiveIndex: 0,
    activeId: null,
    items: [
      {
        text: '所有城市', // 导航名称
        children: [
          {
            text: '温州',
            id: 1
          },
          {
            text: '杭州',
            id: 2,
          },
        ],
      },
      {
        text: '所有城市1', // 导航名称
        children: [
          {
            text: '温州1',
            id: 11
          },
          {
            text: '杭州1',
            id: 22,
          },
        ],
      },
    ],
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    openid: '',
    userType: 1,
    hasUserInfo: false,
    // canIUseOpenData:false
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.onLogin()
  },
  onLogin: function () {
    // wx.showLoading({
    //   title: '登录中',
    // })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        app.globalData.userType = res.result.userType
        this.setData({
          openid: res.result.openid,
          userType: res.result.userType
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取 openid 失败，请检查是否有部署 login 云函数',
        })
        console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
      },
      complete: () => {
        // wx.hideLoading()
      }
    })
  },
  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        this.onLogin()
      }
    })
  },
  gotxdocszc() {
    wx.navigateToMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: 'pages/detail/detail.html?url=https%3A%2F%2Fdocs.qq.com%2Fsheet%2FDWXJ1SlR0S1hXanJO%3Fu%3D10c9fbb89b964f1a9eb49f9fa136b8d6',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res)
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  //打开腾讯文档
  gotxdocssr() {
    wx.navigateToMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: 'pages/detail/detail.html?url=https%3A%2F%2Fdocs.qq.com%2Fsheet%2FDWUxTdlJVd29Fcmd1%3Fu%3D10c9fbb89b964f1a9eb49f9fa136b8d6',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res)
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
  //添加微信
  addwx() {
    wx.previewImage({
      current: 'https://636c-cloud1-2gm18tth32ee91d4-1305690004.tcb.qcloud.la/wechat.png?sign=461eeddb3749f6cc25fef84db187aee0&t=1624551272', // 当前显示图片的http链接
      urls: ['https://636c-cloud1-2gm18tth32ee91d4-1305690004.tcb.qcloud.la/wechat.png?sign=461eeddb3749f6cc25fef84db187aee0&t=1624551272'] // 需要预览的图片http链接列表
    })
  }
})
