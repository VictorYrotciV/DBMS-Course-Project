// pages/managerIn/managerIn.js
// pages/about/about.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      text:"",
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
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
  
  back:function(){
    wx.navigateBack()
  },
  
  //提交
  submit:function(e){
    var that=this
    //console.log(e.detail.value)
    wx.request({
      method:'POST',
      data:e.detail.value,
      url: 'http://127.0.0.1:3000/managersignin',
      success:function(res){
        console.log(e.detail.value.id)
        console.log(res.data)
        if(res.data[0]){
            var username = res.data[0].姓名
            var userid = e.detail.value.id
            wx.navigateTo({
              url: '../index/index?username='+username+'&userid='+userid,
            })
        }else{
            that.setData({text:"请重新输入"})
        }
      }
    })
  }
  })
  