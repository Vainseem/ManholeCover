Page({
    data:{
        openid:'',
        selectorRange:['男','女'],
        selectorIndex:0,
        phoneNum:'',
        sex:'',
        avatarUrl:'',
        nickname:'',
        avatarbase64:''
        },
    
        // 选择头像
        chooseAvatar: function (e) {
            let {avatarUrl} = e.detail
            // this.setData({
            //     avatarUrl:avatarUrl
            // })
            // wx.setStorageSync('avatarUrl',this.data.avatarUrl)
            // avatarUrl = wx.getStorageSync('avatarUrl') 
          //转为base64
          wx.getFileSystemManager().readFile({
            filePath:avatarUrl,
            encoding:'base64',
            success:function(res){
                var base64Data = res.data
                wx.setStorageSync('avatarbase64', base64Data)
                wx.setStorageSync('avatarUrl', avatarUrl)
            },
            fail(err){
                console.log(err);
            }
        })
        let avatarbase64 = wx.getStorageSync('avatarbase64')
        
        this.setData({
                avatarUrl:avatarUrl,
                avatarbase64:avatarbase64,
               
            })
        




        },

        // 用户昵称

        leave(e){
            const {nickname} = e.detail.value
            
            this.setData({nickname:nickname})
            wx.setStorageSync('nickname',e.detail.value)
        },

        // 手机号
        handleInput:function(e){

            wx.setStorageSync('phoneNum', e.detail.value)
        },

    //选择性别
    onSelectorChange:function(e){
        this.setData({
            selectorIndex: e.detail.value,
            sex:this.data.selectorRange[e.detail.value]
          });
        wx.setStorageSync('sex', this.data.selectorRange[e.detail.value])
    },

     //存储

     onLoad(options) {
        const phoneNum = wx.getStorageSync('phoneNum')
        const sex = wx.getStorageSync('sex')
        const avatarUrl = wx.getStorageSync('avatarUrl')
        const nickname = wx.getStorageSync('nickname')
        const openid = wx.getStorageSync('openid')
      this.setData({
          phoneNum:phoneNum,
          sex:sex,
          avatarUrl:avatarUrl,
          nickname:nickname,
          openid:openid
      })
    },



      save(){

         const resu1 = wx.getStorageSync('phoneNum')
        const resu2 = wx.getStorageSync('sex')
        const resu3 = wx.getStorageSync('avatarbase64')
        const resu4 = wx.getStorageSync('nickname')
        const resu5 = wx.getStorageSync('openid')

        this.setData({
            phoneNum:resu1,
            sex:resu2,
            avatarbase64:resu3,
            nickname:resu4,
            openid:resu5
        })
        this.saveToServer()

        wx.showToast({
          title: '注册成功',
          duration: 2000,
          icon: 'success',
          mask: true,

        })

        wx.navigateBack({
            delta:1
          })
    },

    saveToServer:function(){
        let openid = wx.getStorageSync('openid')
        wx.request({
          url: 'https://www.regentzhai.fun/adduserinfo',
          method:'POST',
          data:{
              openid:openid,
              nickname:wx.getStorageSync('nickname'),
              timestamp1:'2004-01-01 00:00:00',
              headimgurl:wx.getStorageSync('avatarbase64'),
              telephone:wx.getStorageSync('phoneNum')
            //   telephone:this.data.phoneNum,
            //   sex:this.data.sex
          },
          success(res) {
            if (res.statusCode === 200 && res.data.success) {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              });
            }
          },
          fail(err) {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
        }
        
    })
        
    },

    // 退出登录
    async exit(){
        removeStorage('userInfo')
        removeStorage('token')
        removeStorage('sex')
        removeStorage('phoneNum')
        this.setToken('')
        this.setUserInfo('')
        console.log(this);
        this.setData({
            sex:'',
            phoneNum:''
        })

        console.log('已删除');
    }



})