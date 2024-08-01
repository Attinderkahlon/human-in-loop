/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { useField } from 'formik'

interface FormFieldProps {
  name: string
  label: string
  disabled?: boolean
  [key: string]: any
}

const FormField = ({ name, label, disabled, ...props }: FormFieldProps) => {
  const [field, meta] = useField(name)

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      disabled={disabled}
    />
  )
}

export default FormField
