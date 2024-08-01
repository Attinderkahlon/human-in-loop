/* eslint-disable @typescript-eslint/no-explicit-any */

import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useField, useFormikContext } from 'formik'
import dayjs from 'dayjs'

interface FormTimePickerProps {
  name: string
  label: string
  disabled: boolean
  [key: string]: any
}

const FormTimePicker = ({
  name,
  label,
  disabled,
  ...props
}: FormTimePickerProps) => {
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
      disabled={disabled}
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
