Page({
    data: {
      content:''
    },
    onLoad(options) { 

    },
    onTextareaInput(e){
        this.setData({
            content : e.detail.value 
        })    
    },
    sendEmail(){
        const content = this.data.content
        wx.request({
          url: 'https://www.regentzhai.fun/EmailSending',
          method:'GET',

           data:{
               content:content
           },
          success(res){
              console.log(res);
              wx.showToast({
                title: '反馈提交成功',
                icon:'success'
              })

          },
          fail(err){
              console.log(err);
          }

        })



    }
    
   
  })