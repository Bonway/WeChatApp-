const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/////简化版
//月收入X 现应纳税所得额Y1 新应纳税所得额Y2 现应纳税额R1 新应纳税额R2 五险一金K  使用税率Q 速算扣除数P 现个人起征点3500 新个人起征点5000 抵扣J
var TaxEasy = function(TaxInput){
  var ResultObj = new Object()
  ResultObj.oldTax = oldTaxGet(TaxInput).toFixed(2)
  ResultObj.newTax = newTaxGet(TaxInput).toFixed(2)
  ResultObj.oldTurn = oldTaxTurn(TaxInput).toFixed(2)
  ResultObj.newTurn = newTaxTurn(TaxInput).toFixed(2)
  ResultObj.MonthTaxSave = (ResultObj.oldTurn - ResultObj.newTurn).toFixed(2)
  ResultObj.YearTaxSave = (ResultObj.MonthTaxSave * 12).toFixed(2)
  return ResultObj
}
var oldTaxGet = function(TaxInput){
  return TaxInput.X - TaxInput.K - 3500
}
var newTaxGet = function (TaxInput){
  return TaxInput.X - TaxInput.K - 5000 - TaxInput.J
}
var oldTaxTurn = function(TaxInput){
  var Tax
  var ExMoney = TaxInput.X - TaxInput.K - 3500;
  if(ExMoney < 0 ){
     ExMoney = 0
  }
  if(ExMoney<=1500){
     return ExMoney *0.03
  }
  else if (1500 < ExMoney && ExMoney <= 4500){
    return (ExMoney *0.1) - 105
  }
  else if (4500 < ExMoney && ExMoney <= 9000) {
    return  (ExMoney * 0.2) - 555
  }
  else if (9000 < ExMoney && ExMoney <= 35000) {
    return  (ExMoney * 0.25) - 1005
  }
  else if (35000 < ExMoney && ExMoney <= 55000) {
    return  (ExMoney * 0.3) - 2755
  }
  else if (55000 < ExMoney && ExMoney <= 80000) {
    return (ExMoney * 0.35) - 5505
  }
  else if (80000 < ExMoney ) {
    return (ExMoney * 0.45) - 13505
  }
  else{
    return false
  }
 }
var newTaxTurn = function (TaxInput) {
  var Tax
  var ExMoney = TaxInput.X - TaxInput.K - 5000 - TaxInput.J;
  if (ExMoney < 0) {
    ExMoney = 0
  }
  if (ExMoney <= 3000) {
    return  ExMoney * 0.03
  }
  else if (3000 < ExMoney && ExMoney <= 12000) {
    return  (ExMoney * 0.1) - 210
  }
  else if (12000 < ExMoney && ExMoney <= 25000) {
    return  (ExMoney * 0.2) - 1410
  }
  else if (25000 < ExMoney && ExMoney <= 35000) {
    return (ExMoney * 0.25) - 2660
  }
  else if (35000 < ExMoney && ExMoney <= 55000) {
    return  (ExMoney * 0.3) - 4410
  }
  else if (55000 < ExMoney && ExMoney <= 80000) {
    return (ExMoney * 0.35) - 7160
  }
  else if (80000 < ExMoney) {
    return (ExMoney * 0.45) - 15160
  }
  else {
    return false
  }
 }
 ///////////专业版 e1社保基数 e2公积金基数
