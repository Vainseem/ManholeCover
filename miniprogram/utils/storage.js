/**
 * @description 存储数据到本地
 * @param {*} key 本地缓存中指定的key
 * @param {*} value 需要缓存的数据
 */ 
export const setStorage = (key,value)=>{
    try{
        wx.setStorageSync(key,value)
    }catch(error){
        console.error(`存储${key}数据发生了异常`)
    }
}
/**
 * @description 从本地读取指定key的数据
 * @param {*} key 
 */
export const getStorage = (key)=>{

    try{
      const value =  wx.getStorageSync(key)
      if (value){
          return value
      }
    }catch(error){
        console.error(`读取${key}数据发生了异常`)
    }
}
/**
 * @description 从本地移除key数据
 * @param {*} key 
 */
export const removeStorage = (key) =>{
    try {
        wx.removeStorageSync(key)
    } catch (error) {
        console.error(`移除${key}数据发生了异常`)
    }
}
/**
 *@description 从本地移除全部数据
 */
export const clearStorage = ()=>{
    try {
        wx.clearStorageSync()
    } catch (error) {
        console.error(`清空数据发生了异常`)
    }
}
/**
 * @description 异步将数据存储到本地
 * @param {*} key 本地缓存中指定的key
 * @param {*} data 需要缓存的数据
 */
export const asyncSetStorage = (key,data) =>{
    return new Promise((resolve)=>{
        wx.setStorage({
            key,
            data,
            complete (res){
                resolve(res)
            }
        })
    })
}
/**
 * @description 异步从本地获取key的数据
 * @param {*} key 
 */
export const asyncGetStorage = (key)=>{
    return new Promise((resolve)=>{
        wx.getStorage({
            key,
            complete (res){
                resolve(res)
            }
        })
    })
}
/**
 * @description 异步从本地移除key的数据
 * @param {*} key 
 */
export const asyncRemoveStorage = (key)=>{
    return new Promise((resolve)=>{
        wx.removeStorage({
            key,
            complete (res){
                resolve(res)
            }
        })
    })
}

/**
 * @description 异步从本地清除所有数据
 */
export const asyncClearStorage = ()=>{
    return new Promise((resolve)=>{
        wx.clearStorage({
            complete (res){
                resolve(res)
            }
        })
    })
}