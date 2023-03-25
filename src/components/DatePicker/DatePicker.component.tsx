import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/en' // Optional: import any desired locales
import { useTranslation } from 'react-i18next'

dayjs.extend(utc)
dayjs.extend(timezone)

type DatePickerValueProps = {
  value: dayjs.Dayjs | null
  setValue: (value: dayjs.Dayjs) => void
}

export default function DatePickerValue({
  value,
  setValue,
}: DatePickerValueProps) {
  const { t } = useTranslation()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label={t('birth')}
          value={value}
          onChange={(newValue: any) => {
            setValue(dayjs.utc(newValue).tz('Asia/Almaty'))
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
