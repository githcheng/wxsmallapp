

//index.js
//获取应用实例
var app = getApp()


Page({
    
  data: {  //状态机数据
    courselist : [
        {},{},{},{},{},{}
    ]
  },

  onShow: function () {
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
      url: app.HOST_URL + "/course/getCourseList",
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
              courselist: res.data.data
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


  doFeedback: function(event) {
     console.log(this.data)
      wx.navigateTo({
      url: '../feedback/index?name=' + event.currentTarget.dataset.name+'&teachername='+event.currentTarget.dataset.teachername+'&begintime='+event.currentTarget.dataset.begintime+'&endtime='+event.currentTarget.dataset.endtime+'&courselogid='+event.currentTarget.dataset.courselogid
    })
  }

});