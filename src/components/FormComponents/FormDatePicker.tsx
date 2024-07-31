/* eslint-disable @typescript-eslint/no-explicit-any */
// FormComponents/FormDatePicker.tsx
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useField, useFormikContext } from 'formik'
import dayjs from 'dayjs'

const FormDatePicker = (
  { name, label }: { name: string; label: string; [key: string]: any },
  ...props: any
) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  return (
    <DatePicker
      {...props}
      label={label}
      value={field.value === 'NA' ? null : dayjs(field.value, 'YYYY-MM-DD')}
      onChange={(newValue) => {
        setFieldValue(name, newValue ? newValue.format('YYYY-MM-DD') : 'NA')
      }}
      format='YYYY-MM-DD'
      slotProps={{
        textField: {
          fullWidth: true,
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched && meta.error,
        },
      }}
    />
  )
}

export default FormDatePicker
