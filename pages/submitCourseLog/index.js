

//index.js
//获取应用实例
var app = getApp()


Page({
    
  data: {  //状态机数据

    courses:[{nickname:"数学",id:1},{nickname:"物理",id:2},{nickname:"英语",id:3},{nickname:"化学",id:4}],
    students:[{nickname:"赵饼",id:1},{nickname:"王一方",id:2},{nickname:"李路",id:3},{nickname:"雷军",id:4},{nickname:"李一路",id:5},{nickname:"雷半军",id:6}],
    teachers:[{nickname:"钱学才",id:1},{nickname:"牛清华",id:2},{nickname:"上官书",id:3},{nickname:"才新",id:4}],
    
    
    teacherId : -1,
    teacherName: "",
    studentId :-1,
    courseId : -1,
    
    teacherName: "",
    studentName: "",
    courseName: "",

    date : "请选择日期",
    beginTime : "请选择开始时间",
    endTime :"请选择结束时间",

    descmsg :"",
    
    loading: false, //加载状态
    disabled: false, //按钮是否可用
  },

  bindCourseChange: function(e) {
    this.setData({
      courseId: this.data.teachers[e.detail.value[0]].id,
      courseName: this.data.teachers[e.detail.value[0]].nickname
    })
  },
  
  bindStudentChange: function(e) {
    this.setData({
      studentId: this.data.teachers[e.detail.value[0]].id,
      studentName: this.data.teachers[e.detail.value[0]].nickname

    })
  },

  bindTeacherChange: function(e) {
    this.setData({
      teacherId: this.data.teachers[e.detail.value[0]].id,
      teacherName: this.data.teachers[e.detail.value[0]].nickname
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindBeginTimeChange: function(e) {
    this.setData({
      beginTime: e.detail.value
    })
  },


  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  bindDescMsgChange: function(e) {
    this.setData({
      descmsg: e.detail.value
    })
  },


onLoad: function () {

},

onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    //请求服务端用户数据
    wx.request({
      url: app.HOST_URL + "/course/getPickerList",
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

              that.setData({
                courses: res.data.courseList,
                students : res.data.studentList,
                teachers : res.data.teacherList,
                
                courseId : res.data.courseList[0].id,
                courseName : res.data.courseList[0].nickName,
                
                studentId : res.data.studentList[0].id,
                studentName : res.data.studentList[0].nickName,
                
                teacherId : res.data.teacherList[0].id,
                teacherName : res.data.teacherList[0].nickName,
              });
              console.log(res.data.courseList[0].id);
        } else {

          that.setData({
                courses: [],
                students : [],
                teachers : []
            });
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


  submitCourse: function (e) {
    //查询按钮
    this.setData({
      loading: true,
      disabled: true
    });
    let that = this;//保留page函数中object的引用
    //联网
    wx.request({
      url: app.HOST_URL+"/course/submitCourseLog",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        "openid" : 'chengguojiang',

        "courseId": this.data.courseId,
        "studentId": this.data.studentId,
        "teacherId": this.data.teacherId,


        "courseName": this.data.courseName,
        "studentName": this.data.studentName,
        "teacherName": this.data.teacherName,
        
        "date" : this.data.date,
        "beginTime" : this.data.beginTime,
        "endTime" : this.data.endTime,
        "descmsg" : this.data.descmsg
      },
      //res = {data: '开发者服务器返回的内容'}
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) { //成功

          wx.showModal({
            title: '排课成功！',
            showCancel: false,
            confirmText: '返回',
            success: function (res) {
            }
          });
        } else {

          wx.showModal({
            title: res.data.msg,
            showCancel: false,
            confirmText: '重新排课',
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
        console.log("complete")
        that.setData({
          loading: false,
          disabled: false
        })
      }
    });
  },

});