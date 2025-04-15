
// 导入本地存储 api
import { setStorage,removeStorage } from '../../utils/storage'

Page({

  data:{
     avatarbase64:'',
      nickname:'',
      avatarUrl:'',
  },
  
    onShow(){
        const nickname = wx.getStorageSync('nickname')
        const avatarUrl = wx.getStorageSync('avatarUrl')
        const avatarbase64 = wx.getStorageSync('avatarbase64')
        this.setData({
            avatarbase64:avatarbase64,
            nickname:nickname,
            avatarUrl:avatarUrl,
        })
    },
  
    


    login(){
        wx.login({
          success: (res) => {
            // console.log(res.code);

            let code = res.code
            wx.setStorageSync('code', code)
            wx.request({
              url: 'https://www.regentzhai.fun/openid',
              method:'GET',
              data:{
                code:code
              },
              success:(res)=>{
                  console.log(res);
                  let {openid} = res.data
                  wx.setStorageSync('openid', openid)
                  wx.request({
                    url: 'https://www.regentzhai.fun/checkuserinfo',
                    method:'GET',
                    data:{
                        openid:wx.getStorageSync('openid')
                    },
                    success:(res)=>{
                        console.log(res.data);
                        let {id,telephone,headimgurl,nickname} = res.data
                        wx.setStorageSync('nickname', nickname)
                        wx.setStorageSync('avatarbase64', headimgurl)
                        wx.setStorageSync('phoneNum', telephone)
                       
                        //定时渲染
                        
                          if(res.data == 'nomessage'){
                              wx.navigateTo({
                                  url: '../login/login',
                                  
                                })
                          }
                          else{
                              
                              this.setData({
                                  avatarbase64:wx.getStorageSync('avatarbase64'),
                                  nickname:wx.getStorageSync('nickname')
                              })
                          }
              
                      
          
          
                    }
                  })
                  
              }
            })
          },
        })

       


    },



    async exit(){
        removeStorage('nickname')
        removeStorage('avatarUrl')
        removeStorage('sex')
        removeStorage('phoneNum')
        this.setData({
            sex:'',
            phoneNum:'',
            nickname:'',
            avatarUrl:''
        })

        wx.showToast({
          title: '退出成功',
          duration: 2000,
          icon: 'success',
          mask: true,

        })
    }
  
})


