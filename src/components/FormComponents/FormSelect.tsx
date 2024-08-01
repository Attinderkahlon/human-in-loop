import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { useField } from 'formik'

interface FormSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  disabled: boolean
  [key: string]: unknown
}

const FormSelect = ({
  name,
  label,
  options,
  disabled,
  ...props
}: FormSelectProps) => {
  const [field, meta] = useField(name)

  return (
    <FormControl
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      variant='outlined'
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Select
        {...field}
        {...props}
        labelId={`${name}-label`}
        id={name}
        label={label}
        disabled={disabled}
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
