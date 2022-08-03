// pages/addMemo.js
import { formatDate } from "../../utils";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    message: '',
    textareaSize: { minHeight: 150 }
  },
  handleClickSave() {
    const checkRes = this.verifyData()
    if (checkRes === true) {
      this.localSave()
    } else {
      wx.showToast({
        title: checkRes,
        icon: 'error'
      })
    }
  },
  verifyData() {
    if (this.data.title === '') return '请输入标题'
    if (this.data.message === '') return '请输入内容'
    return true
  },
  localSave() {
    const param = {
      title: '',
      content: '',
      createTime: formatDate(),
      updateTime: formatDate()
    }
    try {
      const value = wx.getStorageSync(app.localKeys.memoList)
      if (Array.isArray(value)) {
        value.unshift(param)
        wx.setStorage({
          key: app.localKeys.memoList,
          data: value
        })
      } else {
        wx.setStorage({
          key: app.localKeys.memoList,
          data: [param]
        })
      }
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
      wx.navigateTo({
        url: '../memo/memo',
      })
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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