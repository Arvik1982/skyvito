import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import styles from '../CreatePost/createpost.module.css'
import { localHost } from '../../vars/vars'
// import deleteImg from '../CreatePost/delImage'
import {
  getCurrentAdd,
  //  refreshTokens
} from '../../api'
// import { setTokenAccess, setTokenRefresh } from '../../store/reducers/sliceReg'
import {
  setCurrentAdd,
  // setImgDeleted
} from '../../store/reducers/sliceAdds'
import del from './delNotSentImg'

export default function ImgUploadForm({
  setFile,
  src,
  setSrc,
  id,
  imgUploadForms,
  setImgUploadForms,
  setImgNumber,
  editMode,
  currentAdd,
  postId,
}) {
  const realUpload = useRef(null)
  const realImg = useRef(null)
  const dispatch = useDispatch()
  const userAssessTokenRedux = useSelector(
    (state) => state.authRedux.access_token,
  )
  const userRefreshTokenRedux = useSelector(
    (state) => state.authRedux.access_refresh,
  )
  const [startDel, setStartDel] = useState(false)

  useEffect(() => {
    postId
      ? getCurrentAdd(postId).then((data) => {
          dispatch(setCurrentAdd(data))
        })
      : ''
  }, [startDel])

  return (
    <>
      {!editMode && (
        <div
          key={Math.round(Math.random() * 1000)}
          className={styles.form_newArt__img}
        >
          <input
            key={Math.round(Math.random() * 100)}
            style={{ display: 'none' }}
            ref={realUpload}
            type="file"
            accept="image/*, .png, .jpg, .gif, .web"
            onChange={(e) => {
              setFile(e.target.files[0])
              e.target.files[0]
                ? setSrc(URL.createObjectURL(e.target.files[0]))
                : ''
              setImgNumber(id)
            }}
          />
          <img
            onClick={() => {
              src ? realUpload.current.click() : ''
            }}
            style={
              src
                ? {
                    width: '100%',
                    height: '100%',
                  }
                : null
            }
            src={src ? imgUploadForms[id].src : null}
            alt=""
          />

          <div
            onClick={() => {
              realUpload.current.click()
            }}
            className={styles.form_newArt__img_cover}
          />
        </div>
      )}

      {/* EDIT MODE */}

      {editMode && (
        <div
          key={Math.round(Math.random() * 1000)}
          className={styles.form_newArt__img}
        >
          <div
            onClick={() => {
              setImgNumber(id)
              del(
                id,
                setStartDel,
                userAssessTokenRedux,
                userRefreshTokenRedux,
                dispatch,
                currentAdd,
                setSrc,
                imgUploadForms,
                setImgUploadForms,
                realUpload,
              )
            }}
            className={
              src || currentAdd.images[id]
                ? styles.delete__img_text
                : styles.display
            }
          >
            {' '}
            X{' '}
          </div>

          <input
            key={Math.round(Math.random() * 100)}
            style={{ display: 'none' }}
            ref={realUpload}
            type="file"
            accept="image/*, .png, .jpg, .gif, .web"
            onChange={(e) => {
              setFile(e.target.files[0])
              e.target.files[0]
                ? setSrc(URL.createObjectURL(e.target.files[0]))
                : ''

              setImgNumber(id)
            }}
          />

          <img
            ref={realImg}
            onClick={() => {
              src || currentAdd.images[id]
                ? del(
                    id,
                    setStartDel,
                    userAssessTokenRedux,
                    userRefreshTokenRedux,
                    dispatch,
                    currentAdd,
                    setSrc,
                    imgUploadForms,
                    setImgUploadForms,
                    realUpload,
                  )
                : realUpload.current.click()
              setImgNumber(id)
            }}
            style={
              src || currentAdd.images[id]
                ? { width: '100%', height: '100%' }
                : null
            }
            src={
              src
                ? imgUploadForms[id].src
                : currentAdd.images[id]
                  ? localHost + currentAdd.images[id].url
                  : null
            }
            alt=""
          />

          <div
            onClick={() => {
              realUpload.current.click()
            }}
            className={styles.form_newArt__img_cover}
          />
        </div>
      )}
    </>
  )
}
