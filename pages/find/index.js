//index.js
//获取应用实例
var app = getApp()



Page({
  data: {
    userInfo: { avatarUrl: '../../image/avator.jpg', nickName: 'qieangel2013' },
    status: 0,
    // item
    items: [

      // {image: '../../image/message.png',catchtap:"goSubmitCourseLog"},
      {image: '../../image/today_couse2.png',catchtap:"goQueryTodayCourse"},
      {image: '../../image/course_status.png',catchtap:"goCourseProgress"},
      {image: '../../image/feedback_student.png',catchtap:"goStudentFeedbackCourseList"},
      {image: '../../image/message.png',catchtap:"gofeedback"},
      
    ]
  },


  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },



  onHide: function () {
    status: 0;
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
      url: app.HOST_URL + "/user/getUserInfo",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        "openid": this.data.userInfo.nickName,
      },
      //res = {data: '开发者服务器返回的内容'}
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) { //成功

          if (res.data.user.type == 0) {
            wx.showModal({
              title: '您是游客',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                status: 0
              }
            });
          } else {
            that.setData({
              status: 1
            })
          }


        } else {

          wx.showModal({
            title: '服务异常',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
              status: 0
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


  //事件处理函数
  gofeedback: function (event) {
    wx.navigateTo({
      url: '../feedback/index?title=' + event.currentTarget.dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },
  //事件处理函数
  goQueryTodayCourse: function (event) {
    wx.navigateTo({
      url: '../todaycourse/index?title=' + event.currentTarget.dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },

  //事件处理函数
  goStudentFeedbackCourseList: function (event) {
    wx.navigateTo({
      url: '../studentFeedback/index?title=' + event.currentTarget.dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },
  goCourseProgress: function (event) {
    wx.navigateTo({
      url: '../courseProgress/index?title=' + event.currentTarget.dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },
  goSubmitCourseLog: function (event) {
    wx.navigateTo({
      url: '../submitCourseLog/index?title=' + event.currentTarget.dataset.title + '&url=' + event.currentTarget.dataset.url
    })
  },

})
