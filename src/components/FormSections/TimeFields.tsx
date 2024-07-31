// FormSections/TimeFields.tsx
import React from 'react'
import { Grid } from '@mui/material'
import FormField from '../FormComponents/FormField'
import FormTimePicker from '../FormComponents/FormTimePicker'

const TimeFields = ({ isEditing }: { isEditing: boolean }) => (
  <>
    <Grid item xs={12} md={6}>
      <FormTimePicker
        name='clock_on_time'
        label='Clock On Time'
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormTimePicker
        name='clock_off_time'
        label='Clock Off Time'
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField
        name='total_work'
        label='Total Work'
        type='time'
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField
        name='total_rest'
        label='Total Rest'
        type='time'
        disabled={!isEditing}
      />
    </Grid>
  </>
)

export default TimeFields
