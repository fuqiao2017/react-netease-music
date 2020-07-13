import React, { Suspense } from 'react'

// 这种方式 othercomp 的代码会被单独打包，只有在需要渲染这个组件的时候，组件代码包才会被下载然后渲染
const OtherComp = React.lazy(() => import('./OtherComp'))

export const MylazyPage = function () {
  return (
    <>
      <span>react.lazy</span>
      <Suspense fallback={<div style={{color: 'red'}}>Loading</div>}>
        <OtherComp/>
      </Suspense>
    </>
  )
}