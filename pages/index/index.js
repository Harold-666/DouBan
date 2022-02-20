//index.js
import { network } from "../../utils/network";

//获取应用实例
const app = getApp()

Page({
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /* 电影 */
    network.getMovieList({
      success: function(movies){
        that.setData({
          movies: movies
        })
      },
    })

    /* 电视剧 */
    network.getTvList({
      success: function(tvs){
        that.setData({
          tvs: tvs
        })
      },
    })

    /* 综艺 */
    network.getTvVarietyList({
      success: function(tv_varietys){
        that.setData({
          tv_varietys: tv_varietys
        })
      },
    })
  },
})
