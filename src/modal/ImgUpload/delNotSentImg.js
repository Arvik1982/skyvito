import { refreshTokens } from "../../api"
import { setImgDeleted } from "../../store/reducers/sliceAdds"
import { setTokenAccess, setTokenRefresh } from "../../store/reducers/sliceReg"
import deleteImg from "../CreatePost/delImage"



export default function del(
    id,
    setStartDel,
    userAssessTokenRedux, 
    userRefreshTokenRedux,
    dispatch,
    currentAdd,
    setSrc,
    imgUploadForms,
    setImgUploadForms  

    
    ) {
    console.log('DELETiNG IMG...')
   
    setStartDel(true)
    refreshTokens(userAssessTokenRedux, userRefreshTokenRedux).then(
      (tokens) => {
        dispatch(setTokenAccess(tokens.access_token))
        dispatch(setTokenRefresh(tokens.refresh_token))
        deleteImg(
          currentAdd.id,
          currentAdd.images[id]?.url,
          tokens.access_token,
        )
          .then((data) => {
            if (data === 'No content') {
              
              setSrc('')
              imgUploadForms[id].src = ''

              const newArr = imgUploadForms
              newArr.forEach((el) => {
                el.id === id ? (el.deleted = true) : ''
              })
              setImgUploadForms(newArr)
            }
            dispatch(setImgDeleted(true))
            setStartDel(false)
            console.log('DELETED IMG')
          })
          .catch((err) => {
            setStartDel(false)
            console.log(err.message)
            console.log('err.message')
          })
      },
    )
  }