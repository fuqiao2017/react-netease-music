import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  ButtonCount,
  ListExample,
  ShowPrevCur,
  AsyncOldState,
  AsyncReadCurState,
  TimerOnceState
} from './screens/Hook/Example'
import UseContextExp from './screens/Hook/UseContextExp'

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
