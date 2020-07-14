import React, { useState, useEffect } from 'react'
import axios from 'axios'

// custom fetch data hook
export const useUrlFetchData = (initData, initUrl) => {
  const [data, setData] = useState(initData)
  const [url, setUrl] = useState(initUrl)
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
        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [url])
  return [{data, isLoading, isError}, setUrl]
}