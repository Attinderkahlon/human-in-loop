import * as Yup from 'yup'

// Transform function to handle 'NA' values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformNA = (value: any, originalValue: string) =>
  originalValue === 'NA' ? null : value

// Custom time validation method
const isValidTime = (value: string | null | undefined) => {
  if (!value) return true
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  return regex.test(value)
}

const validationSchema = Yup.object().shape({
  id: Yup.number().required().positive().integer(),
  date: Yup.date().required().transform(transformNA),
  driver_name: Yup.string().nullable().transform(transformNA),
  truck_rego_number: Yup.string().nullable().transform(transformNA),
  form_type: Yup.string().required(),
  driver_license: Yup.string().nullable().transform(transformNA),
  total_work: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  total_rest: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  total_km: Yup.number().nullable().transform(transformNA),
  odo_start: Yup.number().nullable().transform(transformNA),
  odo_finish: Yup.number().nullable().transform(transformNA),
  clock_on_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  clock_off_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_1_start: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_1_finish: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_2_start: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_2_finish: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_1_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_2_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  break_3_time: Yup.string()
    .nullable()
    .transform(transformNA)
    .test('isValidTime', 'Invalid time format', isValidTime),
  human_check: Yup.number().required().oneOf([0, 1]),
  file_path: Yup.string().required(),
  driver_licence_expiry: Yup.date().nullable().transform(transformNA),
  driver_signature: Yup.string(),
  pick_up_location: Yup.string().nullable().transform(transformNA),
  drop_off_location: Yup.string().nullable().transform(transformNA),
  fuel_card: Yup.string().nullable().transform(transformNA),
  total_fuel_amount: Yup.number().nullable().transform(transformNA).positive(),
  diesel_qty: Yup.number().nullable().transform(transformNA).positive(),
  trailer_A: Yup.string().nullable().transform(transformNA),
  trailer_B: Yup.string().nullable().transform(transformNA),
  trailer_AB: Yup.string().nullable().transform(transformNA),
  trip: Yup.string().nullable().transform(transformNA),
  insertion_timestamp: Yup.date().required().transform(transformNA),
  update_timestamp: Yup.date().nullable().transform(transformNA),
})

export default validationSchema
