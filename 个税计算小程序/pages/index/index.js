//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TaxInput: {},
    XInput:'',//月入
    JInput: '',//抵扣
    KInput:'',//五险一金
    e1Input: '',//社保
    e2Input: '',//公积金
    SocialSafe:'',
    HouseSafe:'',
    TaxType:true,  //false 简单版
    HouseSelected:false,
    SocailSelected:false,
    BtnResults:false,
    Housefocus:false,
    Socialfocus:false,
    ResultObj:{},
    BoxShowing:true,
    imgUrls: [
      '../../images/banner@3x.png',
      '../../images/banner2@3x.png'
    ],
    itemurl: [
      'https://m.gaodun.com',
      'https://m.xiucai.com'
    ],
    swiperCurrent: '0'
  },
  //事件处理函数
  CheckResults:function(){
    if(this.data.XInput!=''){
    this.data.TaxInput.X = this.data.XInput
    this.data.TaxInput.J = this.data.JInput
    this.data.TaxInput.e1 = this.data.e1Input
    this.data.TaxInput.e2 = this.data.e2Input
    this.data.TaxInput.K = this.data.KInput
    if(this.data.TaxType == false){
      this.data.ResultObj =util.TaxEasy(this.data.TaxInput)
    }
    if (this.data.TaxType == true) {
      this.data.ResultObj = util.TaxPro(this.data.TaxInput)
    }
    let data = JSON.stringify(this.data.ResultObj)
    wx.navigateTo({
      url: '../redresults/redresults?data='+data
    })
    }
    else{
      return false
    }
  },
  ClearAll:function(){
    this.setData({
      XInput: '',
      JInput: '',
      KInput: '',
      e1Input: '',
      e2Input: '',
      SocialSafe: '',
      HouseSafe: '',
      HouseSelected: false,
      SocialSelected:false,
      BtnResults: false,
    })
  },
  onShareAppMessage:function(){
     return{
       title:'国家发红包啦，快来领取！',
       path:'/pages/index/index',
       imageUrl:'/images/ShareFriends.png',
     }
  },
  GotoBookUrl: function () {
    wx.navigateTo({
      url: '/pages/Webviews/WebViews'
    })
  },
  indexShare:function(){
  },
  ProSelect:function(){
      this.setData({
        TaxType: true
    })
  },
  EasySelect: function () {
    this.setData({
      TaxType: false
    })
  },
  SocailDefine:function () {
    if (this.data.SocailSelected == true){
      this.setData({
        SocailSelected: false,
        e1Input: this.data.SocialSafe,//社保
        Socialfocus: false,
      })
    }
    else  if (this.data.SocailSelected == false){
      this.data.e1Input = 0
      this.setData({
        SocailSelected: true,
        e1Input: 0,//社保
        Socialfocus: true,
      })
    }
  },
  HouseDefine: function () {
    if (this.data.HouseSelected == true) {
      this.setData({
        HouseSelected: false,
        e2Input: this.data.HouseSafe,//社保
        Housefocus: false,
      })
    }
    else if (this.data.HouseSelected == false) {
      this.data.e2Input = 0
      this.setData({
        HouseSelected: true,
        e2Input: 0,//社保
        Housefocus:true,
      })
    }
  },
  bindXInput: function (e) {
    if(e.detail.value==''){
      this.setData({
        BtnResults: false,
        XInput: e.detail.value,
        e1Input:0,
        e2Input:0,
      })
    }
    else{
      var safe = new Object();
      safe.X = e.detail.value
      var socail = util.SocialSafe(safe)
      var house = util.HouseSafe(safe)
      this.setData({
       XInput:e.detail.value,
       BtnResults:true,
        e1Input: socail,
        e2Input: house,
        SocialSafe: socail,
        HouseSafe: house,
      })
    }
  },
  bindJInput: function (e) {
    this.setData({
      JInput: e.detail.value
    })
  }, 
  bindKInput: function(e) {
    this.setData({
      KInput: e.detail.value
    })
  }, 
  binde1Input:function(e){
    this.setData({
      e1Input: e.detail.value
    })
  },
  focuse1:function(e){
    this.setData({
      e1Input:""
    })
  },
  binde2Input: function (e) {
    this.setData({
      e2Input: e.detail.value
    })
  },
  focuse1: function (e) {
    this.setData({
      e2Input: ""
    })
  },
  calmethods:function(){
    wx.navigateTo({
      url: '/packageList/pages/calmethods/calmethods'
    })
  },
  details: function () {
    wx.navigateTo({
      url: '/packageList/pages/details/details'
    })
  },
  taxlist: function () {
    wx.navigateTo({
      url: '/packageList/pages/taxlist/taxlist'
    })
  },
  CloseShowbox:function(){
   this.setData({
     BoxShowing: false
   })
  },
  //客服弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图跳转
  click_swip:function(e){

    console.log();
    console.log(this.data.itemurl[this.data.swiperCurrent]);
    // var url = ;
    // console.log(this.data.imgUrls[this.data.swiperCurrent])
    // wx.switchTab({
    //   url: url
    // })
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },

  onLoad: function () {
    var NoShowBox = app.globalData.NoShowBox
    let isIphoneX = app.globalData.isIphoneX;
    let isIphone5 = app.globalData.isIphone5;
    console.log("isIphoneX")
    console.log(isIphoneX)
    console.log("isIphone5")
    console.log(isIphone5)
    this.setData({
      isIphoneX: isIphoneX,
      isIphone5: isIphone5,
      TaxType: true
    })
    if (NoShowBox != null){
      this.setData({
        BoxShowing: false, 
      })
    }
    else{
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight,
          })
        }
      })
    var context = wx.createCanvasContext('showingPic', this)
      context.drawImage("../../images/ShowingPic.png", (((this.data.windowWidth - 263) / 2)), ((this.data.windowWidth - 311) / 1), 263, 311)
    context.draw();
    }
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
