import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Grid, TextField, Box, Paper } from '@mui/material'
import { DataRecord } from '../types'
import validationSchema from '../validationSchema'

interface RecordFormProps {
  record: DataRecord
  onSubmit: (
    values: DataRecord,
    formikHelpers: FormikHelpers<DataRecord>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => void | Promise<any>
  isEditing: boolean
  onEdit: () => void
}

const RecordForm: React.FC<RecordFormProps> = ({
  record,
  onSubmit,
  isEditing,
  onEdit,
}) => {
  const handleSubmit = (
    values: DataRecord,
    formikHelpers: FormikHelpers<DataRecord>
  ) => {
    const transformedValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        acc[key as keyof DataRecord] = value === '' ? 'NA' : value
        return acc
      },
      {} as DataRecord
    )

    onSubmit(transformedValues, formikHelpers)
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Formik
        initialValues={record}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, handleChange }) => (
          <Form>
            <h1 className='mb-8 text-xl'>
              Form Type:{' '}
              <span className='text-green-900'>
                {values.form_type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </h1>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Driver Name'
                  name='driver_name'
                  value={
                    values.driver_name === 'NA' ? '' : values.driver_name || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.driver_name && Boolean(errors.driver_name)}
                  helperText={touched.driver_name && errors.driver_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Date'
                  name='date'
                  value={values.date}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Clock On Time'
                  type='time'
                  name='clock_on_time'
                  value={
                    values.clock_on_time === 'NA'
                      ? ''
                      : values.clock_on_time || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.clock_on_time && Boolean(errors.clock_on_time)}
                  helperText={touched.clock_on_time && errors.clock_on_time}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Clock Off Time'
                  type='time'
                  name='clock_off_time'
                  value={
                    values.clock_off_time === 'NA'
                      ? ''
                      : values.clock_off_time || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.clock_off_time && Boolean(errors.clock_off_time)
                  }
                  helperText={touched.clock_off_time && errors.clock_off_time}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='ODO Start'
                  type='number'
                  name='odo_start'
                  value={
                    values.odo_start === 'NA' ? '' : values.odo_start || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.odo_start && Boolean(errors.odo_start)}
                  helperText={touched.odo_start && errors.odo_start}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='ODO Finish'
                  type='number'
                  name='odo_finish'
                  value={
                    values.odo_finish === 'NA' ? '' : values.odo_finish || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.odo_finish && Boolean(errors.odo_finish)}
                  helperText={touched.odo_finish && errors.odo_finish}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Total Work'
                  name='total_work'
                  value={
                    values.total_work === 'NA' ? '' : values.total_work || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.total_work && Boolean(errors.total_work)}
                  helperText={touched.total_work && errors.total_work}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Total Rest'
                  name='total_rest'
                  value={
                    values.total_rest === 'NA' ? '' : values.total_rest || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.total_rest && Boolean(errors.total_rest)}
                  helperText={touched.total_rest && errors.total_rest}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Total KM'
                  name='total_km'
                  value={values.total_km === 'NA' ? '' : values.total_km || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.total_km && Boolean(errors.total_km)}
                  helperText={touched.total_km && errors.total_km}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Driver License'
                  name='driver_license'
                  value={
                    values.driver_license === 'NA'
                      ? ''
                      : values.driver_license || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.driver_license && Boolean(errors.driver_license)
                  }
                  helperText={touched.driver_license && errors.driver_license}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Driver License Expiry'
                  name='driver_licence_expiry'
                  value={
                    values.driver_licence_expiry === 'NA'
                      ? ''
                      : values.driver_licence_expiry || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.driver_licence_expiry &&
                    Boolean(errors.driver_licence_expiry)
                  }
                  helperText={
                    touched.driver_licence_expiry &&
                    errors.driver_licence_expiry
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Pick Up Location'
                  name='pick_up_location'
                  value={
                    values.pick_up_location === 'NA'
                      ? ''
                      : values.pick_up_location || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.pick_up_location && Boolean(errors.pick_up_location)
                  }
                  helperText={
                    touched.pick_up_location && errors.pick_up_location
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Driver Signature'
                  name='driver_signature'
                  value={
                    values.driver_signature === 'NA'
                      ? ''
                      : values.driver_signature || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.driver_signature && Boolean(errors.driver_signature)
                  }
                  helperText={
                    touched.driver_signature && errors.driver_signature
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Drop Off Location'
                  name='drop_off_location'
                  value={
                    values.drop_off_location === 'NA'
                      ? ''
                      : values.drop_off_location || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.drop_off_location &&
                    Boolean(errors.drop_off_location)
                  }
                  helperText={
                    touched.drop_off_location && errors.drop_off_location
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Fuel Card'
                  name='fuel_card'
                  value={
                    values.fuel_card === 'NA' ? '' : values.fuel_card || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.fuel_card && Boolean(errors.fuel_card)}
                  helperText={touched.fuel_card && errors.fuel_card}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Truck Rego Number'
                  name='truck_rego_number'
                  value={
                    values.truck_rego_number === 'NA'
                      ? ''
                      : values.truck_rego_number || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.truck_rego_number &&
                    Boolean(errors.truck_rego_number)
                  }
                  helperText={
                    touched.truck_rego_number && errors.truck_rego_number
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 1 Start'
                  type='time'
                  name='break_1_start'
                  value={
                    values.break_1_start === 'NA'
                      ? ''
                      : values.break_1_start || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.break_1_start && Boolean(errors.break_1_start)}
                  helperText={touched.break_1_start && errors.break_1_start}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 1 Finish'
                  type='time'
                  name='break_1_finish'
                  value={
                    values.break_1_finish === 'NA'
                      ? ''
                      : values.break_1_finish || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.break_1_finish && Boolean(errors.break_1_finish)
                  }
                  helperText={touched.break_1_finish && errors.break_1_finish}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 2 Start'
                  type='time'
                  name='break_2_start'
                  value={
                    values.break_2_start === 'NA'
                      ? ''
                      : values.break_2_start || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.break_2_start && Boolean(errors.break_2_start)}
                  helperText={touched.break_2_start && errors.break_2_start}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 2 Finish'
                  type='time'
                  name='break_2_finish'
                  value={
                    values.break_2_finish === 'NA'
                      ? ''
                      : values.break_2_finish || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.break_2_finish && Boolean(errors.break_2_finish)
                  }
                  helperText={touched.break_2_finish && errors.break_2_finish}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 1 Time'
                  name='break_1_time'
                  value={
                    values.break_1_time === 'NA'
                      ? ''
                      : values.break_1_time || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.break_1_time && Boolean(errors.break_1_time)}
                  helperText={touched.break_1_time && errors.break_1_time}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 2 Time'
                  name='break_2_time'
                  value={
                    values.break_2_time === 'NA'
                      ? ''
                      : values.break_2_time || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.break_2_time && Boolean(errors.break_2_time)}
                  helperText={touched.break_2_time && errors.break_2_time}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Break 3 Time'
                  name='break_3_time'
                  value={
                    values.break_3_time === 'NA'
                      ? ''
                      : values.break_3_time || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.break_3_time && Boolean(errors.break_3_time)}
                  helperText={touched.break_3_time && errors.break_3_time}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Total Fuel Amount'
                  type='number'
                  name='total_fuel_amount'
                  value={
                    values.total_fuel_amount === 'NA'
                      ? ''
                      : values.total_fuel_amount || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.total_fuel_amount &&
                    Boolean(errors.total_fuel_amount)
                  }
                  helperText={
                    touched.total_fuel_amount && errors.total_fuel_amount
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Diesel Qty'
                  type='number'
                  name='diesel_qty'
                  value={
                    values.diesel_qty === 'NA' ? '' : values.diesel_qty || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.diesel_qty && Boolean(errors.diesel_qty)}
                  helperText={touched.diesel_qty && errors.diesel_qty}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Trailer A'
                  name='trailer_A'
                  value={
                    values.trailer_A === 'NA' ? '' : values.trailer_A || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.trailer_A && Boolean(errors.trailer_A)}
                  helperText={touched.trailer_A && errors.trailer_A}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Trailer B'
                  name='trailer_B'
                  value={
                    values.trailer_B === 'NA' ? '' : values.trailer_B || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.trailer_B && Boolean(errors.trailer_B)}
                  helperText={touched.trailer_B && errors.trailer_B}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Trailer AB'
                  name='trailer_AB'
                  value={
                    values.trailer_AB === 'NA' ? '' : values.trailer_AB || ''
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.trailer_AB && Boolean(errors.trailer_AB)}
                  helperText={touched.trailer_AB && errors.trailer_AB}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Trip'
                  name='trip'
                  value={values.trip === 'NA' ? '' : values.trip || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.trip && Boolean(errors.trip)}
                  helperText={touched.trip && errors.trip}
                />
              </Grid>
              <Grid item xs={12}>
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
        )}
      </Formik>
    </Paper>
  )
}

export default RecordForm
