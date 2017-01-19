Page({
  
  
  data: {  //状态机数据
    inputContentValue: "", //输入的内容
    inputNameValue: "", //输入的名字
    loading: false, //加载状态
    disabled: true, //按钮是否可用
  },


  //输入框绑定的事件
  bindNameInput: function (e) {
    let value = e.detail.value;
    //输入框,当输入的值大于0的时候按钮可用
    this.setData({
      inputNameValue: value,
    });
    this.setData({
      disabled: this.data.inputContentValue.length <= 0 || this.data.inputNameValue.length <= 0
    });
  },


  //输入框绑定的事件
  bindContentInput: function (e) {
    let value = e.detail.value;
    //输入框,当输入的值大于0的时候按钮可用
    this.setData({
      inputContentValue: value,
    });
    this.setData({
      disabled: this.data.inputContentValue.length <= 0 || this.data.inputNameValue.length <= 0
    });

  },


  search: function (e) {
    //查询按钮
    this.setData({
      loading: true,
      disabled: true
    });
    let that = this;//保留page函数中object的引用
    //联网
    wx.request({
      url: app.HOST_URL+"/feedback/do",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        "name": this.data.inputNameValue,
        "content": this.data.inputContentValue
      },
      //res = {data: '开发者服务器返回的内容'}
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 0) { //成功

          wx.showModal({
            title: '反馈成功！',
            showCancel: false,
            confirmText: '返回',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../find/index',
                  success: function (res) {
                    // success
                  },
                  fail: function () {
                    // fail
                  },
                  complete: function () {
                    // complete
                  }
                })
              }
            }
          });
        } else {

          wx.showModal({
            title: res.data.msg,
            showCancel: false,
            confirmText: '重写',
            success: function (res) {
              if (res.confirm) {

              }
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