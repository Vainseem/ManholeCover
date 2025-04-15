import {setStorage,getStorage,removeStorage,clearStorage} from './utils/storage'
import {asyncSetStorage,asyncGetStorage,asyncRemoveStorage,asyncClearStorage} from './utils/storage'

App({
    onLaunch: function() {
        this.globalData = {
          userInfo: null // 用户信息
        };
      },

   onShow(){
       const accountInfo = wx.getAccountInfoSync()

   }
})
