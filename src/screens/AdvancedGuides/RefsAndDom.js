import React, {useRef} from 'react'

function FuncYouButton () {
  function btnClick(e) {
    console.log('FuncYouButton clicked ====', e)
  }
  return (
    <button onClick={btnClick}>原生标签button</button>
  )
}
/**
 * 函数式组件中的 refs
 */
// 在函数式组件内部使用 ref
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
    this.fruitSelector = null // null
    this.youBtn = React.createRef()
  }
  componentDidMount() {
    console.log('FruitsShop === ', this.fruitSelector, this.youBtn)
    this.fruitSelector.value = 'apple'
  }
  render() {
    return (
      <>
        <FuncFruitSelect refcb={el => this.fruitSelector = el}/>

        {/* youBtn 这个 ref 始终是 null */}
        {/* ref={el => this.youBtn = el} 也不可以 */}
        <FuncYouButton ref={this.youBtn}/> {/* 这种方式 not work，因为函数式组件没有实例 */}
      </>
    )
  }
}

/**
 * class 组件中的 creatRef
 */
// class 组件内部使用 ref
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
class AiBtn extends React.Component {
  handleBtnClick = () => {
    // 如果需要操作 DOM，需要内部使用 ref
    console.log('哈哈哈', this.props)
  }
  render() {
    return <button ref={this.props.refAlia} onClick={this.handleBtnClick}>{this.props.children}</button>
  }
}
export class OneApp extends React.Component {
  constructor(props) {
    super(props)
    this.myInputRef = React.createRef(null)
    this.aiBtnRef = React.createRef(null)
    this.iaibtnRef = React.createRef()
  }
  componentDidMount() {
    console.log(this.myInputRef, this.aiBtnRef, this.iaibtnRef)
    this.myInputRef.current.handleInputFocus()

    this.aiBtnRef.current.handleBtnClick()

    setTimeout(() => {
      this.iaibtnRef.current.innerText = '外星人'
    }, 3000)
  }
  render() {
    return (
      <>
        <MyInput ref={this.myInputRef}/>

        {/* 获取到的是 AiBtn 的 ref，可以使用 AiBtn 内部的方法 */}
        {/* 将 iaibtnRef 赋到另外的属性名称 refAlia 上 传递获取 AiBtn 内部 button ref */}
        <AiBtn ref={this.aiBtnRef} refAlia={this.iaibtnRef}>外星按钮</AiBtn>
      </>
    )
  }
}


/**
 * 转发 refs (forwarding-refs)
 */
// 用于 包裹函数式组件
// 改造 高复用性函数组件

// function YourFunBtn (props) {
//   return (
//     <div>
//       <span>这是一个可复用的迷人按钮</span>
//       <button>{props.children}</button>
//     </div>
//   )
// }
const YourFunBtn = React.forwardRef((props, ref) => {
  function handleClick(e) {
    console.log('{{{{{{{{{{{[', e)
  }
  return (
    <div>
      <span>这是一个可复用的迷人按钮</span>
      <button ref={ref} onClick={handleClick}>{props.children}</button>
    </div>
  )
})
export class ForwardRefApp extends React.Component {
  constructor(props) {
    super(props)
    this.YFB_ref = React.createRef()
    this.userAva_ref = React.createRef()
  }
  componentDidMount() {
    console.log('ForwardRefApp ===---', this.YFB_ref)
    this.YFB_ref.current.click()

    this.userAva_ref.current.rotateAvatar()
  }
  render() {
    return (
      <>
        {/* 使用 forwardRef 包裹后的函数式组件, 这是 ref 穿透 */}
        <YourFunBtn ref={this.YFB_ref}>Fun按钮</YourFunBtn>

        <EnhancedUserAvatar ref={this.userAva_ref}/>
      </>
    )
  }
}

// HOC 高阶组件中转发 ref
class UserAvatar extends React.Component {
  constructor(props) {
    super(props)
    this.avatarRef = React.createRef()
  }
  rotateAvatar = () => {
    console.log(this.avatarRef, '-----+++++++')
  }
  componentDidMount () {
    console.log(this.avatarRef, '9999999')
  }
  render() {
    return (
      <div>
        <img ref={this.avatarRef} src="https://user-gold-cdn.xitu.io/2019/12/19/16f1bcc1715f31f5?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
      </div>
    )
  }
}
const EnhancedUserAvatar = enhanceSomethingHoc(UserAvatar)
function getHocDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
function enhanceSomethingHoc(WrappedComponent) {
  class EnhanceSome extends React.Component {
    componentDidUpdate () {
      console.log('do something enhance or otherthings')
    }
    calcByProp = () => {
      console.log('do something...')
      return 0
    }
    render() {
      let {forwardedRef, ...passThrough} = this.props
      // 透传 props
      return <WrappedComponent ref={forwardedRef}  {...passThrough}/>
    }
  }

  EnhanceSome.displayName = getHocDisplayName(WrappedComponent) 

  // return EnhanceSome
  return React.forwardRef((props, ref) => {
    return <EnhanceSome forwardedRef={ref} {...props}/>
  })
}

