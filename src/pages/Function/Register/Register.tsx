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
  const [group, setGroup] = React.useState<any>([])
  const [subject, setSubject] = React.useState<any>([])
  const [categories, setCategories] = React.useState<any>([])
  const [userProfile, setUserProfile] = React.useState<any>([])
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
    const user = AuthService.getCurrentUser()
    user.then((res) => setUserProfile(res))
  }, [])
  console.log(group)
  console.log(subject)
  console.log(categories)

  const navigate = useNavigate()

  const [value, setValue] = React.useState<Dayjs>(dayjs(''))
  const [all, setAll] = React.useState({
    group: '',
    subject: '',
    category: '',
    isKazakhProficient: '',
    englishProficiency: '',
    pedagogicalExperienceCurrent: '',
    pedagogicalExperience: '',
  })
  console.log(all)
  const [state, setState] = React.useState<{
    success: null | boolean
    error: null | boolean
  }>({ success: null, error: null })

  const scrollTo = (name: string) => {}
  const send = () => {
    TournamentService.updateProfile(
      userProfile.firstName,
      userProfile.lastName,
      userProfile.middleName,
      value,
      all.group,
      all.subject,
      Number(all.category),
      Boolean(all.isKazakhProficient),
      Boolean(all.englishProficiency),
      Number(all.pedagogicalExperienceCurrent),
      Number(all.pedagogicalExperience),
    )
      .then((res: any) => {
        setAll({
          group: '',
          subject: '',
          category: '',
          isKazakhProficient: '',
          englishProficiency: '',
          pedagogicalExperienceCurrent: '',
          pedagogicalExperience: '',
        })
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
  const { t, i18n } = useTranslation()

  return (
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
            <InputLabel>{t('school')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={all.group}
              label="School"
              onChange={(e) => setAll({ ...all, group: e.target.value })}
            >
              {group?.map((item: any) => {
                return (
                  <MenuItem value={item.id} key={item.id}>
                    {i18n.language === 'kz' ? item.nameKaz : item.nameRus}
                  </MenuItem>
                )
              })}
            </Select>
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
            onChange={(e) =>
              setAll({ ...all, pedagogicalExperienceCurrent: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-required"
            label={t('time')}
            value={all.pedagogicalExperience}
            placeholder={t('san') + '...'}
            onChange={(e) =>
              setAll({ ...all, pedagogicalExperience: e.target.value })
            }
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
                setAll({ ...all, isKazakhProficient: e.target.value })
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={all.englishProficiency}
              label="Subject"
              onChange={(e) =>
                setAll({ ...all, englishProficiency: e.target.value })
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
  )
}
export default RegisterDoctor
