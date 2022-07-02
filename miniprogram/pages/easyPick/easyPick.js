Page({
  /**
   * 页面的初始数据
   */
  data: {
    blocks: [{ padding: '13px', background: '#617df2' }],
    prizes: [
      { fonts: [{ text: '选项1', top: '30' }], background: '#e9e8fe' },
      { fonts: [{ text: '选项2', top: '30' }], background: '#b8c5f2' },
    ],
    buttons: [
      { radius: '50px', background: '#617df2' },
      { radius: '45px', background: '#afc8ff' },
      {
        radius: '40px', background: '#869cfa',
        pointer: true,
        fonts: [{ text: '帮你选', top: '-10px' }]
      },
    ],
  },
  start() {
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    // 调用play方法开始旋转
    child.lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引
      const index = parseInt(Math.random() * this.data.prizes.length)
      // 调用stop方法然后缓慢停止
      child.lucky.stop(index)
    }, 3000)
  },
  end(event) {
    // 中奖奖品详情
    console.log(event.detail)
    wx.showModal({
      title: '结果',
      showCancel: false,
      content: event.detail.fonts[0].text
    })
  },
  addOptions() {
    this.data.prizes.push({ fonts: [{ text: '选项' + (this.data.prizes.length + 1), top: '30' }], background: this.getRandomColor() })
    this.setData({
      prizes: this.data.prizes
    })
  },
  getRandomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
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