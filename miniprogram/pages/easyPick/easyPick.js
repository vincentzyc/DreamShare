Page({
  /**
   * 页面的初始数据
   */
  data: {
    palying: false,
    localOption: [],
    localPrizes: [],
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
  onShareTimeline() {
    return {
      title: '帮你选'
    }
  },
  onShareAppMessage() {
    return {
      title: '帮你选'
    }
  },
  inputOption(e) {
    const value = e.detail.value
    const index = e.currentTarget.dataset.index
    this.data.prizes[index].fonts[0].text = value
    this.setData({
      prizes: this.data.prizes
    })
  },
  start() {
    if (this.data.palying) return
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    this.setData({
      palying: true
    })
    // 调用play方法开始旋转
    child.lucky.play()
    //缓存历史转盘
    this.saveInHistory(this.data.prizes)
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引
      const index = parseInt(Math.random() * this.data.prizes.length)
      // 调用stop方法然后缓慢停止
      child.lucky.stop(index)
      this.setData({
        palying: false
      })
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
  unique(arr) {
    let newArr = []
    try {
      const narr = arr.map(l1 => JSON.stringify(l1.map(v => ({ fonts: v.fonts }))))
      newArr = [...new Set(narr)].map(v => JSON.parse(v))
    } catch (error) {
      console.log(error);
    }
    return newArr
  },
  saveInHistory(options) {
    try {
      const value = wx.getStorageSync(app.localKeys.easyPickOptions)
      if (Array.isArray(value)) {
        value.unshift(options)
        const uniOption = this.unique(value)
        if (uniOption.length > 10) uniOption.pop()
        wx.setStorage({
          key: app.localKeys.easyPickOptions,
          data: uniOption
        })
        this.formatLocalOption(uniOption)
      } else {
        const uniOption = this.unique([options])
        wx.setStorage({
          key: app.localKeys.easyPickOptions,
          data: uniOption
        })
        this.formatLocalOption(uniOption)
      }
    } catch (e) {
      console.log(e);
    }
  },
  deleteOptions(e) {
    const index = e.currentTarget.dataset.index
    this.data.prizes.splice(index, 1)
    this.setData({
      prizes: this.data.prizes
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
  formatLocalOption(arr) {
    const textList = []
    arr.forEach(l1 => {
      let temText = []
      l1.forEach(l2 => temText.push(l2.fonts[0].text))
      textList.push(temText)
    });
    this.setData({
      localOption: textList,
      localPrizes: arr
    })
  },
  useOption(e) {
    wx.showModal({
      title: '提示',
      content: '确定使用此选项替换现有选项？',
      success: res => {
        if (res.confirm) {
          const i = e.currentTarget.dataset.index
          const option = this.data.localPrizes[i]
          if (Array.isArray(option)) {
            const newOption = option.map(v => ({ ...v, background: this.getRandomColor() }))
            this.setData({
              prizes: newOption
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteOption(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除此项历史记录？',
      success: res => {
        if (res.confirm) {
          const i = e.currentTarget.dataset.index
          this.data.localOption.splice(i, 1)
          this.data.localPrizes.splice(i, 1)
          this.setData({
            localOption: this.data.localOption,
            localPrizes: this.data.localPrizes
          })
          const uniOption = this.unique(this.data.localPrizes)
          wx.setStorage({
            key: app.localKeys.easyPickOptions,
            data: uniOption
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const value = wx.getStorageSync(app.localKeys.easyPickOptions)
    if (Array.isArray(value) && value.length > 0) this.formatLocalOption(value)
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