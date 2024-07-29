// // src/validationSchema.ts
// import * as Yup from 'yup'

// const validationSchema = Yup.object().shape({
//   break_1_finish: Yup.string().nullable(),
//   break_1_start: Yup.string().nullable(),
//   break_1_time: Yup.string().nullable(),
//   break_2_finish: Yup.string().nullable(),
//   break_2_start: Yup.string().nullable(),
//   break_2_time: Yup.string().nullable(),
//   break_3_time: Yup.string().nullable(),
//   clock_off_time: Yup.string().nullable(),
//   clock_on_time: Yup.string().nullable(),
//   date: Yup.date().required('Date is required'),
//   diesel_qty: Yup.number().nullable(),
//   driver_licence_expiry: Yup.string().nullable(),
//   driver_license: Yup.string().nullable(),
//   driver_name: Yup.string().required('Driver name is required'),
//   driver_signature: Yup.string().nullable(),
//   drop_off_location: Yup.string().nullable(),
//   file_path: Yup.string().required('File path is required'),
//   form_type: Yup.string().required('Form type is required'),
//   fuel_card: Yup.string().nullable(),
//   human_check: Yup.number().required('Human check is required'),
//   id: Yup.number().required('ID is required'),
//   odo_finish: Yup.string().required('Odometer finish is required'),
//   odo_start: Yup.string().required('Odometer start is required'),
//   pick_up_location: Yup.string().nullable(),
//   total_fuel_amount: Yup.number().nullable(),
//   total_km: Yup.string().nullable(),
//   total_rest: Yup.string().nullable(),
//   total_work: Yup.string().nullable(),
//   trailer_A: Yup.string().nullable(),
//   trailer_AB: Yup.string().nullable(),
//   trailer_B: Yup.string().nullable(),
//   trip: Yup.string().nullable(),
//   truck_rego_number: Yup.string().nullable(),
// })

// export default validationSchema

import * as Yup from 'yup'

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
const dateRegex = /^\d{4}-\d{2}-\d{2}$/
const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformNA = (value: any, originalValue: string): any =>
  originalValue === 'NA' ? null : value

const validationSchema = Yup.object().shape({
  id: Yup.number().required().positive().integer(),
  date: Yup.string()
    .required()
    .matches(/^\d{2}\/\d{2}\/\d{2}$/, 'Invalid date format'),
  driver_name: Yup.string().nullable().transform(transformNA),
  truck_rego_number: Yup.string().nullable().transform(transformNA),
  form_type: Yup.string().required(),
  driver_license: Yup.string().nullable().transform(transformNA),
  total_work: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  total_rest: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  total_km: Yup.string().nullable().transform(transformNA),
  odo_start: Yup.number().nullable().transform(transformNA),
  odo_finish: Yup.number().nullable().transform(transformNA),
  clock_on_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  clock_off_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_1_start: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_1_finish: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_2_start: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_2_finish: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_1_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_2_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  break_3_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(timeRegex, 'Invalid time format'),
  human_check: Yup.number().required().oneOf([0, 1]),
  file_path: Yup.string().required(),
  driver_licence_expiry: Yup.string()
    .nullable()
    .transform(transformNA)
    .matches(dateRegex, 'Invalid date format'),
  driver_signature: Yup.string().nullable().transform(transformNA),
  pick_up_location: Yup.string().nullable().transform(transformNA),
  drop_off_location: Yup.string().nullable().transform(transformNA),
  fuel_card: Yup.string().nullable().transform(transformNA),
  total_fuel_amount: Yup.number().nullable().transform(transformNA).positive(),
  diesel_qty: Yup.number().nullable().transform(transformNA).positive(),
  trailer_A: Yup.string().nullable().transform(transformNA),
  trailer_B: Yup.string().nullable().transform(transformNA),
  trailer_AB: Yup.string().nullable().transform(transformNA),
  trip: Yup.string().nullable().transform(transformNA),
  insertion_timestamp: Yup.string()
    .required()
    .matches(timestampRegex, 'Invalid timestamp format'),
  update_timestamp: Yup.string()
    .nullable()
    .matches(timestampRegex, 'Invalid timestamp format'),
})

export default validationSchema
