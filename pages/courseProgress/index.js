// pages/courseProgress/index.js
Page({
  data:{
    courseProgressList : [],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    //请求服务端用户数据
    wx.request({
      url: app.HOST_URL + "/course/getCourseProgressList",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        "openid": "chengguojiang",
      },
      //res = {data: '开发者服务器返回的内容'}
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) { //成功

          that.setData({
              courseProgressList: res.data.data
            });

        } else {

          wx.showModal({
            title: '服务异常',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
            
            }
          });
        }

      },
      //失败,弹出modal
      fail: function () {
        wx.showModal({
          title: "请求失败",
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {

            }
          }
        });
      },
      //无论成功与失败,loading都取消
      complete: function () {

      }
    });
  },



  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})