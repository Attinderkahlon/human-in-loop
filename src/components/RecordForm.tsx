// // RecordForm.tsx
// import { useEffect } from 'react'
// import { Formik, Form, FormikHelpers } from 'formik'
// import { Grid, Paper, Button, Box } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import validationSchema from '../validationSchema'
// import BreakFields from './FormSections/BreakFields'
// import DriverInfoFields from './FormSections/DriverInfoFields'
// import FuelFields from './FormSections/FuelFields'
// import LocationFields from './FormSections/LocationFields'
// import OtherFields from './FormSections/OtherFields'
// import TimeFields from './FormSections/TimeFields'
// import TrailerFields from './FormSections/TrailerFields'
// import VehicleFields from './FormSections/VehicleFields'
// import { DataRecord } from '../types'
// import useRecordStore from '../store/useRecordStore'

// interface RecordFormProps {
//   record: DataRecord
//   onSubmit: (
//     values: DataRecord,
//     formikHelpers: FormikHelpers<DataRecord>
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ) => void | Promise<any>
//   isEditing: boolean
//   onEdit: () => void
// }

// const RecordForm = ({
//   record,
//   onSubmit,
//   isEditing,
//   onEdit,
// }: RecordFormProps) => {
//   const { initialValues, setInitialValues, handleSubmit } = useRecordStore()

//   useEffect(() => {
//     setInitialValues(record)
//   }, [record, setInitialValues])
//   return (
//     <Paper elevation={3} sx={{ padding: '20px' }}>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values, formikHelpers) =>
//           handleSubmit(values, formikHelpers, onSubmit)
//         }
//         enableReinitialize
//       >
//         {({ isSubmitting, values }) => (
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Form>
// <h1 className='mb-8 text-xl'>
//   Form Type:{' '}
//   <span className='text-green-900'>
//     {values.form_type
//       ? values.form_type
//           .replace(/_/g, ' ')
//           .replace(/\b\w/g, (char) => char.toUpperCase())
//       : 'N/A'}
//   </span>
// </h1>
//               <Grid container spacing={2}>
//                 <DriverInfoFields isEditing={isEditing} />
//                 <TimeFields isEditing={isEditing} />
//                 <LocationFields isEditing={isEditing} />
//                 <VehicleFields isEditing={isEditing} />
//                 <BreakFields isEditing={isEditing} />
//                 <FuelFields isEditing={isEditing} />
//                 <TrailerFields isEditing={isEditing} />
//                 <OtherFields isEditing={isEditing} />

//                 <Grid item xs={12}>
//                   <Box display='flex' justifyContent='space-between'>
//                     <Button
//                       type='submit'
//                       variant='contained'
//                       color='primary'
//                       disabled={isSubmitting}
//                     >
//                       Submit
//                     </Button>
//                     {!isEditing && (
//                       <Button
//                         onClick={onEdit}
//                         variant='outlined'
//                         color='secondary'
//                       >
//                         Edit
//                       </Button>
//                     )}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Form>
//           </LocalizationProvider>
//         )}
//       </Formik>
//     </Paper>
//   )
// }

// export default RecordForm

// RecordForm.tsx

import FormLayout from '../components/FormComponents/FormLayout'
import { DataRecord } from '../types'
import { Paper } from '@mui/material'

interface RecordFormProps {
  record: DataRecord
  formType: string
  onSubmit: (values: DataRecord) => void
  isEditing: boolean
  onEdit: () => void
}

const RecordForm = ({
  record,
  formType,
  onSubmit,
  isEditing,
  onEdit,
}: RecordFormProps) => {
  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <FormLayout
        formType={formType}
        initialValues={record}
        onSubmit={onSubmit}
        isEditing={isEditing}
        onEdit={onEdit}
      />
    </Paper>
  )
}

export default RecordForm
