// FormSections/OtherFields.tsx
import React from 'react'
import { Grid } from '@mui/material'
import FormField from '../FormComponents/FormField'

const OtherFields = ({ isEditing }: { isEditing: boolean }) => (
  <>
    <Grid item xs={12} md={6}>
      <FormField name='trip' label='Trip' disabled={!isEditing} />
    </Grid>
  </>
)

export default OtherFields
