import axios from 'axios'
import { DataRecord } from '../types'

export const fetchAllRecords = async (
  fetchData: <T>(url: string) => Promise<T>
): Promise<DataRecord[]> => {
  try {
    const data = await fetchData<DataRecord[]>(
      `${import.meta.env.VITE_BASE_URL}/api/data`
    )
    return data.filter((record) => record.human_check === 0)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Error fetching data. Please try again.')
  }
}

export const fetchImage = async (imagePath: string): Promise<string> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/image`, {
      params: { path: imagePath },
      responseType: 'blob',
    })
    return URL.createObjectURL(new Blob([response.data]))
  } catch (error) {
    console.error('Error fetching image:', error)
    throw new Error('Error fetching image. Please try again.')
  }
}

const formatDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const handleApprove = async (
  postData: <T, R>(url: string, data: T) => Promise<R>,
  values: DataRecord
): Promise<void> => {
  try {
    const updatedRecord = {
      ...values,
      human_check: 1,
      update_timestamp: formatDate(),
    }
    await postData(
      `${import.meta.env.VITE_BASE_URL}/update_and_insert`,
      updatedRecord
    )
  } catch (error) {
    console.error('Error approving data:', error)
    throw new Error('Error approving data. Please try again.')
  }
}
