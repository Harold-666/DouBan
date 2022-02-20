const globalUrls = {
  //影片列表
  movie: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
  tv: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_hot/items",
  tv_variety: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_variety_show/items",
  
  //影片详情
  movieDetail: "https://m.douban.com/rexxar/api/v2/movie/",
  tvDetail: "https://m.douban.com/rexxar/api/v2/tv/",
  tv_varietyDetail: "https://m.douban.com/rexxar/api/v2/tv/",

  //影片标签
  movieTags: function(id){
    return "https://m.douban.com/rexxar/api/v2/movie/" + id + "/tags?count=8"
  },
  tvTags: function(id){
    return "https://m.douban.com/rexxar/api/v2/tv/" + id + "/tags?count=8"
  },
  tv_varietyTags: function(id){
    return this.tvTags(id)
  },

  //影片短评
  movieComments: function(id, count = 3, start = 0){
    return "https://m.douban.com/rexxar/api/v2/movie/" + id + "/interests?count=" + count + "&start=" + start
  },
  tvComments: function(id, count = 3, start = 0){
    return "https://m.douban.com/rexxar/api/v2/tv/" + id + "/interests?count=" + count + "&start=" + start
  },
  tv_varietyComments: function(id, count = 3, start = 0){
    return this.tvComments(id, count, start)
  },
  searchUrl: function(q){
    return "https://m.douban.com/rexxar/api/v2/search?type=movie&q=" + q
  }
}

export {globalUrls}