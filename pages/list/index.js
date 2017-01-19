//index.js
//获取应用实例
var app = getApp()
Page( {


  data: {

    hotList: [
      {
        pic: 'https://m.youcai.xin/static/img/gravida.png',
        title: '玻一个好是不人不是你们可以算出来人一上个个bs喊',
        desc: '22W人去過'
      }, {
        pic: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        title: '玻一个好是不人不是你大家们可以算出来人一上个个bs喊',
        desc: '22W人去過'
      }, {
        pic: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg',
        title: '玻一个好是不人不是你们可以算出来人一上个个bs喊',
        desc: '22W人去過'
      }, {
        pic: 'https://hamlet.b0.upaiyun.com/1609/19171/2788065f96c04ad38c8db50ad723bc37.jpg!/fwfh/640x352/quality/80',
        title: '玻一个好是不人不是你们可以算出来人一上个个bs喊',
        desc: '22W人去過'
      }, {
        pic: 'https://hamlet.b0.upaiyun.com/1609/22111/fe8765fa7f2f48cd87760c10ddd20ae6.jpg',
        title: '玻一个好是不人不是你们可以算出来人一上个个bs喊',
        desc: '22W人去過'
      }
    ],

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  swiperchange: function(e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },
  go: function(event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  },
  gos: function(event) {
    wx.navigateTo({
      url: '../template/index?type=' + event.currentTarget.dataset.type
    })
  }
})
