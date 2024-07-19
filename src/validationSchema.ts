// src/validationSchema.ts
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  driver_name: Yup.string().required('Driver name is required'),
  date: Yup.string().required('Date is required'),
  clock_on_time: Yup.string().required('Clock-on time is required'),
  clock_off_time: Yup.string().required('Clock-off time is required'),
  odo_start: Yup.string().required('ODO start is required'),
  odo_finish: Yup.string().required('ODO finish is required'),
  total_km: Yup.string().nullable(),
  // Add more validation rules as needed
})

export default validationSchema
