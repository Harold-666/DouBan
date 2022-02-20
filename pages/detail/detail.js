// pages/detail/detail.js
import {getItemDetail, network} from "../../utils/network.js"

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
    var id = options.id;
    that.setData({
      type: type,
      id: id
    })
    
    wx.showLoading({
      title: '加载中···',
    })

    network.getItemDetail({
      type: type,
      id: id,
      success: function(itemData){
        var genres = itemData.genres;
        genres = genres.join(" / ");
        itemData.genres = genres;

        var countries = itemData.countries;
        if(countries.length > 1 ){
          countries = countries.join(" / ");
          itemData.countries = countries;
        }else{
          countries = countries[0];
        }

        var actors = itemData.actors;
        var actorNames = [];
        
        if(actors !== null){
          if(actors.length > 3){
            actors = actors.slice(0,3);
          }

          for(var index = 0; index < actors.length; index++){
            actorNames.push(actors[index].name);
          }

          actorNames = actorNames.join(" / ");
        }else{
          actors = "";
        }

        var directors = itemData.directors;
        var director = [];

        // 判断是否为空数组--[empty]
        function isEmpty(directors){
          if(directors[0]){
            return false;
          }
          return true;
        }

        if(directors.length > 0){
          if(directors.length > 1){
            directors = directors.slice(0,2);
          }
          
          for(var index = 0;index < directors.length; index++){
            director.push(directors[index].name);
          }
          
          director = director.join("（导演）/ ");
          itemData.authors = director + "（导演）/ " + actorNames;
        }else if(isEmpty(directors)){
          itemData.authors = director + actorNames;
        }
        
        that.setData({
          itemData: itemData
        })
      }
    })

    network.getItemTags({
      type: type,
      id: id,
      success: function(tags){
        that.setData({
          tags: tags
        })
      }
    })

    network.getItemComments({
      type: type,
      id: id,
      success: function(comments){
        var totalComment = comments.total;
        var comments = comments.interests;

        that.setData({
          totalComment: totalComment,
          comments: comments
        })

        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '影片详情',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
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