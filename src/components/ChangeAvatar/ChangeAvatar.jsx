import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../store/reducers/sliceReg'
import { localHost } from '../../vars/vars'
import styles from '../../pages/Profile/profile.module.css'
import uploadImage from '../../functions/upload_api'
import { refreshTokens } from '../../api'
import { setError } from '../../store/reducers/sliceError'

export default function ChangeAvatar({ avatar }) {
  const userAssessTokenRedux = useSelector(
    (state) => state.authRedux.access_token,
  )
  const userRefreshTokenRedux = useSelector(
    (state) => state.authRedux.access_refresh,
  )

  const realUpload = useRef(null)
  const dispatch = useDispatch()

  return (
    <div className={styles.settings__left}>
      <div className={styles.settings__img}>
        <a href="" target="_self">
          <img src={`${localHost}${avatar}`} alt="self" />
        </a>
      </div>
      <label ref={realUpload}>
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={(event) => {
            refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
              .then((tokens) => {
                uploadImage(
                  event.target.files[0],
                  tokens.access_token,
                  'user/avatar',
                )
                  .then((data) => {
                    localStorage.removeItem('userData')
                    dispatch(setUserData(data))
                  })
                  .catch((err) => {
                    console.log(err)
                    dispatch(
                      setError(
                        '3_avatar_Сессия истекла. Перезайдите в приложение',
                      ),
                    )
                  })
              })
              .catch((err) => {
                console.log(err)
                dispatch(
                  setError('4_avatar_Сессия истекла. Перезайдите в приложение'),
                )
              })
          }}
          className={styles.settings__change_photo}
          href=""
          target="_self"
        />
      </label>

      <button
        style={{
          border: 'solid 0px',
          backgroundColor: 'white',
          textDecoration: 'underline',
        }}
        type="submit"
        onClick={() => {
          realUpload.current.click()
        }}
        className={styles.settings__change_photo}
        href=""
        target="_self"
      >
        заменить
      </button>
    </div>
  )
}
