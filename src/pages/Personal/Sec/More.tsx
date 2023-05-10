import { Slider, Typography, Button } from '@mui/material'
import React from 'react'
import Defences from '../../../services/Defences'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HeaderComponent from '../../../components/Header/Header.component'
import { Label, Select } from './helper/styless'

const More = () => {
  const url = useParams()
  const [moreInfo, setMoreInfo] = React.useState<any>(null)
  console.log(url.id)
  React.useEffect(() => {
    if (url.id) {
      Defences.getMoreInfoSecretary(Number(url.id)).then((res) => {
        setMoreInfo(res.data)
        localStorage.setItem('more', JSON.stringify(res.data))
      })
    }
  }, [url.id])
  const navigate = useNavigate()
  const [grade, setGrade] = React.useState<number>(0)
  const handleChange = (event: Event, value: number | number[]) => {
    setGrade(value as number)
  }
  const [secDefenceId, setSecDefenceId] = React.useState<any>(null)
  console.log('defence', secDefenceId)

  const setFinalGrade = () => {
    console.log('click')
    Defences.setFinalGrade(secDefenceId, moreInfo.team.id, grade)
    Defences.getSecrataryGrade(secDefenceId)
  }
  const deleteTeam = () => {
    Defences.deleteTeam(Number(url.id))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const confirm = () => {
    Defences.updateTeamConfirmation(Number(url.id))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <HeaderComponent />

      <div
        style={
          moreInfo?.defences?.length > 0
            ? { display: 'flex', flexDirection: 'row' }
            : {}
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexBasis: '50%',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
              margin: '0.5rem 0',
              border: '1px solid #ccc',
              borderRadius: '1rem',
              padding: '1rem',
            }}
          >
            <h3>
              ФИО: {moreInfo?.team?.creator?.first_name}{' '}
              {moreInfo?.team?.creator?.last_name}{' '}
              {moreInfo?.team?.creator?.middle_name}
            </h3>
            <p>
              Дата Рождения:{' '}
              {moreInfo?.team?.creator?.birthDate === null
                ? 'Не указано'
                : moreInfo?.team?.creator?.birthDate[0] +
                  '.' +
                  moreInfo?.team?.creator?.birthDate[1] +
                  '.' +
                  moreInfo?.team?.creator?.birthDate[2]}
            </p>

            <p>Email: {moreInfo?.team?.creator?.email}</p>
            <p>
              Школа:{' '}
              {moreInfo?.team?.creator?.group === null
                ? 'Не указано'
                : moreInfo?.team?.creator?.group?.nameRus}
            </p>
            <p>
              Предмет:{' '}
              {moreInfo?.team?.creator?.subject === null
                ? 'Не указано'
                : moreInfo?.team?.creator?.subject?.nameRus}
            </p>
          </div>

          <hr
            style={{
              width: '100%',
              margin: '20px 0',
              color: 'black',
              backgroundColor: 'black',
              height: '1px',
            }}
          />
          <Button
            variant="contained"
            style={{
              margin: '0 10px',
            }}
            onClick={confirm}
          >
            Подтвердить
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: '30px',
            }}
          >
            <Button
              variant="contained"
              style={{ flex: 1, margin: '0 10px', marginTop: '10px' }}
              disabled={moreInfo?.team?.applicationFormURL === null}
              onClick={() => window.open(moreInfo?.team?.applicationFormURL)}
            >
              Application URL
            </Button>

            <Button
              variant="contained"
              disabled={moreInfo?.team?.presentationURL === null}
              style={{ flex: 1, margin: '0 10px', marginTop: '10px' }}
              onClick={() => window.open(moreInfo?.team?.presentationURL)}
            >
              Presentation URL
            </Button>

            <Button
              variant="contained"
              disabled={moreInfo?.team?.lessonRecordingURL === null}
              style={{ flex: 1, margin: '0 10px', marginTop: '10px' }}
              onClick={() => window.open(moreInfo?.team?.lessonRecordingURL)}
            >
              Lesson Recording URL
            </Button>
            <Button
              variant="contained"
              style={{ flex: 1, margin: '0 10px', marginTop: '10px' }}
              disabled={moreInfo?.team?.articleURL === null}
              onClick={() => window.open(moreInfo?.team?.articleURL)}
            >
              ArticleURL
            </Button>
            <Button
              variant="contained"
              style={{ flex: 1, margin: '0 10px', marginTop: '10px' }}
              disabled={moreInfo?.team?.articleURL === null}
              onClick={() => window.open(moreInfo?.team?.curriculumURL)}
            >
              ArticleURL
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              style={{
                marginTop: 10,
                margin: '0 10px',
              }}
              onClick={deleteTeam}
            >
              Удалить
            </Button>
            <Button
              style={{
                width: '50%',
                marginTop: 10,
                padding: '0.5rem 1rem',
                borderRadius: '1rem',
                backgroundColor: '#fff',
              }}
              variant="contained"
              color="inherit"
              onClick={() => {
                navigate('/sec')
              }}
            >
              Назад
            </Button>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexBasis: '50%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '1rem',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: '1rem' }}
            >
              Defences
            </Typography>
            {moreInfo?.defences?.length > 0 ? (
              moreInfo.defences.map((defence: any) => (
                <div
                  key={defence.id}
                  style={{
                    margin: '0.5rem 0',
                    border: '1px solid #ccc',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    Stage: {defence.stage.name}
                  </Typography>
                  {defence.grades.length > 0 ? (
                    defence.grades.map((grade: any, index: number) => (
                      <Typography key={grade.id} variant="body2" gutterBottom>
                        {index + 1}. Оценил: {grade.commission.first_name}{' '}
                        {grade.commission.last_name},{' '}
                        <b>grade: {grade.grade}</b>
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" gutterBottom>
                      No grades available
                    </Typography>
                  )}
                </div>
              ))
            ) : (
              <Typography variant="body1" gutterBottom>
                No defences available
              </Typography>
            )}
          </div>
          {moreInfo?.defences?.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '1rem',
              }}
            >
              <Label htmlFor="commission-select">Выберите defence</Label>
              <Select
                id="commission-select"
                value={secDefenceId}
                onChange={(e) => setSecDefenceId(Number(e.target.value))}
              >
                <option value="">Выберите Stage:</option>
                {moreInfo?.defences?.map((defence: any) => (
                  <option value={defence.id}>{defence.stage.name}</option>
                ))}
              </Select>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginBottom: '1rem' }}
              >
                Final Grade: {grade}
              </Typography>
              <Slider
                value={grade}
                min={0}
                max={100}
                step={1}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
                style={{ width: '50%', marginBottom: '1rem' }}
              />
              <Button variant="contained" onClick={setFinalGrade}>
                Set Final Grade
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default More
