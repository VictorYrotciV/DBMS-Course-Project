// pages/searchuserinfo/searchuserinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:"default",
        username:"default",
        results:[]
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
        var that=this
        wx.request({
        method:'POST',
        data: that.data,
        url: 'http://127.0.0.1:3000/searchuserinfo',
        success:function(res){
            console.log(res)
            console.log(res.data)
            if(res.data.errno){
            that.setData({searchtext:"查找错误，具体信息："+res.data.sqlMessage})
            }else{
            that.setData({searchtext:"查找成功",results:res.data})
            console.log(that.data.results[0][0].score)
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

    }
})