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
          data:e.detail.value,
          url: 'http://127.0.0.1:3000/deletereader',
          success:function(res){
            console.log(res.data)
            if(res.data.errno){
              that.setData({text:"删除错误，具体信息："+res.data.sqlMessage})
            }else{
              that.setData({text:"删除成功,搜索试试有没有？"})
            }
            
          }
        })
      },
      searchid:function(e){
        var that=this
        wx.request({
          method:'POST',
          data:e.detail.value,
          url: 'http://127.0.0.1:3000/searchid',
          success:function(res){
            if(res.data.errno){
              that.setData({text:"搜索错误，具体信息："+res.data.sqlMessage})
            }else{
            console.log(res.data)
            console.log(res.data[0].length)
            console.log(res.data[1].length)
            if(res.data[0].length==res.data[1].length){
              that.setData({text:"没找到。。\n\n\n"})
              return
            }
            if(res.data[0][0]){
              that.setData({text:"校内人员：\n"+"证件号码:"+res.data[0][0].证件号码+"\n姓名:"+res.data[0][0].姓名+"\n信用分:"+res.data[0][0].信用分+"\n部门名称:"+res.data[0][0].部门名称})
            }else{
                that.setData({text:"校外人员：\n"+"证件号码:"+res.data[1][0].证件号码+"\n姓名:"+res.data[1][0].姓名+"\n信用分:"+res.data[1][0].信用分+"\n来访单位:"+res.data[1][0].来访单位})
            }
              
            }
            
            
          }
        })
      },
      back:function(){
        wx.navigateBack()
      },
})