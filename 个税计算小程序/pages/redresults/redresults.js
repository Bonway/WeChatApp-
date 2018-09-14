// pages/redresults/redresults.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    Resultobj: {},
    RandomResults: {},
    HiddeCanvas: false,
    TaxObject: {},
    isIphoneX:false,
  },
  ReCreate: function () {
    getApp().globalData.NoShowBox = "false"
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onShareAppMessage: function () {
    var MoneyShare = new Number(this.data.Resultobj.MonthTaxSave)
    MoneyShare = MoneyShare.toFixed(0)
    return {
      title: '国家发红包啦，快来领取！',
      path: '/pages/index/index',
      imageUrl: '/images/ShareFriends.png',
    }
  },
  SharePic: function () {
    let data = JSON.stringify(this.data.Resultobj)
    wx.navigateTo({
      url: '../share/share?data=' + data
    })
  },
  SaveCanvas: function () {
    wx.getSetting({
       success:function success(res){
         var authSetting = res.authSetting;
         if(authSetting['scope.writePhotosAlbum'] == false){
           wx.showModal({
             title: '用户未授权',
             content: '如需正常使用保存图片功能，请点击确定进入授权管理中选中用户信息，再次点击确定后，重新进入小程序即可正常使用。',
             showCancel:false,
             success:function(res){
               if(res.confirm){
                 wx.openSetting({
                   success:function success(res){
                   }
                 })
               }
             }
           })
         }
         if (authSetting['scop.writePhotosAlbum']==true){       
         }
       },
       fail:function fail(res){
         wx.showModal({
           title: '获取授权失败',
           content: '请联系客服'
         })
         }
    })

    var context = wx.createCanvasContext('mycanvas', this)
    context.drawImage("../../images/SharePic.png", 0, 0, 375, 603)
    var money = "¥" + this.data.Resultobj.YearTaxSave
    //画钱
    context.setFontSize(40)
    context.setFillStyle('#FF5B5B')
    context.setTextAlign('center')
    context.fillText(money, 185, 270)
    context.stroke();
    //每年
    context.setFontSize(12)
    context.setFillStyle('#BBBBBB')
    context.setTextAlign('left')
    context.fillText("每年", 290, 267)
    context.stroke();
    context.draw();
    var that = this;
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
           width: 375,
           height: 603,
          // destWidth: 750,
          // destHeight: 1214,
          success: function (res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功',
                })
                //不跳转
                //  let data = JSON.stringify(that.data.TaxObject)
                // wx.navigateTo({
                //   url: '../results/results?data=' + data,
                // })
              },
              fail() {
                console.log('保存失败')
              }
            });
          }
        })
      }
    })
  },

  GoLower:function(e){
    console.log(e)
    console.log("lower")
    wx.pageScrollTo({
      scrollTop: 1100,
      duration:400,
    })
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    console.log(isIphoneX)
    this.data.isIphoneX = isIphoneX
    this.data.Resultobj = JSON.parse(options.data)
    this.setData({
      isIphoneX: isIphoneX,
      Resultobj: this.data.Resultobj,
      RandomResults: util.RandomResults(this.data.Resultobj.YearTaxSave),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function (e) {
  //   console.log(e)
  //   console.log("haha")
  // },

  /**
   * 下滑至底部2
   */
  // onPageScroll: function (e) {
  //   console.log(e)
  //   if (this.data.isIphoneX == true){
  //     if (e.scrollTop > 150 && e.scrollTop < 400) {
  //       wx.pageScrollTo({
  //         scrollTop: 1000,
  //         duration: 1000,
  //       })
  //     }
  //   }
  //   else {
  //     if (e.scrollTop > 150 && e.scrollTop < 400) {
  //       wx.pageScrollTo({
  //         scrollTop: 1300,
  //         duration: 1000,
  //       })
  //     }}
  // }
})