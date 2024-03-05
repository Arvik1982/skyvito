import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from'./createpost.module.css'
import uploadButtonClick from './uploadButtonClick';
import saveUploadButtonClick from './saveCangesButtonClick';
import del from '../ImgUpload/delNotSentImg';

export default function UploadButton(
  {
  imgNumberDel,
  file,
  title,
  description,
  price,
  imgUploadForms,
  editMode, 
  postId,
  articleId,
  setSrc,
  setImgUploadForms,
  setStartDel,
  imgDeleteForms
  
  }
  ){

  const userAssessTokenRedux = useSelector((state) => state.authRedux.access_token);
  const userRefreshTokenRedux = useSelector((state) => state.authRedux.access_refresh);

  const currentAdd = JSON.parse(localStorage.getItem('currentAdd'))

  const navigate =useNavigate()
  const dispatch=useDispatch()

  const newPostReady = useSelector((state) => state.addsRedux.newPostReady);

  return(<>
  {!editMode &&  
  <>
  {!newPostReady&&<h2 style={{marginTop:'10px', color:'red', fontSize:'15px' }}> Заполните данные формы </h2>}
  <button
        disabled={newPostReady?false:true}
        onClick={(e)=>{

          uploadButtonClick(
            e,
            dispatch,
            navigate,
            title,
            description,
            price,
            file,
            imgUploadForms,
            userAssessTokenRedux, 
            userRefreshTokenRedux,
            articleId)
          
         }}
          type="button"
          className={
            newPostReady?`${styles.form_newArt__btn_pub_ready} ${styles.btn_hov02}`:
            `${styles.form_newArt__btn_pub} `}
          id="btnPublish"
        >Опубликовать
        </button>
        </>
        }
        
{/* CHANGE */}

        {editMode &&
        <>
        {!newPostReady&&<h2 style={{marginTop:'5px', color:'red', fontSize:'15px' }}>

           Заполните данные формы </h2>}

        <button
        disabled={newPostReady?false:true}
        onClick={(e)=>{ 
         
          del(
                imgNumberDel,
                setStartDel,
                userAssessTokenRedux,
                userRefreshTokenRedux,
                dispatch,
                currentAdd,
                setSrc,
                imgUploadForms,
                setImgUploadForms,
                imgDeleteForms
                
          )
          saveUploadButtonClick(e, 
            dispatch,
            navigate,
            title,
            description,
            price,
            file,
            imgUploadForms,
            postId,
            userAssessTokenRedux,
            userRefreshTokenRedux
            )
        
         }}
          type="button"
          className={
            newPostReady?`${styles.form_newArt__btn_pub_ready} ${styles.btn_hov02}`:
            `${styles.form_newArt__btn_pub} `}
          id="btnPublish"
        >Сохранить изменения
        </button>
        </>
         }
        </>
)
}