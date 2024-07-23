import { useState, useCallback } from 'react'
import axios from 'axios'

interface ApiHook {
  loading: boolean
  error: string | null
  fetchData: <T>(url: string, params?: Record<string, unknown>) => Promise<T>
  postData: <T, R>(url: string, data: T) => Promise<R>
}

const useApi = (): ApiHook => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: unknown) => {
    setLoading(false)
    if (axios.isAxiosError(err)) {
      setError(err.message || 'An error occurred while fetching data')
    } else {
      setError('An unexpected error occurred')
    }
    throw err
  }

  const fetchData = useCallback(
    async <T>(url: string, params = {}): Promise<T> => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<T>(url, { params })
        setLoading(false)
        return response.data
      } catch (err) {
        return handleError(err)
      }
    },
    []
  )

  const postData = useCallback(
    async <T, R>(url: string, data: T): Promise<R> => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.post<R>(url, data)
        setLoading(false)
        return response.data
      } catch (err) {
        return handleError(err)
      }
    },
    []
  )

  return { loading, error, fetchData, postData }
}

export default useApi
