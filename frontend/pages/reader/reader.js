// pages/reader/reader.js
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
    tolookreader:function(){
        var that = this
        var userid = that.data.userid
        var username = that.data.username
        wx.navigateTo({
            url: '../searchuserinfo/searchuserinfo?username='+username+'&userid='+userid,
          })
    },
    toborrow:function(){
        var that = this
        var userid = that.data.userid
        var username = that.data.username
        wx.navigateTo({
            url: '../borrow/borrow?username='+username+'&userid='+userid,
          })
    },
    tosearchbook:function()
    {
        wx.navigateTo({
          url: '../searchbookinfo/searchbookinfo',
        })
    }
})