var TaxPro = function (TaxInput) {
  var ResultObj = new Object()
  if(TaxInput.e1 == ''){
    TaxInput.e1 = SocialSafe(TaxInput)
  }
  if (TaxInput.e2 == '') {
    TaxInput.e2 = HouseSafe(TaxInput)
  }
  TaxInput.a = TaxInput.e1 * 0.08 //养老
  TaxInput.b = TaxInput.e1 * 0.02  //医疗
  TaxInput.c = TaxInput.e1 * 0.005 //失业
  TaxInput.d = TaxInput.e2 * 0.07 //住房
  ResultObj.oldTax = oldTaxGet1(TaxInput).toFixed(2)
  ResultObj.newTax = newTaxGet1(TaxInput).toFixed(2)
  ResultObj.oldTurn = oldTaxTurn1(TaxInput).toFixed(2)
  ResultObj.newTurn = newTaxTurn1(TaxInput).toFixed(2)
  ResultObj.MonthTaxSave = (ResultObj.oldTurn - ResultObj.newTurn).toFixed(2)
  ResultObj.YearTaxSave = (ResultObj.MonthTaxSave * 12).toFixed(2)
  return ResultObj
}
var SocialSafe = function (TaxInput){
  var earn = TaxInput.X
  if (TaxInput.X <= 4279) {
    return 4279
  }
  if (4279 < TaxInput.X && TaxInput.X <= 21396) {
    return earn
  }
  if (TaxInput.X <= 21400 && 21396 < TaxInput.X) {
    return 21396
  }
  if (21400 < TaxInput.X ) {
    return  21396
  }
  else {
    return false
  }
} 
var HouseSafe = function (TaxInput) {
  var earn = TaxInput.X
  TaxInput.X = parseInt(TaxInput.X)
  if (TaxInput.X <= 2300) {
    return  2300
  }
  if (TaxInput.X <= 21400 && 2300 < TaxInput.X) {
    return earn
  }
  if (21400 < TaxInput.X) {
    return 21400
  }
  else {
    return false
  }
}
var oldTaxGet1 = function (TaxInput) {
  return TaxInput.X - TaxInput.a - TaxInput.b - TaxInput.c - TaxInput.d - 3500
}
var newTaxGet1 = function (TaxInput) {
  return TaxInput.X - TaxInput.K - TaxInput.a - TaxInput.b - TaxInput.c - TaxInput.d - 5000 - TaxInput.J
}
var oldTaxTurn1 = function (TaxInput) {
  var Tax
  var ExMoney = TaxInput.X - TaxInput.a - TaxInput.b - TaxInput.c - TaxInput.d - 3500;
  if (ExMoney < 0) {
    ExMoney = 0
  }
  if (ExMoney <= 1500) {
    return  ExMoney * 0.03
  }
  else if (1500 < ExMoney && ExMoney <= 4500) {
    return (ExMoney * 0.1) - 105
  }
  else if (4500 < ExMoney && ExMoney <= 9000) {
    return  (ExMoney * 0.2) - 555
  }
  else if (9000 < ExMoney && ExMoney <= 35000) {
    return (ExMoney * 0.25) - 1005
  }
  else if (35000 < ExMoney && ExMoney <= 55000) {
    return (ExMoney * 0.3) - 2755
  }
  else if (55000 < ExMoney && ExMoney <= 80000) {
    return (ExMoney * 0.35) - 5505
  }
  else if (80000 < ExMoney) {
    return (ExMoney * 0.45) - 13505
  }
  else {
    return false
  }
}
var newTaxTurn1 = function (TaxInput) {
  var Tax
  var ExMoney = TaxInput.X - TaxInput.a - TaxInput.b - TaxInput.c - TaxInput.d  - 5000 - TaxInput.J;
  if (ExMoney < 0) {
    ExMoney = 0
  }
  if (ExMoney <= 3000) {
    return  ExMoney * 0.03
  }
  else if (3000 < ExMoney && ExMoney <= 12000) {
    return  (ExMoney * 0.1) - 210
  }
  else if (12000 < ExMoney && ExMoney <= 25000) {
    return  (ExMoney * 0.2) - 1410
  }
  else if (25000 < ExMoney && ExMoney <= 35000) {
    return  (ExMoney * 0.25) - 2660
  }
  else if (35000 < ExMoney && ExMoney <= 55000) {
    return  (ExMoney * 0.3) - 4410
  }
  else if (55000 < ExMoney && ExMoney <= 80000) {
    return (ExMoney * 0.35) - 7160
  }
  else if (80000 < ExMoney) {
    return  (ExMoney * 0.45) - 15160
  }
  else {
    return false
  }
}
var Randoms=[
  {
    title: "革命尚未成功，同志仍需努力哦",
    content:["",""]
  },
  {
    title: "以后追剧就不用看广告了",
    content: ["国家发福利也赶不上趟，拖后腿了", "以后追剧就不用看广告了"]
  },
  {
    title: "多看几场电影了",
    content: ["为自己添一件新衣服了", "多看60场电影"]
  },
  {
    title: "省出今年的打车费了",
    content: ["邀请伙伴下几次馆子了", "可以多买几件新衣服了"]
  },
  {
    title: "承包今年的电话费了",
    content: ["去看两三场演唱会了", "可以换个手机啦"]
  },
  {
    title: "每个月都出去搓一顿了",
    content: ["交上一年的水电费了", "去看一场爱豆的演唱会"]
  },
  {
    title: "进行几次周末短途旅游了",
    content: ["进行几次周末短途旅游了", "给家里买个大电视"]
  },
  {
    title: "从今往后，吃饭加鸡腿，看电影买爆米花，出门可以打的了",
    content: ["添置几件家具了", "明年可以租个大点的房子了"]
  },
  {
    title: "省出一部iPhone了",
    content: ["省下一年的油钱了", "省下一年的油钱了"]
  },
  {
    title: "买个MacBook Pro了",
    content: ["省下约会的钱了", "省下约会的钱了"]
  },
  {
    title: "买一套苹果全家桶了",
    content: ["买一套苹果全家桶了", "世界那么大，可以去看看。。。"]
  },
  {
    title: "和家人出国旅游了",
    content: ["和家人出国旅游了", "和家人出国旅游了"]
  },
]
var RandomResults = function(x){
  var a = Math.random() < 0.5 ? 0:1
  var ReturnObj = new Object()
  if (x == 0) {
    console.log(111)
    ReturnObj.title = Randoms[0].title
    ReturnObj.Content = Randoms[0].content[a]
    return ReturnObj
  }
 if(x <= 100 && x > 0){
   ReturnObj.title = Randoms[1].title
   ReturnObj.Content = Randoms[1].content[a]
   return ReturnObj
 }
  if (x <= 500 && x > 100) {
    ReturnObj.title = Randoms[2].title
    ReturnObj.Content = Randoms[2].content[a]
    return ReturnObj
  }
  if (x <= 1000 && x > 500) {
    ReturnObj.title = Randoms[3].title
    ReturnObj.Content = Randoms[3].content[a]
    return ReturnObj
  }
  if (x <= 1500 && x > 1000) {
    ReturnObj.title = Randoms[4].title
    ReturnObj.Content = Randoms[4].content[a]
    return ReturnObj
  }
  if (x <= 2500 && x > 1500) {
    ReturnObj.title = Randoms[5].title
    ReturnObj.Content = Randoms[5].content[a]
    return ReturnObj
  }
  if (x <= 4500 && x > 2500) {
    ReturnObj.title = Randoms[6].title
    ReturnObj.Content = Randoms[6].content[a]
    return ReturnObj
  }
  if (x <= 6500 && x > 4500) {
    ReturnObj.title = Randoms[7].title
    ReturnObj.Content = Randoms[7].content[a]
    return ReturnObj
  }
  if (x <= 10000 && x > 6500) {
    ReturnObj.title = Randoms[8].title
    ReturnObj.Content = Randoms[8].content[a]
    return ReturnObj
  }
  if (x <= 15000 && x > 10000) {
    ReturnObj.title = Randoms[9].title
    ReturnObj.Content = Randoms[9].content[a]
    return ReturnObj
  }
  if (x <= 20000 && x > 15000) {
    ReturnObj.title = Randoms[10].title
    ReturnObj.Content = Randoms[10].content[a]
    return ReturnObj
  }
  if ( x > 20000) {
    ReturnObj.title = Randoms[11].title
    ReturnObj.Content = Randoms[11].content[a]
    return ReturnObj
  }
}
module.exports = {
  formatTime: formatTime,
  TaxEasy: TaxEasy,
  TaxPro: TaxPro,
  SocialSafe: SocialSafe,
  HouseSafe: HouseSafe,
  RandomResults: RandomResults,
  Randoms:Randoms,
}
