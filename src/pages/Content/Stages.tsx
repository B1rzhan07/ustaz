import React from 'react'
import { useTranslation } from 'react-i18next'
import '../../index.scss'
type Props = {
  refStage?: React.RefObject<HTMLInputElement>
  refParticipant?: React.RefObject<HTMLInputElement>
}
const Stages = ({ refStage, refParticipant }: Props) => {
  const { t } = useTranslation()
  return (
    <div id="id1" className="one" ref={refStage}>
      <h1 className="active">{t('stages')}</h1>
      <div className="crd first">
        <h3 style={{ color: 'blue' }}>{t('first')}</h3>
        <h5>{t('second')}</h5>
        <h5>{t('third')}</h5>
        <h5>{t('fourth')}</h5>
        <h5>{t('fifth')}</h5>
        <h3 style={{ color: 'blue' }}>{t('attention')}</h3>
        <p>{t('attentionFirst')}</p>
        <p>{t('attSecond')}</p>
        <p>{t('attThird')}</p>
        <h3 style={{ color: 'blue' }}>{t('important')}</h3>
        <p style={{ color: 'blue' }}>{t('importantFirst')}</p>
        <p style={{ color: 'blue' }}>{t('impSecond')}</p>
      </div>
      <div className="crd ">
        <h4 style={{ color: 'blue' }}>{t('secondStage')}</h4>
        <h4>{t('secondStageFirst')}</h4>
        <h4>{t('secondStageSecond')}</h4>
        <h4>{t('secondStageThird')}</h4>
        <p>
          {t('secSecond')}
          <b>{t('minute')}</b>
        </p>

        <h3 style={{ color: 'blue' }}>{t('important')}</h3>
        <p>{t('importantSecond')}</p>
        <h3 style={{ color: 'blue' }}>{t('attention')}</h3>
        <p style={{ color: 'blue' }}>{t('attentionSecond')}</p>
        <h3>{t('final')}</h3>
      </div>
      <div className="crd passive">
        <h4 style={{ color: 'blue' }}>{t('thirdStageOne')}</h4>
        <p>{t('thirdStageTwo')}</p>
        <p>{t('thirdStageThree')}</p>
        <h3 style={{ color: 'blue' }}>{t('important')}</h3>
        <p>{t('thirdStageFour')}</p>
        <h3 style={{ color: 'blue' }}>{t('attention')}</h3>
        <p>{t('thirdStageFive')}</p>
        <p style={{ color: 'blue' }}>{t('thirdStageSix')}</p>
        <div ref={refParticipant}>{t('thirdStageSeven')}</div>
      </div>
    </div>
  )
}

export default Stages
