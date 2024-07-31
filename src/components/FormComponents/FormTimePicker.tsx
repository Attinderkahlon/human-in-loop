/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useField, useFormikContext } from 'formik'
import dayjs from 'dayjs'

const FormTimePicker = (
  { name, label }: { name: string; label: string; [key: string]: any },
  ...props: any
) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  return (
    <TimePicker
      {...props}
      label={label}
      value={field.value === 'NA' ? null : dayjs(field.value, 'HH:mm')}
      onChange={(newValue) => {
        setFieldValue(name, newValue ? newValue.format('HH:mm') : 'NA')
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched && meta.error,
        },
      }}
      ampm={false}
    />
  )
}

export default FormTimePicker
