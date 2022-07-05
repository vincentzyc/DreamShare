Page({
  /**
   * 页面的初始数据
   */
  data: {
    memos: [
      { text: '选项1', background: '#e9e8fe' },
      { text: '选项2', background: '#b8c5f2' },
    ],
  },
  addMemoss() {
    this.data.memos.push({ text: '选项' + (this.data.memos.length + 1), background: this.getRandomColor() })
    this.setData({
      memos: this.data.memos
    })
  },
  getRandomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
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