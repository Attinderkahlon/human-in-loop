import { TextField } from '@mui/material'
import { useField } from 'formik'
import FormDatePicker from './FormDatePicker'
import FormTimePicker from './FormTimePicker'

interface DynamicFormFieldProps {
  name: string
  label: string
  type: string
  disabled: boolean
}

const DynamicFormField = ({
  name,
  label,
  type,
  disabled,
}: DynamicFormFieldProps) => {
  const [field, meta] = useField(name)

  const isError = meta.touched && Boolean(meta.error)
  const helperText = isError ? meta.error : ''

  switch (type) {
    case 'date':
      return <FormDatePicker name={name} label={label} disabled={disabled} />
    case 'time':
      return <FormTimePicker name={name} label={label} disabled={disabled} />

    default:
      return (
        <TextField
          {...field}
          label={label}
          value={field.value ?? ''}
          fullWidth
          disabled={disabled}
          error={isError}
          helperText={helperText}
        />
      )
  }
}

export default DynamicFormField
