// pages/comments/comments.js
import {getItemDetail, network} from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData(options);
    that.getComments(1);

    wx.setNavigationBarTitle({
      title: '短评',
    })
  },

  getComments: function(start){
    var that = this;
    var type = that.data.type;
    var id = that.data.id;
    
    if(start > that.data.start){
      that.setData({
        nextLoading: true
      })
    }else{
      that.setData({
        preLoading: true
      })
    }

    network.getItemComments({
      type: type,
      id: id,
      count: 20,
      start: start,
      success: function(data){
        var total = data.total;
        var comments = data.interests;

        that.setData({
          total: total,
          comments: comments,
          start: start,
          preLoading: false,
          nextLoading: false
        })

        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    })
  },
  
  onItemTapEvent: function(event){
    wx.navigateBack({
    })
  },

  onPrePageTap: function(event){
    var that = this;
    if(that.data.start - that.data.count > 0){
      var start = that.data.start - that.data.count;
      that.getComments(start);
    }
  },

  onNextPageTap: function(event){
    var that = this;
    var start = that.data.start + that.data.count;
    that.getComments(start);
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