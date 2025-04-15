// pages/log/log.js
Page({
    data:{
        his:[],
        temp:[]
    },
  onShow() {
    wx.request({
      url: 'https://www.regentzhai.fun/record_openid',
      method:'GET',
      data:{
          openid:wx.getStorageSync('openid')
      },
      success:(res)=>{
          let his = res.data
          let temp = []
          this.setData({
              his:his
          })
          for(let i = 0;i < his.length;i++){
            temp[i] = his[i].status
            if(temp[i] == 0){
                temp[i] = '破损'
            }else if(temp[i] == 1){
                temp[i] = '周边凸起'
            }else if(temp[i] == 2){
                temp[i] = '良好'
            }else if(temp[i] == 3){
                temp[i] = '丢失'
            }else if(temp[i] == 4){
                temp[i] = '未盖上'
            }

          }
          this.setData({
              temp:temp
          })
      }
    })
  },

//   jump(){
//     wx.navigateTo({
//       url: '../prediction0/prediction0',
//     })
//   }





})