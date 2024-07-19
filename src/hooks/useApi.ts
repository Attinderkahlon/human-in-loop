// src/hooks/useApi.ts
import { useState, useCallback } from 'react'
import axios from 'axios'

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async (url: string, params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(url, { params })
      setLoading(false)
      return response.data
    } catch (err) {
      setLoading(false)
      if (axios.isAxiosError(err)) {
        setError(err.message || 'An error occurred while fetching data')
      } else {
        setError('An unexpected error occurred')
      }
      throw err
    }
  }, [])

  const postData = useCallback(async (url: string, data: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(url, data)
      setLoading(false)
      return response.data
    } catch (err) {
      setLoading(false)
      if (axios.isAxiosError(err)) {
        setError(err.message || 'An error occurred while posting data')
      } else {
        setError('An unexpected error occurred')
      }
      throw err
    }
  }, [])

  return { loading, error, fetchData, postData }
}

export default useApi
