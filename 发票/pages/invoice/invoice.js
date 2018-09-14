//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showView: true,
    showView_two: false,
    active: 0,
    active1: 1,
    list: [
      {},
      {},
      {},
      {},
      {}
    ],
    showNum: 1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  upper: function () {
    console.log(1111)
    let data = this.data.list,
      k = this.data.showNum,
      that = this;
    if (k <= 3) {
      k++;
      for (var i = 0; i < 1; i++) {
        data.push({})
      }
      that.setData({
        show: false
      })
      setTimeout(function () {
        that.setData({
          list: data,
          show: true,
          showNum:k
        })
      }, 2000)
    }
  },
  href_four: function (e) {
    console.log(e)
    this.setData({
      active: 0,
      active1: 1,
      showView: true,
      showView_two: false,
    })
  },
  href_five: function (e) {
    console.log(e)
    this.setData({
      active: 1,
      active1: 0,
      showView: false,
      showView_two: true,
    })
  },
  href_three: function () {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
