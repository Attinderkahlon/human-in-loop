// import { Grid } from '@mui/material'
// import FormDatePicker from '../FormComponents/FormDatePicker'
// import FormField from '../FormComponents/FormField'
// import FormSelect from '../FormComponents/FormSelect'
// import useRecordStore from '../../store/useRecordStore'

// const DriverInfoFields = ({ isEditing }: { isEditing: boolean }) => {
//   const driver_signature = useRecordStore(
//     (state) => state.initialValues.driver_signature
//   )

//   return (
//     <>
//       <Grid item xs={12} md={6}>
//         <FormField
//           name='driver_name'
//           label='Driver Name'
//           disabled={!isEditing}
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormDatePicker name='date' label='Date' disabled={!isEditing} />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormField
//           name='driver_license'
//           label='Driver License'
//           disabled={!isEditing}
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormDatePicker
//           name='driver_licence_expiry'
//           label='Driver License Expiry'
//           disabled={!isEditing}
//         />
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <FormSelect
//           name='driver_signature'
//           label="Driver's Signature"
//           disabled={!isEditing}
//           options={[
//             { value: 'yes', label: 'Yes' },
//             { value: 'no', label: 'No' },
//           ]}
//           value={driver_signature}
//         />
//       </Grid>
//     </>
//   )
// }

// export default DriverInfoFields
