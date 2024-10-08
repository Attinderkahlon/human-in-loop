export const formConfigurations = {
  att_logistics_daily_time_sheet: {
    fields: [
      'date',
      'driver_name',
      'truck_rego_number',
      'clock_on_time',
      'clock_off_time',
      'odo_start',
      'odo_finish',
      'break_1_start',
      'break_1_finish',
      'break_2_start',
      'break_2_finish',
      'break_3_start',
      'break_3_finish',
      'driver_signature',
      'total_work',
      'total_rest',
    ],
  },
  linfox_daily_time_sheet_local: {
    fields: [
      'date',
      'driver_name',
      'truck_rego_number',
      'clock_on_time',
      'clock_off_time',
      'odo_start',
      'odo_finish',
      'break_1_start',
      'break_1_finish',
      'break_2_start',
      'break_2_finish',
      'break_3_start',
      'break_3_finish',
      'driver_signature',
      'total_work',
      'total_rest',
      'total_km',
    ],
  },
  log_book: {
    fields: [
      'date',
      'driver_name',
      'truck_rego_number',
      'total_work',
      'total_rest',
      'driver_signature',
    ],
  },
  fuel_slips: {
    fields: [
      'date',
      'diesel_qty',
      'total_fuel_amount',
      'fuel_card',
      'truck_rego_number',
    ],
  },
  CL_pre_trip: {
    fields: [
      'date',
      'driver_name',
      'truck_rego_number',
      'trailer_A',
      'trailer_B',
      'trailer_AB',
    ],
  },
  CL_fit_for_duty: {
    fields: ['date', 'driver_name', 'driver_signature'],
  },
  CL_safe_driving_plan: {
    fields: [
      'date',
      'trip',
      'driver_name',
      'driver_license',
      'driver_licence_expiry',
      'truck_rego_number',
      'trailer_A',
      'trailer_B',
      'trailer_AB',
      'pick_up_location',
      'drop_off_location',
      'driver_signature',
    ],
  },
  default: {
    fields: [
      'date',
      'diesel_qty',
      'total_fuel_amount',
      'fuel_card',
      'truck_rego_number',
      'driver_name',
      'trailer_A',
      'trailer_B',
      'trailer_AB',
      'trip',
      'driver_license',
      'driver_licence_expiry',
      'pick_up_location',
      'drop_off_location',
      'driver_signature',
      'clock_on_time',
      'clock_off_time',
    ],
  },
}
