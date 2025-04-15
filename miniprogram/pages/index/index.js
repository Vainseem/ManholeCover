import QQMapWX from '../../libs/qqmap-wx-jssdk'

Page({
    data:{
        address:{
            name:'',
            phone:'',
            provinceName:'北京市',//省名称
            provinceCode:'',//省编码
            cityName:'北京市',
            cityCode:'',
            districtName:'昌平区',
            districtCode:'',
            address:'',//详细地址
            fullAddress:'',//完整地址
            realAddress:'',//实际上传给后端的地址
            isDefault:0//是否设置为默认地址，0不设置默认地址
        },
        images:[],
        photoPath:'',
        avator:'../../assets/images/avatar.png'
    },

    onLoad(){
        //对核心类QQMapWX进行实例化
        this.qqmapwx = new QQMapWX({
            key:'2PZBZ-F6IW5-GMVIJ-IZJLM-QVNBV-DOBIN'
        });
        this.onLocation()

    },

    removeLastCharacter(str) {
        var pattern = /[\u4e00-\u9fa5]|[\w\s\d.,?!]/g;
        var arr = str.match(pattern);
        arr.pop();
        return arr.join('');
      },

      removeLastTwoCharacters(str) {
        var pattern = /[\u4e00-\u9fa5]|[\w\s\d.,?!]/g;
        var arr = str.match(pattern);
        arr.splice(-2);
        return arr.join('');
      },
      
     
      

    async onLocation(){
        //解构得到的地址信息，纬度经度和搜索的地点
        const {latitude,longitude,name} = await wx.getLocation()
        //逆地址解析
        this.qqmapwx.reverseGeocoder({
            location:{
                latitude,
                longitude
            },
            success:(res)=>{
                let {adcode,province,city,district} = res.result.ad_info
                let {street,street_number} = res.result.address_component
                let {standard_address} = res.result.formatted_addresses
                let {title} = res.result.address_reference.town
                province = this.removeLastCharacter(province)
                city = this.removeLastCharacter(city)
                district = this.removeLastCharacter(district)
                title = this.removeLastTwoCharacters(title)

                //对获取的数据进行格式化、组织，然后赋值给data中的字段
                this.setData({
                    provinceName:province,
                    //省编码前两位有值，后四位是0
                    provinceCode:adcode.replace(adcode.substring(2,6),'0000'),
                    cityName:city,
                    //市编码前四位有值，后两位是0
                    cityCode:adcode.replace(adcode.substring(4,6),'00'),
                    //区编码里面，有几个市没有区县级
                    districtName:district,
                    districtCode:district && adcode,
                    address:province + ',' + city + ',' + district + ',' + title,
                    fullAddress:standard_address + name,
                    realAddress : province + city + district + street
                })
                wx.setStorageSync('address', this.data.address)
                
                wx.request({
                  url: 'url',
                  method:'POST',
                  header:{
                    'Content-type':"application/json"//设置数据的交互格式
                },
                  data:{

                  },
                  success(res){
                      console.log(res);
                  },
                  fail(err){
                      console.log(err);
                  }


                })


            }
        })
    },


    street(){

        wx.navigateTo({
          url: '../street/street',
        })
    },




    camera:function(){

        wx.chooseImage({
            count:1,
            sizeType:['original','compressed'],
            sourceType:['album','camera'],
            header: {
                'Content-Type': 'multipart/form-data' // 设置请求的 Content-Type
              },
            success (res) {
                  const tempFilePaths = res.tempFilePaths
                  wx.setStorageSync('image', tempFilePaths)
                //测试部分
                wx.getFileSystemManager().readFile({
                    filePath:wx.getStorageSync('image').join(''),
                    encoding:'base64',
                    success:function(res){
                        var base64Data = res.data
                        wx.setStorageSync('base64', base64Data)
                    },
                    fail(err){
                        console.log(err);
                    }
                })

// 引入 pako 库
const pako = require('pako');

// 将 Base64 字符串转换为 ArrayBuffer 对象
function base64ToArrayBuffer(base64) {
  const binaryString = wx.base64ToArrayBuffer(base64);
  return binaryString;
}

// 将 ArrayBuffer 对象转换为 Base64 字符串
function arrayBufferToBase64(arrayBuffer) {
  const base64String = wx.arrayBufferToBase64(arrayBuffer);
  return base64String;
}

// 将 Base64 字符串进行压缩
function compressBase64(base64) {
  const arrayBuffer = base64ToArrayBuffer(base64);
  const compressedData = pako.deflate(arrayBuffer); // 使用 pako 进行压缩
  const compressedBase64 = arrayBufferToBase64(compressedData);
  return compressedBase64;
}

// 示例用法
const base64Data = wx.getStorageSync('base64');
const compressedBase64Data = compressBase64(base64Data);
wx.setStorageSync('comBase64', compressedBase64Data)
// console.log('Compressed Base64 data:', compressedBase64Data);

 //测试结束

                 let currentYear = new Date().getFullYear(); // 获取当前年份
                let currentMonth = new Date().getMonth() + 1; // 获取当前月份（注意月份从0开始，需要加1）
                let currentDay = new Date().getDate(); // 获取当前日期
                let currentHour = new Date().getHours(); // 获取当前小时
                if(currentHour<10){
                    currentHour = `0${currentHour}`
                }
                let currentMinute = new Date().getMinutes(); // 获取当前分钟
                if(currentMinute<10){
                    currentMinute = `0${currentMinute}`
                }
                let fullDay = `${currentMonth}.${currentDay} ${currentHour}:${currentMinute}`
                wx.setStorageSync('time', fullDay)



              //传给ml
              wx.uploadFile({
                url: 'https://www.regentzhai.fun/predict', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                name: 'image',
                formData: {
                  'image': '../../assets/images/broke2.jpg'
                },
                success (res){
                  const jsonString = res.data
                  //do something
                  console.log(res);
                  var jsonObj = JSON.parse(jsonString)
                  const prediction = jsonObj.prediction
                  wx.setStorageSync('prediction', prediction)
                  let status = prediction
                  if(status == 'broke'){
                      status = 0
                  }else if(status == 'circle'){
                      status = 1
                  }else if(status == 'good'){
                      status = 2
                  }else if(status == 'lose'){
                      status = 3
                  }else if(status == 'uncovered'){
                      status = 4
                  }
                  wx.setStorageSync('status', status)
                  console.log(status);
                  wx.navigateTo({
                    url: '../prediction/prediction',
                  })

                },
                fail(err){
                    console.log(err);
                }
              })
              //传给后端 
              // 创建一个表示当前时间的Date对象
                let currentDate = new Date();

                // 获取年、月、日、小时、分钟、秒
                let year = currentDate.getFullYear();
                let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1，并补齐两位数
                let day = String(currentDate.getDate()).padStart(2, '0'); // 补齐两位数
                let hours = String(currentDate.getHours()).padStart(2, '0'); // 补齐两位数
                let minutes = String(currentDate.getMinutes()).padStart(2, '0'); // 补齐两位数
                let seconds = String(currentDate.getSeconds()).padStart(2, '0'); // 补齐两位数

                // 构造日期时间字符串
                let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              wx.setStorageSync('formattedDateTime', formattedDateTime)

              const base64 = wx.getStorageSync('base64')
              const address = wx.getStorageSync('address')

                setTimeout(()=>{
                    wx.request({
                        url: 'https://www.regentzhai.fun/record_post', //仅为示例，非真实的接口地址
                        method:'POST',
                        header:{
                            'Content-type':"application/json"//设置数据的交互格式
                        },
                        data:{
        
                            openid:wx.getStorageSync('openid'),
                            timestamp2:wx.getStorageSync('formattedDateTime'),
                            status:wx.getStorageSync('status'),
                            image:wx.getStorageSync('base64'),
                            address:wx.getStorageSync('address'),
                            remakes:''
        
                        },
                        success (res){
                          const data = res.data
                          //do something
                          console.log(res);
                          console.log(data);
                        },
                        fail(err){
                            console.log(err);
                        }
                      })

                },1000)


   

            
            },
            fail(err){
                console.log(err);
                wx.showToast({
                  title: '请选择图像',
                  icon:'error'
                })
            }
          })







    }
        





  

})