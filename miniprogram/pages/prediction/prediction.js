// pages/prediction/prediction.js
Page({
data:{
    time:'',
    image:'',
},
onShow(){
    let time = wx.getStorageSync('time')
    let image = wx.getStorageSync('image')
    let prediction = wx.getStorageSync('prediction')
    let base64 = wx.getStorageSync('base64')
    let comBase64 = wx.getStorageSync('comBase64')
    if(prediction=='lose'){
        prediction = '该井盖丢失，请联系相关工作人员处理！'
    }else if(prediction == 'broke'){
        prediction = '该井盖破损，请联系相关工作人员处理！'
    }else if(prediction == 'good'){
        prediction = '该井盖状况良好！'
    }else if(prediction == 'circle'){
        prediction = '该井盖周边凸起，请联系相关工作人员！'
    }else if(prediction == 'uncovered'){
        prediction = '该井盖未盖上，请联系相关工作人员处理！'
    }else{
        prediction = '未识别到图片，请重试！'
    }
    // console.log(base64);

this.setData({
    time:time,
    image:base64,
    prediction:prediction
})



},

})