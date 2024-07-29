export interface DataRecord {
  id: number
  date: string
  driver_name?: string | 'NA' //date
  truck_rego_number?: string | 'NA'
  form_type: string
  driver_license?: string | 'NA'
  total_work?: string | 'NA'
  total_rest?: string | 'NA'
  total_km?: string | 'NA'
  odo_start?: number | 'NA'
  odo_finish?: number | 'NA'
  clock_on_time?: string | 'NA'
  clock_off_time?: string | 'NA'
  break_1_start?: string | 'NA'
  break_1_finish?: string | 'NA'
  break_2_start?: string | 'NA'
  break_2_finish?: string | 'NA'
  break_1_time?: string | 'NA'
  break_2_time?: string | 'NA'
  break_3_time?: string | 'NA'
  human_check: number
  file_path: string
  driver_licence_expiry?: string | 'NA'
  driver_signature?: string | 'NA'
  pick_up_location?: string | 'NA'
  drop_off_location?: string | 'NA'
  fuel_card?: string | 'NA'
  total_fuel_amount?: number | 'NA'
  diesel_qty?: number | 'NA'
  trailer_A?: string | 'NA'
  trailer_B?: string | 'NA'
  trailer_AB?: string | 'NA'
  trip?: string | 'NA'
  insertion_timestamp: string
  update_timestamp: string | null
}
