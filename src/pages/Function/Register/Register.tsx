import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import classes from './Register.module.scss'
import { Button, FormControl, InputLabel, Select } from '@mui/material'
import axios, { all, AxiosError } from 'axios'
import MenuItem from '@mui/material/MenuItem'
import UploadButtons from '../../../components/Upload/Upload.component'
import HeaderComponent from '../../../components/Header/Header.component'
import dayjs, { Dayjs } from 'dayjs'
import DatePickerValue from '../../../components/DatePicker/DatePicker.component'
import { schools, subjects } from '../../../models/data'
import AuthService from '../../../services/AuthService'
import TournamentService from '../../../services/TournamentService'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { useTranslation } from 'react-i18next'
import Autocomplete from '@mui/material/Autocomplete'

const languages = [
  {
    id: 1,
    name: 'Қазақ',
  },
  {
    id: 0,
    name: 'Русский',
  },
]

const englishProficiencyInKazakh = [
  {
    id: 1,
    name: 'иә',
  },
  {
    id: 0,
    name: 'жоқ',
  },
]

const englishProficiencyInRussian = [
  {
    id: 1,
    name: 'да',
  },
  {
    id: 0,
    name: 'нет',
  },
]

const RegisterDoctor = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [group, setGroup] = React.useState<any>([])
  const [subject, setSubject] = React.useState<any>([])
  const [categories, setCategories] = React.useState<any>([])
  const [userProfile, setUserProfile] = React.useState<any>([])
  const [value, setValue] = React.useState<Dayjs>(dayjs('').tz('Asia/Almaty'))
  const data = JSON.parse(localStorage.getItem('data')?.toString() || '')

  const [all, setAll] = React.useState({
    group: data?.group || '',

    subject: data?.subject?.id || '',
    category: data?.category?.id || '',

    isKazakhProficient: data?.isKazakhProficient == true ? 1 : 0 || '',
    englishProficiency: data?.englishProficiency == true ? 1 : 0 || '',
    pedagogicalExperienceCurrent: data?.pedagogicalExperienceCurrent || '',
    pedagogicalExperience: data?.pedagogicalExperience || '',
  })
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const group = TournamentService.getGroups().then((res: any) =>
      setGroup(res.data),
    )
    const subject = TournamentService.getSubjects().then((res: any) =>
      setSubject(res.data),
    )
    const categories = TournamentService.getCategories().then((res: any) =>
      setCategories(res.data),
    )

    if (userProfile?.birthDate) {
      setValue(dayjs(userProfile.birthDate))
    }
  }, [userProfile])

  React.useEffect(() => {
    async function fetchUserProfile() {
      try {
        const user = await AuthService.getCurrentUser()
        setUserProfile(user)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserProfile()
  }, [])

  const [state, setState] = React.useState<{
    success: null | boolean
    error: null | boolean
  }>({ success: null, error: null })

  const scrollTo = () => {}
  console.log(all)

  const send = () => {
    TournamentService.updateProfile(
      userProfile.firstName,
      userProfile.lastName,
      userProfile.middleName,
      value.add(1, 'month'),
      all.group.id,
      all.subject,
      Number(all.category),
      Boolean(all.isKazakhProficient),
      Boolean(all.englishProficiency),
      Number(all.pedagogicalExperienceCurrent),
      Number(all.pedagogicalExperience),
    )
      .then((res: any) => {
        setState((prevState) => ({ ...prevState, success: true }))
        navigate('/profile')
      })
      .then(() => {
        setState((prevState) => ({ ...prevState, success: false }))
        navigate('/profile')
      })

      .catch((err: AxiosError) => {
        setState((prevState) => ({ ...prevState, error: true }))
      })
  }
  console.log(group?.filter((item: any) => item.id === all.group))

  return (
    <>
      {localStorage.getItem('user') ? (
        <div className={classes.main}>
          <HeaderComponent scrollTo={scrollTo} />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className={classes.form}
          >
            <div>
              <UploadButtons userProfile={userProfile} />
              <DatePickerValue value={value} setValue={setValue} />

              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel>{t('degree')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={all.category}
                  label="School"
                  onChange={(e) => setAll({ ...all, category: e.target.value })}
                >
                  {categories?.map((item: any) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {i18n.language === 'kz' ? item.nameRus : item.nameKaz}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <Autocomplete
                  id="demo-autocomplete"
                  options={group}
                  getOptionLabel={(item: any) =>
                    i18n.language === 'kz' ? item.nameKaz : item.nameRus
                  }
                  value={all.group || null}
                  onChange={(e: any, newValue: any) => {
                    setAll({ ...all, group: newValue })
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label={t('school')}
                      variant="outlined"
                    />
                  )}
                />

                {/* </TextField> */}
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">
                  {t('subject')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={all.subject}
                  label="Subject"
                  onChange={(e) => setAll({ ...all, subject: e.target.value })}
                >
                  {subject?.map((item: any) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {i18n.language === 'kz' ? item.nameKaz : item.nameRus}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <TextField
                required
                id="outlined-required"
                label={t('current')}
                placeholder={t('san') + '...'}
                value={all.pedagogicalExperienceCurrent}
                onChange={(e) => {
                  const pattern = /^[0-9]*$/
                  if (pattern.test(e.target.value)) {
                    setAll({
                      ...all,
                      pedagogicalExperienceCurrent: e.target.value,
                    })
                  }
                }}
              />
              <TextField
                required
                id="outlined-required"
                label={t('time')}
                value={all.pedagogicalExperience}
                placeholder={t('san') + '...'}
                onChange={(e) => {
                  const pattern = /^[0-9]*$/
                  if (pattern.test(e.target.value)) {
                    setAll({ ...all, pedagogicalExperience: e.target.value })
                  }
                }}
              />
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">
                  {t('language')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={all.isKazakhProficient}
                  label="Subject"
                  onChange={(e) =>
                    setAll({
                      ...all,
                      isKazakhProficient: Number(e.target.value),
                    })
                  }
                >
                  {languages.map((item) => {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 270 }}>
                <InputLabel id="demo-simple-select-label">
                  {t('english')}
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={all.englishProficiency}
                  label="Subject"
                  onChange={(e) =>
                    setAll({
                      ...all,
                      englishProficiency: Number(e.target.value),
                    })
                  }
                >
                  {i18n.language == 'kz'
                    ? englishProficiencyInKazakh.map((item) => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>
                      })
                    : englishProficiencyInRussian.map((item) => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>
                      })}
                </Select>
              </FormControl>
              <Button
                disabled={
                  all.group == '' ||
                  all.subject == '' ||
                  all.pedagogicalExperienceCurrent == '' ||
                  all.pedagogicalExperience == '' ||
                  all.isKazakhProficient == null ||
                  all.englishProficiency == null
                }
                variant="contained"
                style={{
                  margin: '15px',
                }}
                onClick={send}
              >
                {t('send')}
              </Button>
              <Button
                variant="contained"
                style={{
                  margin: '15px',
                }}
                onClick={() => navigate('/')}
              >
                {t('mainPage')}
              </Button>
              {state.error == true && (
                <Alert severity="error">
                  This is an error alert — check it out!
                </Alert>
              )}
            </div>
          </Box>
        </div>
      ) : (
        <div className={classes.main}>{(window.location.href = '/')}</div>
      )}
    </>
  )
}
export default RegisterDoctor
