// pages/moreList/moreList.js
import {network} from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var type = options.type;
    this.setData({
      type: type
    })
    var title = "";
    wx.showLoading({
      title: '正在加载中···',
    })
    if(type === "movie"){
      // 请求电影数据
      network.getMovieList({
        success: function(items){
          that.setData({
            items: items
          });
          wx.hideLoading({
            complete: (res) => {},
          })
        },
        count: 1000
     })
     title = "电影";
    }else if(type === "tv"){
      // 请求电视剧数据
      network.getTvList({
        success: function(items){
          that.setData({
            items: items
          });
          wx.hideLoading({
            complete: (res) => {},
          })
        },
        count: 1000
     })
     title = "电视剧";
    }else if(type === "tv_variety"){
      // 请求综艺数据
      network.getTvVarietyList({
        success: function(items){
          that.setData({
            items: items
          });
          wx.hideLoading({
            complete: (res) => {},
          })
        },
        count: 1000
      })
      title = "综艺";
    }
    wx:wx.setNavigationBarTitle({
      title: title,
    })
  }
})