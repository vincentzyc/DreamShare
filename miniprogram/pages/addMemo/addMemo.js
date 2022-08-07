// pages/addMemo.js
import { formatDate } from "../../utils/index";

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curId: '',
    title: '',
    content: '',
    textareaSize: { minHeight: 150 }
  },
  handleClickSave() {
    const checkRes = this.verifyData()
    if (checkRes === true) {
      this.addLocalSave()
    } else {
      wx.showToast({
        title: checkRes,
        icon: 'error'
      })
    }
  },
  verifyData() {
    if (this.data.title === '') return '请输入标题'
    if (this.data.content === '') return '请输入内容'
    return true
  },
  addLocalSave() {
    const param = {
      id: Date.now(),
      title: this.data.title,
      content: this.data.content,
      createTime: formatDate(),
      updateTime: formatDate()
    }
    this.localSave(param)
  },
  localSave(data) {
    try {
      const value = wx.getStorageSync(app.localKeys.memoList)
      if (Array.isArray(value)) {
        value.unshift(data)
        wx.setStorage({
          key: app.localKeys.memoList,
          data: value
        })
      } else {
        wx.setStorage({
          key: app.localKeys.memoList,
          data: [data]
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
  getCurMemo() {
    const value = wx.getStorageSync(app.localKeys.memoList)
    console.log(value);
    if (Array.isArray(value) && value.length > 0) {
      const curMemo = value.find(v => v.id == this.data.curId)
      console.log(curMemo);
      if (curMemo) {
        this.setData({
          curId: curMemo.curId,
          title: curMemo.title,
          content: curMemo.content,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      curId: options.id || ""
    })
    this.getCurMemo()
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