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
  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Formik
        initialValues={record}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Driver Name'
                  name='driver_name'
                  value={values.driver_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.driver_name && Boolean(errors.driver_name)}
                  helperText={touched.driver_name && errors.driver_name}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Clock On Time'
                  name='clock_on_time'
                  value={values.clock_on_time}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.clock_on_time && Boolean(errors.clock_on_time)}
                  helperText={touched.clock_on_time && errors.clock_on_time}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='Clock Off Time'
                  name='clock_off_time'
                  value={values.clock_off_time}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={
                    touched.clock_off_time && Boolean(errors.clock_off_time)
                  }
                  helperText={touched.clock_off_time && errors.clock_off_time}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='ODO Start'
                  name='odo_start'
                  value={values.odo_start}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.odo_start && Boolean(errors.odo_start)}
                  helperText={touched.odo_start && errors.odo_start}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label='ODO Finish'
                  name='odo_finish'
                  value={values.odo_finish}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.odo_finish && Boolean(errors.odo_finish)}
                  helperText={touched.odo_finish && errors.odo_finish}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Total KM'
                  name='total_km'
                  value={values.total_km}
                  onChange={handleChange}
                  disabled={!isEditing}
                  error={touched.total_km && Boolean(errors.total_km)}
                  helperText={touched.total_km && errors.total_km}
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
                    Approve
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
