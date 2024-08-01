// /* eslint-disable no-extra-semi */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from 'zustand'
// import { FormikHelpers } from 'formik'
// import { DataRecord } from '../types'

// interface RecordState {
//   initialValues: DataRecord
//   setInitialValues: (record: DataRecord) => void
//   handleSubmit: (
//     values: DataRecord,
//     formikHelpers: FormikHelpers<DataRecord>,
//     onSubmit: (
//       values: DataRecord,
//       formikHelpers: FormikHelpers<DataRecord>
//     ) => void | Promise<any>
//   ) => void
// }

// const useRecordStore = create<RecordState>()((set) => ({
//   initialValues: {} as DataRecord,
//   setInitialValues: (record) =>
//     set({
//       initialValues: {
//         ...record,
//         driver_signature: record.driver_signature === null ? 'no' : 'yes',
//       },
//     }),
//   handleSubmit: (values, formikHelpers, onSubmit) => {
//     const transformedValues = Object.entries(values).reduce(
//       (acc, [key, value]) => {
//         ;(acc as any)[key as keyof DataRecord] = value === '' ? 'NA' : value
//         return acc
//       },
//       {} as Partial<DataRecord>
//     ) as DataRecord

//     onSubmit(transformedValues, formikHelpers)
//   },
// }))

// export default useRecordStore
