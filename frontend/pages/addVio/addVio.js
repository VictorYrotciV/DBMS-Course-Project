// pages/addVio/addVio.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        text:"等待操作。。。",
        chosenreason:'',
        vioname:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
      var that=this
      wx.request({
        method:'POST',
        url: 'http://127.0.0.1:3000/loadallreasons',
        success:function(res){
          if(res){
            var result=[];
            var keys = Object.keys(res.data)
            keys.forEach(function(key){
              result.push(res.data[key]);
            });
            that.setData({vioname:result})
            
          }
            
          
          
        }
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindShowMsg() {
      var that = this
      that.setData({
          select:!that.data.select
      })
 },
 mySelect(e) {
    var that = this
     console.log(e.currentTarget)
     that.setData({
         chosenreason: e.currentTarget.dataset.name,
         select: false
     })
 },


    submit:function(e){
        var that=this
        wx.request({
          method:'POST',
          data:e.detail.value,
          url: 'http://127.0.0.1:3000/addviolationinfo',
          success:function(res){
            console.log(res.data)
            if(res.data.errno){
              that.setData({text:"插入错误，具体信息："+res.data.sqlMessage})
            }else{
              that.setData({text:"插入成功"})
            }
            
          }
        })
      },
      back:function(){
        wx.navigateBack()
      },
})