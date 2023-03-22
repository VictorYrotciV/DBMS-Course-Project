// pages/searchbookinfo/searchbookinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        text:{},
        results:[],
        results2:[],
        selectedclass:"按书",
        searchtext:""
    },
    bindShowMsg() {
        this.setData({
            select:!this.data.select,
            results:[]
        })
   },
   mySelect(e) {
       var name = e.currentTarget.dataset.name
          this.setData({
            selectedclass: name,
            select: false
        })
  
       
      
   },
   searchsinglebook:function(e){
      var that=this
      wx.request({
        method:'POST',
        data:e.detail.value,
        url: 'http://127.0.0.1:3000/searchsinglebook',
        success:function(res){
          console.log(res)
          console.log(res.data)
          if(res.data.errno){
            that.setData({searchtext:"查找失败！"})
          }else{
            that.setData({searchtext:"查找成功！",results2:res.data})
            console.log(that.data.results2)
          }
          
        }
      })
   },
   submit:function(e){
    var that=this
    wx.request({
      method:'POST',
      data:e.detail.value,
      url: 'http://127.0.0.1:3000/searchpopularbooks',
      success:function(res){
        console.log(res)
        console.log(res.data)
        if(res.data.errno){
          that.setData({searchtext:"查找错误，具体信息："+res.data.sqlMessage})
        }else{
          that.setData({searchtext:"查找成功",results:res.data})
          console.log(that.data.results)
        }
        
      }
    })
  },
  back:function(){
    wx.navigateBack()
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

    }
})