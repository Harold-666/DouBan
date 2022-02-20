import {globalUrls} from "urls.js"

const network = {
  // 获取电影列表
  getMovieList: function(params){
    params.type = "movie";
    this.getItemList(params);
  },

  // 获取电视剧列表
  getTvList: function(params){
    params.type = "tv";
    this.getItemList(params);
  },

  // 获取综艺列表
  getTvVarietyList: function(params){
    params.type = "tv_variety";
    this.getItemList(params);
  },

  // 获取影片列表
  getItemList: function(params){
    var url = "";
    var count = params.count ? params.count : 7;
    var type = params.type;
    if(type === "movie"){
      url = globalUrls.movie;
    }else if(type === "tv"){
      url = globalUrls.tv;
    }else if(type === "tv_variety"){
      url = globalUrls.tv_variety;
    }

    wx:wx.request({
      url: url,
      data: {
        count: count
      },
      success: function(res){
        var items = res.data.subject_collection_items;
        var itemsCount = items.length;
        var leftView = itemsCount % 3;

        if(leftView === 2){
          items.push(null);
        }
        
        if(params && params.success){
          params.success(items);
        }
      }
    })

  },

  // 获取影片详情
  getItemDetail: function(params){
    var type = params.type;
    var id = params.id;
    var url = "";

    if(type === "movie"){
      url = globalUrls.movieDetail + id;
    }else if(type === "tv"){
      url = globalUrls.tvDetail + id;
    }else if(type === "tv_variety"){
      url = globalUrls.tv_varietyDetail + id;
    }

    wx:wx.request({
      url: url,
      success: function(res){
        var itemData = res.data;
        
        if(params.success){
          params.success(itemData);
        }
      }
    })
  },

  // 获取标签
  getItemTags: function(params){
    var type = params.type;
    var id = params.id;
    var url = "";
    
    if(type === "movie"){
      url = globalUrls.movieTags(id);
    }else if(type === "tv"){
      url = globalUrls.tvTags(id);
    }else if(type === "tv_variety"){
      url = globalUrls.tv_varietyTags(id);
    }

    wx:wx.request({
      url: url,
      success: function(res){
        var tags = res.data.tags;

        if(params.success){
          params.success(tags);
        }
      }
    })
  },

  // 获取短评
  getItemComments: function(params){
    var type = params.type;
    var id = params.id;
    var count = params.count ? params.count : 3;
    var start = params.start ? params.start : 0;
    var url = "";
    
    if(type === "movie"){
      url = globalUrls.movieComments(id, count, start);
    }else if(type === "tv"){
      url = globalUrls.tvComments(id, count, start);
    }else if(type === "tv_variety"){
      url = globalUrls.tv_varietyComments(id, count, start);
    }

    wx:wx.request({
      url: url,
      success: function(res){
        var comments = res.data;

        if(params.success){
          params.success(comments);
        }
      }
    })
  },

  // 搜索电影
  getSearch: function(params){
    var q = params.q;
    var url = globalUrls.searchUrl(q);
    
    wx.request({
      url: url,
      success: function(res){
        var subjects = res.data.subjects;

        if(params.success){
          params.success(subjects);
        }
      }
    })
  }
}

export {network}