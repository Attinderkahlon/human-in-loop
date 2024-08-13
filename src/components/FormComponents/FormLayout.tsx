import { Box, Button, Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DynamicFormField from './DynamicFormField'
import validationSchema from '../../validationSchema'
// import { formConfigurations } from '../../configs/formConfigs'

import { DataRecord } from '../../types'
import FormSelect from './FormSelect'

interface FormLayoutProps {
  formType: string
  initialValues: DataRecord
  onSubmit: (values: DataRecord) => void
  isEditing: boolean
  onEdit: () => void
}

const selectOptions = {
  country: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ],
  city: [
    { value: 'ny', label: 'New York' },
    { value: 'la', label: 'Los Angeles' },
  ],
  driver_signature: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
}

const hiddenFields = [
  'id',
  'file_path',
  'human_check',
  'insertion_timestamp',
  'update_timestamp',
  'break_3_time',
]

const FormLayout = ({
  formType,
  initialValues,
  onSubmit,
  isEditing,
  onEdit,
}: FormLayoutProps) => {
  // const config =
  //   formConfigurations[formType as keyof typeof formConfigurations] ||
  //   formConfigurations.default

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, values, errors }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <h1 className='mb-8 text-xl'>
              Form Type:{' '}
              <span className='text-green-900'>
                {formType
                  ? formType
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                  : 'N/A'}
              </span>
            </h1>
            <Grid container spacing={2}>
              {Object.keys(initialValues)
                .filter((field) => !hiddenFields.includes(field))
                .map((field) => {
                  const fieldType = getFieldType(field)
                  return (
                    <Grid item xs={12} md={6} key={field}>
                      {fieldType === 'select' ? (
                        <FormSelect
                          name={field}
                          label={field.replace(/_/g, ' ').toUpperCase()}
                          options={selectOptions.driver_signature}
                          disabled={!isEditing}
                          value={values.driver_signature}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFieldValue(field, e.target.value)
                          }
                        />
                      ) : (
                        <DynamicFormField
                          name={field}
                          label={field.replace(/_/g, ' ').toUpperCase()}
                          type={fieldType}
                          disabled={!isEditing}
                        />
                      )}
                    </Grid>
                  )
                })}
              <Grid item xs={12}>
                {Object.keys(errors).length > 0 && (
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant='h6' color='error'>
                        Validation Errors:
                      </Typography>
                      {Object.entries(errors).map(([field, error]) => (
                        <Typography key={field} variant='body2' color='error'>
                          {field}: {error}
                        </Typography>
                      ))}{' '}
                    </Box>
                  </Grid>
                )}
                <Box display='flex' justifyContent='space-between'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  {!isEditing && (
                    <Button
                      onClick={onEdit}
                      variant='outlined'
                      color='secondary'
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  )
}

const getFieldType = (field: string): string => {
  if (field.includes('date')) return 'date'
  if (
    field.includes('time') ||
    field.includes('break') ||
    field.includes('total_work') ||
    field.includes('total_rest')
  )
    return 'time'
  if (field.includes('signature')) return 'select'
  return 'text'
}

export default FormLayout
