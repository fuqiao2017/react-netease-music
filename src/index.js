import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyErrorBoundary from './screens/AdvancedGuides/ErrorBoundary'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  {/* 开启严格模式 */}
    <MyErrorBoundary>
    {/* 错误边界 */}
      <App />
    </MyErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
