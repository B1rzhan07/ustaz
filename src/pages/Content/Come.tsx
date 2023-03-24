import React from 'react'
import '../../index.scss'
import ButtonComponent from '../../components/Button/Button.component'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const Come = ({
  refParticipant,
}: {
  refParticipant: React.RefObject<HTMLInputElement>
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div ref={refParticipant}>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        {t('come')}
      </h1>
      <div className="come">
        <div className="comeLeft">
          <b>
            <p>{t('age')}</p>
          </b>
          <div className="insidePaper">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEBIQERIWFRAXFg8TEBAYGBYWFhAQFRUWFhcSFRgYHiggGBonGxUVITEtJSkrLi4uFx8zRDMtNygtLisBCgoKDg0OGxAQGy4mICUtLS8rNTctLTA1LS0tLS0tLS8tLi8vLS4uLS0tLS0tLS0tLS0vKy0tLS0tLy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMIAgH/xABKEAACAgEBBQUDBwkEBwkAAAABAgADBBEFBhIhMRNBUWFxByKBIzJSYpGSoRQzQkNjcoKisXOEk7IkRFOjwcLSFRdUZHSDs8Tx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQYCAf/EADwRAAEDAQMLAwEFBgcAAAAAAAEAAgMRBAUhEjFBUWFxgZGhsfAiwdHhEyMyQlIzQ3KSorIGFBWCwtLx/9oADAMBAAIRAxEAPwDcYiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIiIRIn5ZgBqeQHU+Alaz98sSslauLIYcj2Q1rX964kIPPQk+UkjifIaMBPnReJJGRtynkAayaDmVZ5+XYAak6DvPhMs2pv8A5DagW11juXH/ANIt/wASwCofdMq+dtd7z76G/nqDku1wB8VQEVr8BNWG5J3YvIb1+ByKypL6hH7JrncKDm6nMArYsrerZ9XJsist9BD2jfdr1Mj334x9PcoynHj2JrH+/KTKfyrJI0V+zX6NfyQH3AJ5tiO/NmZj4kk/1l9lyWdv4nE+agPdUpL5nJwDG83f9KLTMj2gAfNoQHwsyaa/6cU5P+8W3/Y4Q/vxP9MeZ+uzPKeq7L8Ryk7brsTRiK8T8qo+9rU44SAbmD3JV8HtDu69lhH+/Ef/AF50Y3tC1+dTV6V5dVn9Qszx9na908m2X5T6bssRGDacT8o29rUD+1B3sHsQtYr34pPzsbKUfSFa2j4dizH8J2Y29+zrNB+UKjHotoak/ZaFmMrhMp1UkHxBI/pPRcnKUadq7jwsPaD+fWV33JZ3D0uIPTsT1Vpl82iuIY4cW0/v7Bb7VYrgMpDKehBBB+InpPn/ABNpNUdRWKzy1fHZ8dzp48J0b4iWXZm/mQmgFwf6uUq1t6C6kafeUyjLcczcWGvT5HMq9HfURH3jHN/qH9NTzaFrcSpYO/GM+gvRqCelp9/HY+VyagD98LLRTarqGRgynmrAggjxBHWZMsMkRo9pHmg6eC1Ipo5m5Ubg4awa9l6xESNSJERCJERCJERCJERCJESJ23tzHw0BsJLtyqpUcVlzeCL392pOgGvMiemtc4hrRUlfHODQS40AUtKftjfamsMuOBcV1D3s3BjVHwa3T3z5ID4cpSt5N7bcklHI4eYGJW2tP95sHO0/VXRfXrK45tuI4zyHJVHJUHgiDkBN2y3NmdMeHz9KbCVh2m9iaiDAfqP/ABGnecNQcpfbm81mUSHY3+CEcGKvpUDrZ62EyJY3W6B2PCOlY5Ivog90Trx8EAanlOnVVA+aNSApb9I+C97H0Bm2wMiGTGAFz8k+U/Kxc7QTieGrc0Lio2d5TrTHRfXwHOTmzd183J0PZtWp/Su1rGnlUPlD/Fwyy4O4FKjS66x/FK/9HrP3Dx/zylPeULM7qnUMfp1VuK67ZPiRkjaadMTzAVBd0rGraIPGwhP6z2orts/N1u48aqrrR94Lp+M1nA2FiY/OrHrRvphRxH1Y8z8TJOZz75H5Wcz7fVX4/wDDzafeSE7gB3r7LIq9ibQPNcO8/HGr/B7QZ0rurtBv1Lr5G6n/AJdZqkSA3vNoa0cD8q224rIM9Tx+AFlTbpbQH6pz6XU/8QJztsDaK9cTIA8Q2K+vwWzX8JrsQL4n0hp4H5Xx1w2M5gRxr3BWLX496fPqsQd5sotRfvBSv4zmrsR/m8DePAysfs6/hNynBnbIxcj89RXZ5sikj0JGokzL5/Uzkfb6qtJ/h6P93IRvAPbJWNPQh5dD4HlOW/Z00/O3Dxm/NPZWefuljdXr5rbqQP3SJWtoboZtGrKouT9hyPqabD/lY+k0YLzhecHUO3D6dVQluq2Q4t9Q2Y9MDyqqZWt1J1rYp4gcgfUdD8Z27K2++M3Epagk6k0Beyc+NtD+4fVdD4ToLAkqQOIfPQAh0/fqYB1+InPdhqw1HOXyWyCjxUHzjxVJk+S+pq1w0jAjYfhwO5aFsXfxGUDKCgdPymriekH9qD79B/e1H1pdKrFdQykMpAKsCCCD0II6ifPPZWUtxVsVPl3jwI7x6yZ2BvTbin3GWok6tU2oxLCTzJHWhzr85fd16iY9quZpq6A8PM3UblvWa9nNFJ8R+oDEfxN7lv8AKM63GJA7B3jpzPcGtd6jV6H0DAdONCOVifWXlzHQ8pPTnnscxxa4UK3mPa9oc01BzFIiJ5XpIiIRIiIRVffDeYYShECm91ZgX17OmsEA22acyNSAFHNjy5cyMi2jtSy+xyGZmflbe3520fRHDyrq8EXl66y4+1XY9rX1XjXsmrrqJ7ltrexlDfvC0gd2q6d4lTxcQKNTy06zqbqiiZAJG4uOf4XM3tM77Usf+EUoNB2nXjm0Cmaq8MPBkiAqDXloNAXPzQT0HmfIc507PwrsmzsaE4n0BI14VqU9GvbT5MeAGrHQ6CaNu/uhTilbbPlsgdLCNEq8RSnRPXmx8ZJbLwZDg7E6vnV5hpVSy2Ca2es4N1692vfm3nBVPYu6GTk6PZrTUdCTYutrD9nUeVfq+p+rL1sfd3FxOdaa2dGvc8drfxHoPIaDykzE520W2afBxw1DN9V0tlsMFmH3Yx15zz0DYKDYkTztsVFLMQqjmWJAAHiSekrWZvtiLr2PHfp1dBpSvmb30rI/dJ9JBHE+Q0YCVYlljiblSODRtIHdWmJlO0faLf0WymsfRoByrP8AEbgqB+Bleyd6bretuVZ+/f2Sn1rxwoImjHc9ocKuoPOXVZzr4g/dhztwoObi2vCq3SywKNWIA8SdJxW7ZxE+dk0r62IP6mYJZkcbcRxcUt9NqjY3xawkmei5No6V0D0x6v8Aplptxj8z+n1KrG+pCfTEOL/YNPcrdq9t4bclyaSfAWof+M7arUbmrBvQg/0nz4cu49a6T60Vf9M8hdzBOLiEjo3Y8JHoUI0n11xjRJ0+qC+ZBniB3P8Alo7r6MiYRi7xXVcw2RX/AGeQ7KPSq7jWT2z/AGh5A0Hao/1clOxY/wDu0cSD4rKr7nnGLaHzl1Vhl8Qn8bXN4V/tyuoWsxKfgb9Y7gdtW9Wv65fl8cnytq10Hm4WWjEyq7kFlTq6HmrqQyn0I5TOlhkiNHtI815lowzxTNyo3Bw2Gq5drbFxssAX1BiPmvzV0/cddGX4GUbbW5ORTq9DG5Po+6uQB5k6Lb/KfWaXEks9rlgPoOGrQo7TY4bQKSN46RuPsajWFhRYNqD1B4WJBBRvo2A8628jODLwZs2392qMz3mHBeBomQmgcD6Ldzr5H8Oszba+ycjCcV3KNGJCOuvZXeSa/MfTnwHz0J0nRWO8Y5sMztXx5Vcza7tmsnrYcpvUbx7jDYAq/j5jU8IbiYIeKtlOltDfTpf9A+XzW5gjnNU3M3rOURRaQ1pUtXeo0W5V01V1/V3AEEjoRzHLkM0ycYMNR/8Akm/Z1sS1s6u0aiuk2Wv4BnqepKz9Yiwtp3Ac+on28oYpIHOfnAwO3Vx+qmuud32wEf5j6ho2u2Ea9OY40I2OIicmupSIiESIiEXPl41dyNVYoatgVZT0IMq124VLNyusVfSs2DyFrKT9up85cYksU8kVchxFVBNZoZqfaMDqZqgFR+ydl0YlQqpQKg5nvLserux5sx8TJCJFbc21RhIHuJ1Y8NdajisufuRF7z+A6kgTx6nu0klTEhoqcAOgUkzAAknQDUknoAO8ylbc3+qrBGLwvpyOTYStGvhXp72QdO5OX1pSt6t7rcpir8LKD7uIp4qE06HJYc77Nf0R7g8yNZXGWy5uKxi56DwUeAA5AeQm5ZLozOm5eeb1h2m9SaiDAfqOn+EdnOw1BwUrtfb9mS2tnFeeo7cDskI76sdfcB834mkfebrzrYzP4A8wPQdB8J1V44A58p76gEKAOI/NQgl3P1a11dvgJtMayMUaAAFhulq+oq5x0nE7h8NpuXFTs/ynSMZB1Ili2fuhn5Gh7M1J43ng1HiKq9X+DFZYsL2dqNDbkNxd4pRKVPlz4m/mlSW8rPGaF1d2PXN1VqO7bZLiRQbTTpieYCz9al7lJ9AZ+uAfRPxAE1LH3H2cp1NTOe82W3Wa/wALsVHwE613U2YP9SxvU01k/aRKZvmLQ09Pkq0Lhkp6pByJ61HZZFwD6J+wGfxqh3q4/hM19t1dmn/Ucb/BqH/LOXI3I2a/6gp4Guy2r/42GvxgX1HpaenyENwyaJByI61PZZKcdD0InhbgTTsv2e0tzqvtU9y2hb0H3gG/mlezty86kcSqLl/Ytwv6mu46fY59JbivOzvwyqb8Oubqqsl2WyLEDK3Gveh5AqkrTZUeKtnQ+IJXX18Z2YG3LaH4/eqfqcjHC1u58bUb5K7+ITpfUMa2XSwfq2Vkt08TWwB+zWc1uMrdJdOTIMcQfPKqp9pR9XgtcNOII96bDhsWg7D3/DAflADL35FIY9n/AOop5vV6jiXnryEvWNkJai2Vsr1sAVdSGVge8EciJ87tQ9bB0JVh0YcjJnYO81uI2tbpU5OrI3LFvPebFH5lz9NfiCBMe13Q13qhwOrzN23BbdmvV7R996m6wMRvAz72/wAucrdpzZuHVfW1VqB62GjIw1BEjd394ac0MFBS9AO1x204016MNOToe5hyPrqJNzAc1zHUOBC3Wua4BzTUFU0bg0q3uXWBe7iCO6jwW1l109dT5yy7N2fVjViqpeFBqfEsx6sxPMk+JnbEkktEkgo9xKiis0MRJjYATnoAOyRESFTpERCJERCJERCJMh9q73DNQLqEOOoVu8IbH7cL4a/IcXkF7pr0h94tiVZtXA/uup4qbQNTU479O9T0I7x8CLVjnbBMHuGCrWuD7aEsHXNgQceSwjDw5JLwoPiBxeLHkFGnNmPcBzlou3GzQ3Ctaa/T7bSr1I4O0HoAfWW3djdGnD0sf5TJ007QjRKgeq0r+gPPqe89w6C0XpDG2rTlHUFz0N22mZ/3oyRtp0oT1wG3MqrsLcjIyNLLyaKj0BAOQw8gdVpHrxN6S/bI2Fi4Y0oqCk/Os5tY/wC87as3xMlInPWi1yzn1HDVoXQ2ayRWcUjHHSd59s2oJE8cnIrqUvY6og5s7EKoHmTyErOXv1iDlSt2R4vUmlQ8+2sK1kehMhjjfIaMBKllljiblSODRrJA7q2RM1y/aPYNeEYlY7i97XN8UpQAfeMi7faRlE8sikeS4lx/z2iW23baT+XqqRvay6HE7muI5htFr0TIa/aTlf8AiKT64lw/y3Gd2N7Sb+XEMKwf212OfgLa2H4z667LQNHt3on+rWXSSN7Hjrk0WoRKhi794x/O1XVD/a8HbU+vaUltB5sBLLs/PpyEFlNiWVno6MGH2iVJIpI/xNIVyGeKYZUbg4bCD2XltTZWPlJwX1LYvdxDmp8Vbqp8wQZRdu7hWV6viMbU5k0uR2wHhXYeT+j8/rTSYkkFqlhNWHho5eFeZ7LFOKSCvcbjnWCvoCysCGU8Lgghq2+jYp5qZHZmJrzm27xbtY+cure5eARXkKBxL9Vu508VP4HnKOu42aG4CiMO6xLeGsjxKspZfQa+s6CzXpFI31+k+Zlz1ouueF1YRlDhUb6kcwoT2dtf/wBoYqjUqGu1P0aeyfjQfs+PsT6geM3GV7dfdxMJS3Jr30DuBoFUdKkB6KPtJ5nwFhmJb7Q2ebKbmzb8TitywwOhhDXZyanYT5jtqUiIlJXEiIhEiIhEiIhEiIhEiIhEiIhF52WBQWYgKASWJ0AA6knuEoW8PtBVQRi8IXmPyu0MK2On+r1j3sg+Y0Xl1MhfattpxkDGI4q0rqfsW17O212fR7gPziqEGi9NWJOuglD4bLm47GLMe89w8AOgHkJtWC7myNEkmnMPPN+ZY9tt0jXGOPCmd2fg0Zv9xqAdBUhtLb1uQ/GeK5xzFuSFsKHxppX5Kr4BjOV+1u52u9h7tSWA9B0HwntVjAdZ01/OCKNXPzatGaxvStQWP2TeDGsbqAWFl1fUAucdJq4ncc/AclwLhaz1GDLLhbo7Ru5jHZBy0a50qB/hXtHHxAktX7Ocwj3rcdT3gdu/46r/AEld1vszDQvHDHsrDbHbH4hh40HcgqiHBnm+D5S/t7OMsdLsc/C9fx4zI3M3M2lUNex7Ud5ptV9B48NoQn4az428LK40Dx270Q2K2sxyD0PYlU1KXqPFWzofFCV+3TrOvE2xZVZ2jDgfvyaPkrz+9p7lo8mUidV9ZRuzsUo/dW6slh8wjga/DWc9uOD0+zvEtZLZBrBVYkB/rFHDTiHDjgVfd3faGdNMj5Wsdbq1+XpHjkY668vrV6j6omh4eVXdWttTq9bDVHUgqw8QRPnCylkYMhKsOYYHQg+Rlq9nm3rUzaq+gusdL0XklpNbuMgJ0WwMgBI04gx16CYduuxoaZI8KY08zdti27FbpcoMk9QOnSNVQMCK0FRSmkaVtsREwltpERCJERCJERCJERCJERCJERCJERCJERCKmb+7qflii+tdchFKlOQ7arXXg1PRwSSp6cyD11GZthNW3BoeP/ZFLO29Oz4eLWb/ABNKyXlJZ2ZFKjRsWfa7uZaHh+UQdNKY8wcdqy3d3cK2/S3LLU1nmKl07dh9duYqB8F97n1BmhbK2Rj4icGPUta9+g95j4sx5sfMkmSESraLVLOavPDRyVmCzRQNowfJ3lIiQefvZs7HYpbl0q4618alx6qOcgAJNAFOpyJX8TfLZdrBEzKOM8ghcKxPgA2hMnwdYILTQhFy5+BTkIa7q0sQ9VdQw/HoZQtv+z1gC+ExYDn+TWNqw8qbW5r6PqPMTSIk0FokgNWGnbl4VDNZ45m5Mgr7bjoWAthsW7NgUs6dlYtiWE+ScOrfDUGXvcDdDsXGXehVwCMephoy6jQ3WD9FyCQB+iCdeZ5aHEuWm9JJo8ilNfmCp2W7I4H5eUTqrTDkPNCRETMWkkREIkREIkREIkREIkREIkREIkREIkREIkREIk4dq7QqxaXvubhrQas3XyAAHMkkgADmSQJ3TKPahthrMhcZD7tPCdPDLZeJXI+pWQR9a5T+jLFls5nlEY47lXtU4giL6V1DWdH11Cp0KJ3n3uycpijBlr/Qw0YhQv8A52xTq7k/q0IUdCxMhaBlaaVt2KdyUotKj7Br9pnZs7DRBz5mSqWATqGQxwjJYFxNqtZkdV4yjtxA/hGYDrrJzqAcZgHC9hsTvS1VtU+ocGd2728uRhMBXw1jXnjsxGHZ9VddTiv4FdU16gSRa0GR2dio4PKfXRRyjJeF4s1qMbqsGQdYAHMZiN43UOK2LYG2as2kXVajmUsrbk9Nq/OrcdzD7CCCNQRJWYvuDtdsXNRGPuWFMazzGmlFnmwbSrzWxPozaJzFssxs8pZo0bl29jtP+Yiy6UOY79mw5xv11SIiVVaSIiESIiESIiESIiEX8if2IRIiIRIiIRIiIRIiIRIiIRJgu8N5baGUT17e8fBbOAfyov2TephvtExDjbQvP6NnDdX5q40b/eK/2jxmzcrmiZwOctw5j2qs29GF0IprXGmRP1+VSHGTP2t06SNoK5c2dSoyp/GyJFtbPy2TEjQgs66Lcgq3Gvzl94eqkOPxUT6Lnzzu1itlZmPUBrxWIG/sweOw/cVviR4z6GnP325pdGNNDyrh2K6W6WFsbt/t/wCJERMJaqREQiREQiREQiREQiREQiREQiREQiREQiREQiREQiSpe0Hdf/tCgGvT8or4jVryFinTipJ7tdAQe4qO7WW2J7ikdG8PbnC8uaHAtOZfLOQHqZkcFWUlXVhoyMOqsO4z+plT6A3n3Mw9o+9apS7TQZFeivp3K2oIceTA/CZ1tD2PZan5C+ixdT8/tKSB3fNDgn7J0EN6xuFXHJPGnA49VlSWA19OIVEfKnmLi3TyHxPQDxPlL3h+x/OY/K3Y9a/SU23H7pVB+Mv+6/s/wsBlt0N2QPm22afJn9mg91PXmfOfZb0iaKg5W6vcge6+R2B1ccFwezHdN8NDk5C6ZFi8KVnrTUSCQ312IBPgAo7jL9ETAmmdK8vfnK1WMDGhrcyRESJe0iIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhEiIhF//Z"
              alt=""
            />
            <b>
              <p>{t('wifi')}</p>
            </b>
          </div>

          <div className="insidePaper">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLLp_E5gOL-XvxGcZQSPvFobbZaWNvill7g&usqp=CAU"
              alt=""
            />
            <b>
              <p>{t('down')}</p>
            </b>
          </div>

          <div className="insidePaper">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
            <b>
              <p>{t('like')}</p>
            </b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonComponent
              word={t('register')}
              onClick={() => {
                window.scrollTo(0, 0)
              }}
            />
          </div>
        </div>
        <img
          style={{
            borderRadius: 50,
            marginLeft: 90,
            borderBlockColor: 'red',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
          width={450}
          height={500}
          src="https://media.istockphoto.com/id/1359951115/photo/successful-young-business-people-talking-working-together-in-front-of-modern-business-building.jpg?b=1&s=170667a&w=0&k=20&c=Z_AcX8kbPfaW1d_I09Q0ByJgH2gQc_THI8bD5IQYBRc="
          alt="almatyustazy"
        />
      </div>
    </div>
  )
}

export default Come
