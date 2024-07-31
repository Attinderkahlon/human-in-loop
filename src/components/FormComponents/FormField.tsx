/* eslint-disable @typescript-eslint/no-explicit-any */
// FormComponents/FormField.tsx
import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'

const FormField = (
  { name, label }: { name: string; label: string; [key: string]: any },
  ...props: any
) => {
  const [field, meta] = useField(name)

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  )
}

export default FormField
