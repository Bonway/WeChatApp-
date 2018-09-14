//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputpsue:false,
    blur_zero:"",
    blur_zero1:"",
    blur_zero2:"",
    showView_two:0,
    image_btn:'/img/button_0.png',
    date:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  remove_btn: function () {
    this.setData({
      showView_two: 1
    });
  },
  close_btn: function () {
    this.setData({
      showView_two: 0
    });
  },
  blur:function(e){
      this.setData({
        blur_zero:e.detail.value
      });
      var blur_zero=this.data.blur_zero;
      var blur_zero1 = this.data.blur_zero1;
      var blur_zero2 = this.data.blur_zero2;
      if(blur_zero==""||blur_zero1==""||blur_zero2==""){
        this.setData({
            inputpsue:false
        });
      }else{
        this.setData({
          inputpsue: true ,
          image_btn: '/img/button_lian.png'
        });
      }
  },
  blur1: function (e) {
    this.setData({
      blur_zero1: e.detail.value
    });
    var blur_zero = this.data.blur_zero;
    var blur_zero1 = this.data.blur_zero1;
    var blur_zero2 = this.data.blur_zero2;
    if (blur_zero == "" || blur_zero1 == "" || blur_zero2 == "") {
      this.setData({
        inputpsue: false
      });
    } else {
      this.setData({
        inputpsue: true,
        image_btn: '/img/button_lian.png'
      });
    }
  },
  blur2: function (e) {
    this.setData({
      blur_zero2: e.detail.value
    });
    var blur_zero = this.data.blur_zero;
    var blur_zero1 = this.data.blur_zero1;
    var blur_zero2 = this.data.blur_zero2;
    if (blur_zero == "" || blur_zero1 == "" || blur_zero2 == "") {
      this.setData({
        inputpsue: false
      });
    } else {
      this.setData({
        inputpsue: true,
        image_btn: '/img/button_lian.png'
      });
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDateChange:function(e){
    console.log(e)
   
  }
})
