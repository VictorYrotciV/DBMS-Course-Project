// pages/index/index.js
Page({

  /**
 * 页面的初始数据
   */
  data: {
    userid:"",
    username:""
  },

  /**
 * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid:options.userid,
      username:options.username
  })
  console.log(this.data.userid)
  console.log(this.data.username)
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
  onReachBottom: function () {

  },

  /**
 * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit:function(e){
    var that=this
    wx.request({
      method:'POST',
      url: 'http://127.0.0.1:3000',
      data:e.detail.value,
      success:function (res){
        const a=res.data.skills
        console.log("test succeeded")
        console.log(a)
        //求和计算
        const reducer=(accumlator,currentValue)=>parseInt(accumlator)+parseInt(currentValue)
        
        console.log(a.reduce(reducer))
        const sum=a.reduce(reducer)
        that.setData({result:sum})
        
      }
    })
  },

  jump:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  toAddVio:function(){
    wx.navigateTo({
      url:"../addVio/addVio"
    })
  },
  toDelVio:function(){
    wx.navigateTo({
      url:"../delVio/delVio"
    })
  },
  toAddReader:function(){
    wx.navigateTo({
      url:"../addReader/addReader"
    })
  },
  todelReader:function(){
    wx.navigateTo({
      url:"../delReader/delReader"
    })
  },
  toaddBook:function(){
    var that = this
    var username = that.data.username
    var userid = that.data.userid
    wx.navigateTo({
      url: '../addBook/addBook?username='+username+'&userid='+userid,
    })
  }
})

