// pages/street/street.js
Page({
    data: {
        name: '', // 收货人
        phone: '', // 手机号
        provinceName: '', // 省
        provinceCode: '', // 省 编码
        cityName: '', // 市
        cityCode: '', // 市 编码
        districtName: '', // 区
        districtCode: '', // 区 编码
        address: '',  // 详细地址
        fullAddress: '', // 完整地址 (省 + 市 + 区 + 详细地址)
        area:[],
        count:[]
    },


    removeLastCharacter(str) {
        var pattern = /[\u4e00-\u9fa5]|[\w\s\d.,?!]/g;
        var arr = str.match(pattern);
        arr.pop();
        return arr.join('');
      },

    onAddressChange(event) {
        const [provinceCode, cityCode, districtCode] = event.detail.code
        const [provinceName, cityName, districtName] = event.detail.value
        let name = districtName
        let address = provinceName + ',' + cityName + ',' + districtName


        // 存储省市区对应的编码
        this.setData({
          provinceCode,
          provinceName,
          cityCode,
          cityName,
          districtName,
          districtCode,
          address
        })
        //给一个成华区跳出对应街道
        wx.request({
          url: 'https://www.regentzhai.fun/name_name_list',
          method:'GET',
          data:{
              name:name
          },
          success:(res)=>{
              console.log(res.data);
              let [area,count] = res.data
              wx.setStorageSync('area', area)
              wx.setStorageSync('count', count)
              this.setData({
                  area:area,
                  count:count
              })
          }
        })




        console.log(this.data.address);
      },

      list(e){
        let choosenStreet = e.currentTarget.dataset.item
        console.log(choosenStreet); 
        wx.setStorageSync('choosenStreet', choosenStreet)
        wx.navigateTo({
          url: '../list/list',
        })
      }

})