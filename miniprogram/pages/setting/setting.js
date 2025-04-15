import QQMapWX from '../../libs/qqmap-wx-jssdk'

Page({
    data:{
        address:{
            name:'',
            phone:'',
            provinceName:'',//省名称
            provinceCode:'',//省编码
            cityName:'',
            cityCode:'',
            districtName:'',
            districtCode:'',
            address:'',//详细地址
            fullAddress:'',//完整地址
            isDefault:0//是否设置为默认地址，0不设置默认地址
        }
    },


    onShow:function(){

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
                const {adcode,province,city,district} = res.result.ad_info
                const {street,street_number} = res.result.address_component
                const {standard_address} = res.result.formatted_addresses
                console.log(res);
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
                    address:street + street_number + name,
                    fullAddress:standard_address + name
                })
            },
            fail:(err)=>{
                console.log(err);
            }
        })
    },

    onLoad(){
        //对核心类QQMapWX进行实例化
        this.qqmapwx = new QQMapWX({
            key:'2PZBZ-F6IW5-GMVIJ-IZJLM-QVNBV-DOBIN'
        })

    },


})