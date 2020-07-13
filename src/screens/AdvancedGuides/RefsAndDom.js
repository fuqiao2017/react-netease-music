import React, {useRef} from 'react'
/**
 * 函数式组件中的 refs
 */
// 在函数式组件中使用 ref
function FuncMyInput () {
  const inputRef = useRef(null)
  return (
    <div>
      函数式组件中使用 ref 钩子 useRef
      <input ref={inputRef}/>
    </div>
  )
}

// 通过 回调ref 的形式将 函数式子组件内部的 ref 保存到 父组件中
function FuncFruitSelect (props) {
  // 接受父组件的 回调ref
  return <select ref={props.refcb}>
    <option value="banana">香蕉</option>
    <option value="apple">苹果</option>
  </select>
}
export class FruitsShop extends React.Component {
  constructor(props) {
    super(props)
    this.fruitSelector = null
  }
  componentDidMount() {
    console.log(this.fruitSelector)
    this.fruitSelector.value = 'apple'
  }
  render() {
    return (
      <FuncFruitSelect refcb={el => this.fruitSelector = el}/>
    )
  }
}

/**
 * class 组件中的 creatRef
 */
// 通过 current 属性访问当前 node
class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.inputCompanyRef = React.createRef(null)
  }
  handleInputFocus = () => {
    this.inputCompanyRef.current.focus()
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="company">公司名称: </label>
        <input ref={this.inputCompanyRef} id="company"/>
      </React.Fragment>
    )
  }
}
export class OneApp extends React.Component {
  constructor(props) {
    super(props)
    this.myInputRef = React.createRef(null)
  }
  componentDidMount() {
    console.log(this.myInputRef)
    this.myInputRef.current.handleInputFocus()
  }
  render() {
    return (
      <MyInput ref={this.myInputRef}/>
    )
  }
}