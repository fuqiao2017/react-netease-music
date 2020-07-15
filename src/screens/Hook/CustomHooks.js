import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

// custom fetch data hook
// 使用 useReducer 后，性能好像有所下降
export const useUrlFetchData = (initData, initUrl) => {
  // const [data, setData] = useState(initData)
  const [url, setUrl] = useState(initUrl)
  // const [isLoading, setIsLoading] = useState(false) 
  // const [isError, setIsError] = useState(false)

  // 用 useReducer 管理内部相关的 state
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  })

  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      // setIsLoading(true)
      // setIsError(false)
      dispatch({type: 'FETCH_INIT'})

      try {
        const result = await axios(
          url,
        )
        // setData(result.data)
        if (!didCancel)
          dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      } catch (error) {
        // setIsError(true)
        if (!didCancel)
          dispatch({type: 'FETCH_ERROR'})
      }

      // setIsLoading(false)
    }
    fetchData()
    return () => {
      console.log('didCancel', didCancel)
      // 用一个变量表示组件是否已经卸载，如果已经卸载，则不再设置 data
      didCancel = true
    }
  }, [url])
  return [state, setUrl]
}