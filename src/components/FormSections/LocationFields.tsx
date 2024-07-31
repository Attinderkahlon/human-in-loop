// FormSections/LocationFields.tsx
import React from 'react'
import { Grid } from '@mui/material'
import FormField from '../FormComponents/FormField'

const LocationFields = ({ isEditing }: { isEditing: boolean }) => (
  <>
    <Grid item xs={12} md={6}>
      <FormField
        name='pick_up_location'
        label='Pick Up Location'
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField
        name='drop_off_location'
        label='Drop Off Location'
        disabled={!isEditing}
      />
    </Grid>
  </>
)

export default LocationFields
