import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function HookFetchData() {
  const [articles, setArticles] = useState({hits: []})
  const [query, setQuery] = useState('redux')
  const prefixUrl = 'https://hn.algolia.com/api/v1/search?query='
  const [url, setUrl] = useState(prefixUrl+'redux')
  const [isLoading, setIsLoading] = useState(false) 
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const result = await axios(
          url,
        )
        setArticles(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [url]) // 传入空数组，只在 didmount 之后执行一次

  return (
    <>
      {/* 使用 form，可以按 Enter 键搜索，体验好了 */}
      <form onSubmit={(event) => {
        setUrl(prefixUrl+query)
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
              articles.hits.map(article => (
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