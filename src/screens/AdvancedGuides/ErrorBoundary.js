import React from 'react'

// 该组件捕获渲染时不可意料的错误
export default class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    // 捕获 error 后更新 state，显示报错降级 UI
    console.log(error)
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // 可以将 error 信息提交给服务器
    console.log(error, errorInfo)
    // logErrorToService(error, errorInfo)
  }

  render() {
    return (
        this.state.hasError ?
        <h2>报错了</h2> :
        this.props.children
    )
  }
}