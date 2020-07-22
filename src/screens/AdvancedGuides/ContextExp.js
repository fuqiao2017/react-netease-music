import React, { useContext } from 'react'
const themeall = ['light', 'dark']
const ThemeContext = React.createContext('dark')

const TypeButtonStyle = {
  light: {
    color: '#000',
    bg: '#fff',
    bdColor: 'yellow'
  },
  dark: {
    color: '#fff',
    bg: '#000',
    bdColor: 'red'
  }
}

export default class ContextExp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curTheme: 'light'
    }
  }
  clickEvent = (e) => {
    // If you want to access the event properties in an asynchronous way,
    // you should call event.persist() on the event, which will remove
    // the synthetic event from the pool and allow references to the event
    // to be retained by user code
    e.persist()
    console.log(e)
  }
  render() {
    return (
      <>
        <ThemeContext.Provider value={this.state.curTheme}>
          <div>
            <select value={this.state.curTheme} onChange={(event) => this.setState({curTheme: event.target.value})}>
              {
                themeall.map(theme => <option key={theme} value={theme}>{theme}</option>)
              }
            </select>
            <span>{this.state.curTheme}</span>
            <TypeButtonOne text="按钮"/>
            <TypeButtonTwo/>
            <TypeBtnThree/>
            <NormalBtn/>
          </div>
        </ThemeContext.Provider>
        {/* 下面这个按钮往上找不到对应的provider，所以使用默认context值 */}
        <TypeButtonTwo/>
        <div onClick={this.clickEvent}>click see event</div>
      </>
    )
  }
}

function TypeButtonOne(props) {
  // 函数组件形式，使用 useContext
  const themeType = useContext(ThemeContext)
  console.log(themeType)
  return (
    <button
      style={{
        color: TypeButtonStyle[themeType].color,
        backgroundColor: TypeButtonStyle[themeType].bg
      }}>
      {props.text}
    </button>
  )
}

// class 组件的形式
class TypeButtonTwo extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <button style={{
      borderRadius: 10,
      height: 20,
      borderColor: TypeButtonStyle[this.context].bdColor
    }}>按钮类型二</button>;
  }
}

// MyContext.Consumer
function TypeBtnThree() {
  return (
    <ThemeContext.Consumer>
      {value => (
        <button style={{
          boxShadow: '1px 3px 1px '+TypeButtonStyle[value].bdColor
        }}>Consumer 按钮三</button>
      )}
    </ThemeContext.Consumer>
  )
}

function NormalBtn(props) {
  console.log('NormalBtn rendering')
  // return <button>这是普通按钮{props.name.a}</button> // 渲染时发生错误被 错误边界组件 捕获
  return <button>这是普通按钮 props.name.a</button>
}