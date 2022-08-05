const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    memos: [],
  },
  handLongpress(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除此记事？',
      success: res => {
        if (res.confirm) {
          const i = e.currentTarget.dataset.index
          const memo = this.data.memos[i]
          if (memo) {
            this.data.memos.splice(i, 1)
            this.setData({
              memos: this.data.memos
            })
            wx.setStorage({
              key: app.localKeys.memoList,
              data: this.data.memos
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addMemos() {
    wx.navigateTo({
      url: '../addMemo/addMemo',
    })
  },
  editMemos(e) {
    const i = e.currentTarget.dataset.index
    const memo = this.data.memos[i]
    wx.navigateTo({
      url: '../addMemo/addMemo?id=' + memo.id,
    })
  },
  getMemoList() {
    wx.cloud.callFunction({
      name: 'memo',
      data: {},
      success: res => {
        console.log(res);
        this.setData({
          memos: res.result.data,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取失败，请稍后重试',
        })
        console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
      },
      complete: () => {
        // wx.hideLoading()
      }
    })
  },
  onLogin: function () {
    // wx.showLoading({
    //   title: '登录中',
    // })
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
      return this.getMemoList()
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid,
        })
        this.getMemoList()
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
  getLocalMemo() {
    const value = wx.getStorageSync(app.localKeys.memoList)
    if (Array.isArray(value)) {
      this.setData({
        memos: value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLocalMemo()
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }
    // this.onLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})