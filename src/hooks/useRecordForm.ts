/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRecordForm.ts

import { useState, useEffect } from 'react'
import { FormikHelpers } from 'formik'
import { DataRecord } from '../types'

const useRecordForm = (
  record: DataRecord,
  onSubmit: (
    values: DataRecord,
    formikHelpers: FormikHelpers<DataRecord>
  ) => void | Promise<any>
) => {
  const [initialValues, setInitialValues] = useState<DataRecord>(record)

  useEffect(() => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      driver_signature: record.driver_signature === null ? 'no' : 'yes',
    }))
  }, [record.driver_signature])

  const handleSubmit = (
    values: DataRecord,
    formikHelpers: FormikHelpers<DataRecord>
  ) => {
    const transformedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        // eslint-disable-next-line no-extra-semi
        ;(acc as any)[key as keyof DataRecord] = value === '' ? 'NA' : value
        return acc
      },
      {} as Partial<DataRecord>
    ) as DataRecord

    onSubmit(transformedValues, formikHelpers)
  }

  return {
    initialValues,
    handleSubmit,
  }
}

export default useRecordForm
