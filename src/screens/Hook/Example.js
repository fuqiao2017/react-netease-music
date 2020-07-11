import React, {useState, useEffect} from 'react'

// State Hook
// useState
export const ButtonCount = function () {
  console.log('ButtonCount execution')
  // count 初始值 0，可以通过传入函数计算后返回
  // useState(() => { do calculate; return value })
  const [count, setCount] = useState(0)
  // 一个对象状态
  const [person, setPerson] = useState({name: '刘能', age: 50, job: '花魁'})
  return (
    <div>
      <button onClick={() => setCount(count+1)}>You clicked btn {count} times</button>
      <button onClick={() => setPerson(prevState => 
        // 与 class 中的 setState 不同，useState 是直接替换 state
        // 可以使用 函数式 的 setPerson 结合对象展开运算符或者 object.assign 来合并对象
        ({...prevState, ...{job: 'c++程序员'}})
      )}>点击变成程序员</button>
      <h3>{person.name} is {person.job}</h3>
    </div>
  )
}

// Effect Hook
// useEffect
export const ListExample = function ({list = []}) {
  const [clientName, setClientName] = useState('')
  useEffect(() => {
    document.title = `You choosed ${clientName}`
    return () => {
      console.log(`在下一次执行 effect 之前，会先清除上一次的 effect | ${clientName}`)
      document.title = 'Initial Page Title'
    }
    // 依赖数组如果是空数组 []，则 effect 内部的 props 和 state 会一直保持初始值
  }) // , [clientName] 可以传一个数组（也称为 依赖），表示仅在数组内的 state 或 props 至少有一个变化时就执行 effect
  // 类似于 class 中的 prevState.xxx !== state.xxx
  return (
    <ul>
      {
        list.map((item, idx) => <li key={idx} onClick={() => setClientName(item.name)}>{item.name}</li>)
      }
    </ul>
  )
}