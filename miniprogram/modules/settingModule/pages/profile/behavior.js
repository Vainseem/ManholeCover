import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
// 导入 store 对象

import {userStore} from '../../../.././stores/userstore'

export const userBehavior = BehaviorWithStore({
  storeBindings: {
    store: userStore,
    fields: ['userInfo']
  }
})

