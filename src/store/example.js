import { createStore } from '@reduxjs/toolkit'

// store 由 createStore 生成，传入 reducer 函数，和 初始 state
const initialState = {
  user: {}
}
const UserReducer = (state, action) => {

}
// action 可以是同步也可以是异步
// reducer 是同步的纯函数
const store = createStore(UserReducer, initialState) // 第三个参数 enhancer