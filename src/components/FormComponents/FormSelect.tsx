// FormComponents/FormSelect.tsx
import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { useField } from 'formik'

const FormSelect = ({
  name,
  label,
  options,
  ...props
}: {
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  [key: string]: unknown
}) => {
  const [field, meta] = useField(name)

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        labelId={`${name}-label`}
        id={name}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  )
}

export default FormSelect
