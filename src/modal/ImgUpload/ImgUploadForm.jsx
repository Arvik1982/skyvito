import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import styles from '../CreatePost/createpost.module.css'
import { localHost } from '../../vars/vars'
import { getCurrentAdd } from '../../api'
import { setCurrentAdd } from '../../store/reducers/sliceAdds'

export default function ImgUploadForm({
  setFile,
  src,
  setSrc,
  id,
  imgUploadForms,
  setImgUploadForms,
  setImgNumber,
  setImgNumberDel,
  editMode,
  currentAdd,
  postId,
  startDel,
  setImgDeleteForms,
  imgDeleteForms,
}) {
  const realUpload = useRef(null)
  const dispatch = useDispatch()
  const [deleteDisplay] = useState(imgDeleteForms[id].deleted ? false : true)

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
        // DELETE
        <div
          key={Math.round(Math.random() * 1000)}
          className={styles.form_newArt__img}
        >
          {deleteDisplay && (
            <div
              onClick={(e) => {
                e.stopPropagation()

                setImgNumber(id)
                setImgNumberDel(id)
                imgDeleteForms.forEach((el) => {
                  el.id === id ? (el.deleted = true) : ''
                  el.id === id ? (el.src = currentAdd.images[id]?.url) : ''
                })
                imgUploadForms.forEach((el) => {
                  el.id === id ? (el.deleted = true) : ''
                  el.id === id ? (el.src = currentAdd.images[id]?.url) : ''
                })
                setImgDeleteForms(imgDeleteForms)
                setImgUploadForms(imgUploadForms)

                setSrc(imgDeleteForms[id].src)
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
          )}

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

          {/* {ОТМЕНА УДАЛЕНИЯ} */}
          {!deleteDisplay && (
            <div
              onClick={() => {
                setImgNumber(id)
                setImgNumberDel(id)
                imgDeleteForms.forEach((el) => {
                  el.id === id ? (el.deleted = false) : ''
                  el.id === id ? (el.src = currentAdd.images[id]?.url) : ''
                })
                imgUploadForms.forEach((el) => {
                  el.id === id ? (el.deleted = false) : ''
                  el.id === id ? (el.src = currentAdd.images[id]?.url) : ''
                })
                setImgDeleteForms(imgDeleteForms)
                setImgUploadForms(imgUploadForms)
              }}
              style={{ width: '100%', height: '100%' }}
            >
              deleted
            </div>
          )}
          <img
            className="img_upload_el"
            onClick={() => {
              src || currentAdd.images[id] ? '' : realUpload.current.click()
              setImgNumber(id)
              imgUploadForms.forEach((el) => {
                el.id === id ? (el.deleted = false) : ''
                el.id === id ? (el.src = currentAdd.images[id]?.url) : '2_2'
              })
              setImgUploadForms(imgUploadForms)

              imgDeleteForms.forEach((el) => {
                el.id === id ? (el.deleted = false) : ''
                el.id === id ? (el.src = currentAdd.images[id]?.url) : '1'
              })
              setImgDeleteForms(imgDeleteForms)
            }}
            style={
              src || currentAdd.images[id]
                ? { width: '100%', height: '100%' }
                : null
            }
            src={
              src
                ? imgUploadForms[id]?.src
                : imgDeleteForms[id].src
                  ? imgDeleteForms[id].src
                  : currentAdd?.images[id]
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
