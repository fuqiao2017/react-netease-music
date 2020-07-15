import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MyErrorBoundary from './screens/AdvancedGuides/ErrorBoundary'
import {
  ButtonCount,
  ListExample,
  ShowPrevCur,
  AsyncOldState,
  AsyncReadCurState,
  TimerOnceState
} from './screens/Hook/Example'
import {FetchExp2} from './screens/Hook/FetchExp2'
import {
  MylazyPage
} from './screens/AdvancedGuides/CodeSplitting'
import ContextExp from './screens/AdvancedGuides/ContextExp'
import UseContextExp from './screens/Hook/UseContextExp'
import {FruitsShop, OneApp, ForwardRefApp} from './screens/AdvancedGuides/RefsAndDom'
import {MyPc} from './screens/AdvancedGuides/OptimizePerf'

function App() {
  return (
    <div className="App">
      <MyErrorBoundary>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <ButtonCount/>
        <ListExample list={[{name: '小明'}, {name: '小黄'}, {name: '小孩'}]}/>
        <UseContextExp/>
        <ShowPrevCur/>
        <AsyncOldState/>
        <AsyncReadCurState/>
        <TimerOnceState/>
        <MylazyPage/>
        <ContextExp/>
        <FruitsShop/>
        <OneApp/>
        <ForwardRefApp/>
        <MyPc/>
        {/* <HookFetchData/> */}
        <FetchExp2/>
      </MyErrorBoundary>
    </div>
  );
}

export default App;
