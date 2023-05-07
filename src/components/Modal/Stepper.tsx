import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import HeaderComponent from '../Header/Header.component'
import ApplicationForm from './forms/ApplicationForm'
import Presentation from './forms/Presentation'
import Article from './forms/Article'
import { useTranslation } from 'react-i18next'
import NewForm from './forms/NewForm'

export default function HorizontalLinearStepper() {
  const { t, i18n } = useTranslation()
  const steps = [
    i18n.language === 'kz' ? 'Нысан бойынша форманы жүктеу' : 'Загрузка формы',
    i18n.language === 'kz'
      ? 'Мультимедиялық мақаланы жүктеу'
      : 'Загрузка презентации',
    i18n.language === 'kz' ? 'Мәтіндік мақаланы жүктеу' : 'Загрузка статьи',
    i18n.language === 'kz' ? 'Жаңа форманы жүктеу' : 'Загрузка новой формы',
  ]
  const data = JSON.parse(localStorage.getItem('register') || '{}')

  const [activeStep, setActiveStep] = React.useState(
    data?.team?.applicationFormURL &&
      data?.team?.presentationURL &&
      data?.team?.articleURL
      ? 3
      : data?.team?.applicationFormURL && data?.team?.presentationURL
      ? 2
      : data?.team?.applicationFormURL
      ? 1
      : 0,
  )
  console.log(activeStep, 'activeStep')

  const [skipped, setSkipped] = React.useState(new Set<number>())

  const isStepOptional = (step: number) => {
    return step === 2
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <HeaderComponent />
      <div
        style={{
          margin: 'auto',
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '1%',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">{t('if')}</Typography>
                )
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          {activeStep === 4 ? (
            <React.Fragment>
              <Typography
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginTop: '5%',
                }}
                sx={{ mt: 2, mb: 1 }}
              >
                {t('finish')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>{t('res')}</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {t('step')} {activeStep + 1}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {t('back')}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleSkip}
                    sx={{ mr: 1 }}
                  >
                    {t('skip')}
                  </Button>
                )}

                <Button variant="outlined" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? t('finish') : t('next')}
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 0 && (
            <div>
              <ApplicationForm />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <Presentation />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Article />
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <NewForm />
            </div>
          )}
        </Box>
      </div>
    </>
  )
}
