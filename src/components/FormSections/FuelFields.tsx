// FormSections/FuelFields.tsx
import React from 'react'
import { Grid } from '@mui/material'
import FormField from '../FormComponents/FormField'

const FuelFields = ({ isEditing }: { isEditing: boolean }) => (
  <>
    <Grid item xs={12} md={6}>
      <FormField name='fuel_card' label='Fuel Card' disabled={!isEditing} />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField
        name='total_fuel_amount'
        label='Total Fuel Amount'
        type='number'
        disabled={!isEditing}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <FormField
        name='diesel_qty'
        label='Diesel Qty'
        type='number'
        disabled={!isEditing}
      />
    </Grid>
  </>
)

export default FuelFields
