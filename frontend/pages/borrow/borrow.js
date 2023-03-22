Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid:"",
        username:"",
        text:""
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
          url: 'http://127.0.0.1:3000/borrowbooks',
          success:function(res){
            console.log(res.data)
            if(res.data.errno){
              that.setData({text:"借阅错误，具体信息："+res.data.sqlMessage})
            }else{
              that.setData({text:"借阅成功！请确保图书已在手中，祝阅读愉快"})
            }
            
          }
        })
      },
      back:function(){
        wx.navigateBack()
      },
})