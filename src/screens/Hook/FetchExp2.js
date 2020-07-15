import React, { useState } from 'react'
import { useUrlFetchData } from './CustomHooks'

export function FetchExp2() {
  const [query, setQuery] = useState('redux')
  const prefixUrl = 'https://hn.algolia.com/api/v1/search?query='

  const [{data, isLoading, isError}, doFetch] = useUrlFetchData({hits: []}, prefixUrl+'redux')

  return (
    <>
      {/* 使用 form，可以按 Enter 键搜索，体验好了 */}
      <form onSubmit={(event) => {
        doFetch(prefixUrl+query)
        // 当 submit 一个表单时，浏览器会 reload，
        // 为了阻止浏览器刷新，调用 preventDefault 方法，阻止默认行为
        event.preventDefault()
      }}>
        <label htmlFor="ArticleTheme">请输入标题: </label>
        <input
          id="ArticleTheme"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}/>
          <button type="submit">搜索</button>
      </form>
      {/* <button type="button" onClick={() => setUrl(prefixUrl+query)}>点击搜索</button> */}
      {/* <React.Suspense fallback={<h3>正在为你查找......</h3>}> */}
      {/* 目前 react.suspense 只可配合 react.lazy 懒加载组件使用，未来会加到 data fetch 中 */}
      { isError && <div>something was wrong...</div> }
      {
        isLoading ? (
          <h3>正在为你查找......</h3>
        ) : (
          <ul>
            {
              data.hits.map(article => (
                <li key={article.objectID}>
                  <a href={article.url}>{article.title}</a>
                </li>
              ))
            }
          </ul>
        )
      }
      {/* </React.Suspense> */}
    </>
  )
}