import React from 'react'
// PureComponent 与 数组、对象
// Array push 方法返回的是 数组的长度
class ListOfWords extends React.PureComponent {
  render() {
    console.log(this.props)
    return (
      <div>{this.props.words.join('-')}</div>
    )
  }
}

export class MyPc extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: ['hello']
    }
  }
  setWords = () => {
    // 不会触发更新，因为 PureComponent 浅比较，words 数组地址始终没变
    // let {words} = this.state
    // words.push('new world')
    // this.setState({
    //   words: words
    // })

    // 触发更新，用新数组替换整个数组
    this.setState(prevState => ({
      // words: prevState.words.concat(['new world'])
      words: [...prevState.words, 'new world']
    }))
  }
  render() {
    return (
      <>
        <button onClick={this.setWords}>点击加词</button>
        <ListOfWords words={this.state.words}/>
      </>
    )
  }
}