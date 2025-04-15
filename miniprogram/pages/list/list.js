// 在对应的 js 文件中处理绘制饼状图的逻辑
Page({
    data:{
        countAll:'',
        status0:'',
        status1:'',
        status2:'',
        status3:'',
        status4:'',
    },
    onShow(){
        wx.request({
            url: 'https://www.regentzhai.fun/record_address',
            method:'GET',
            data:{
                address:'四川,成都,成华,猛追湾'
            //   address:wx.getStorageSync('address')
            },
            success:(res)=>{
                // console.log(res.data[0].status);
                let statusArr = []
                let countAll = 0
                let status0 = 0
                let status1 = 0
                let status2 = 0
                let status3 = 0
                let status4 = 0
                for (let i = 0; i < res.data.length; i++) {
                     statusArr[i] = res.data[i].status;
                    countAll++
                    console.log(statusArr[i]);
                    if(statusArr[i] == '0'){
                        status0++
                    }else if(statusArr[i] == '1'){
                        status1++
                    }else if(statusArr[i] == '2'){
                        status2++
                    }else if(statusArr[i] == '3'){
                        status3++
                    }else if(statusArr[i] == '4'){
                        status4++
                    }
                }
                wx.setStorageSync('statusArr', statusArr)
                wx.setStorageSync('status0', status0)
                wx.setStorageSync('status1', status1)
                wx.setStorageSync('status2', status2)
                wx.setStorageSync('status3', status3)
                wx.setStorageSync('status4', status4)
                wx.setStorageSync('countAll', countAll)
                this.setData({
                    countAll:countAll,
                    status0:status0,
                    status1:status1,
                    status2:status2,
                    status3:status3,
                    status4:status4,
                    choosenStreet:wx.getStorageSync('choosenStreet')
                })
            }
          })

                // 获取 canvas 上下文
      const ctx = wx.createCanvasContext('pieCanvas');
      
      // 定义饼状图的数据
      const data = [
        { value: wx.getStorageSync('status0'), color: '#f0f0f0'},
        { value: wx.getStorageSync('status1'), color: '#ADD8E6'},
        { value: wx.getStorageSync('status2'), color: '#98F98B'},
        { value: wx.getStorageSync('status3'), color: '#808080'},
        { value: wx.getStorageSync('status4'),  color: '#800080' },
      ];
  
      // 计算饼状图的总数
      const total = data.reduce((acc, cur) => acc + cur.value, 0);
  
      // 设置饼状图的中心坐标和半径
      const centerX = 150;
      const centerY = 150;
      const radius = 100;
  
      // 定义起始弧度和结束弧度
      let startAngle = 0;
      let endAngle = 0;
  
      // 遍历数据绘制饼状图
      data.forEach(item => {
        // 计算当前数据项的结束弧度
        endAngle = startAngle + (item.value / total) * Math.PI * 2;
  
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        // ctx.setFillStyle(getRandomColor()); // 设置随机颜色
        ctx.setFillStyle(item.color);
        ctx.fill();
  
        // 绘制标签文字
        // const middleAngle = (startAngle + endAngle) / 2;
        // const textX = centerX + Math.cos(middleAngle) * radius / 1.5;
        // const textY = centerY + Math.sin(middleAngle) * radius / 1.5;
        // ctx.setFontSize(12);
        // ctx.setFillStyle('#000');
        // ctx.fillText(item.name, textX, textY);
  
        // 更新起始弧度
        startAngle = endAngle;
      });
  
      // 绘制完成
      ctx.draw();
    },
    onReady() {

    },
  });
  

  

