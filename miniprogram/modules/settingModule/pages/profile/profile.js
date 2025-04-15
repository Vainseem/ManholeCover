import { userBehavior } from './behavior'

Page({
    
  behaviors: [userBehavior],    
  // 页面的初始数据
  data: {
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

})

