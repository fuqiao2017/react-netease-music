import React, {useState, useEffect, useRef} from 'react'

// State Hook
// useState
export const ButtonCount = function () {
  console.log('ButtonCount execution')
  // count 初始值 0，可以通过传入函数计算后返回, React 只会在首次渲染时调用这个函数
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

// 如何获取上一轮的 props 或 state
export const ShowPrevCur = function () {
  const [count, setCount] = useState(0)
  const prevRef = useRef()
  useEffect(() => {
    prevRef.current = count
  })
  // 首先 current 变化不会引起渲染
  // 第一次 mounted 后执行 effect 之前 current = undefined，执行 effect 后 current = 0
  // 第二次 update 时, current = 0, update 之后执行 effect，current = 1
  const prevCount = prevRef.current
  return (
    <>
      <button onClick={() => setCount(count+1)}>click for previous count</button>
      <span>Now count = {count} ; previous count = {prevCount}</span>
    </>
  )
}

// 一个自定义的 usePrevious Hook
function usePrevious (value) {
  const prevRef = useRef()
  useEffect(() => {
    prevRef.current = value
  })
  return prevRef.current
}

// 异步回调中默认读取到 state 的旧值
export const AsyncOldState = function () {
  const [count, setCount] = useState(0)
  function handleAsyncClick() {
    setTimeout(() => {
      alert(`show the time clicked count = ${count}`)
    }, 3000)
  }
  const prevCount = usePrevious(count)
  return (
    <div>
      <button onClick={() => setCount(count+1)}>click add count {count}</button>
      <button onClick={handleAsyncClick}>show async alert {prevCount}</button>
    </div>
  )
}

// 通过 ref 使异步回调读取到最新的 state
export const AsyncReadCurState = function () {
  const [count, setCount] = useState(0)
  const curRef = useRef()
  curRef.current = count
  function handleAsyncClick() {
    setTimeout(() => {
      alert(`show me cur count = ${curRef.current}`)
    }, 5000)
  }
  return (
    <div>
      <button onClick={() => setCount(count+1)}>click add count {count}</button>
      <button onClick={handleAsyncClick}>show async alert cur count</button>
    </div>
  )
}

// 如果 useEffect 里面有 计时器 setTimeout setInterval, 那么 基本上依赖就得传一个 空数组 [] 了,
// 不然每次执行 effect 时, 计时器都会被重置
// 而且要在 计时器回调里面访问最新 state 的话，还得通过 ref
export const TimerOnceState = function (props) {
  const [count, setCount] = useState(1)
  const latestProps = useRef(count) // props
  useEffect(() => {
    latestProps.current = count // ref 的属性名 必须是 current
  })
  useEffect(() => {
    console.log('TimerOnceState excuted effect')
    function tick() {
      // setCount(count+1) // 这种方式会有 warning，要求依赖count，但是我们不重置计时器必须传空数组
      setCount(c => c+1) // 换成函数式就没有了 warning，这个时候 effct 内部没有依赖 count
      // console.log(`这里读取不到最新的 count, 而是最初的 count = ${count}`)
      // 通过 ref 读取最新的 props
      // console.log(`无依赖的 effect 通过 ref 读取到最新的 props ${latestProps.current}`)
      // 通过 ref 读取最新的 state count
      console.log(`无依赖的 effect 通过 ref 读取到最新的 state count ${latestProps.current}`)
      if (latestProps.current > 9) {
        clearInterval(id)
      }
    }
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, []) // 这里要传空数组，因为我们不希望定时器被重置
  return (
    <div>
      <button onClick={() => setCount(count+1)}>TimerOnceState count = {count}</button>
    </div>
  )
}