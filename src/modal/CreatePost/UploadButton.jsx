import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from'./createpost.module.css'
import uploadTxt from './createTxtPost_api'
import uploadImg from './createImgPost_api'
import { refreshTokens } from '../../api'
import { setCreateAddStatus, setNewPostLoadSuccess, setNewPostReady} from '../../store/reducers/sliceAdds';
import changeTxt from './changePostTxt_api';



export default function UploadButton({
  file,
  title,
  description,
  price,
  imgUploadForms,
  editMode, 
  postId
}){

  const navigate =useNavigate()
  const dispatch=useDispatch()
  const newPostReady = useSelector((state) => state.addsRedux.newPostReady); 
     
  
  return(<>
  {!editMode &&  
  <>
  {!newPostReady&&<h2 style={{marginTop:'10px', color:'red', fontSize:'15px' }}> Заполните данные формы </h2>}
  <button
        disabled={newPostReady?false:true}
        onClick={(e)=>{e.stopPropagation()
         
          dispatch(setNewPostReady(false));
          refreshTokens()
              .then((tokens)=>{ 
                dispatch(setNewPostLoadSuccess(false));
                   uploadTxt(tokens.access_token,title,description,price)  
                   .then((txtData)=>{
                    uploadImg(tokens.access_token,file,txtData.id,imgUploadForms)})
                    .catch((errTxt)=>{console.log(errTxt)})})
                    .then(()=>{
                      dispatch(setNewPostLoadSuccess(true));
                      dispatch(setCreateAddStatus(false))})
                    .then(()=>{navigate('/profile')})
                    .catch((errTokens)=>{console.log(errTokens)})
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
        {!newPostReady&&<h2 style={{marginTop:'5px', color:'red', fontSize:'15px' }}> Заполните данные формы </h2>}
        <button
        disabled={newPostReady?false:true}
        onClick={(e)=>{ e.stopPropagation()
          
          dispatch(setNewPostReady(false));
          refreshTokens()
              .then((tokens)=>{ 
                dispatch(setNewPostLoadSuccess(false));
                changeTxt(tokens.access_token,title,description,price,postId)
                 .then((txtData)=>{
                 uploadImg(tokens.access_token,file,txtData.id,imgUploadForms)}
                    ).catch((errTxt)=>{console.log(errTxt)})})
                    .then(()=>{
                    dispatch(setNewPostLoadSuccess(true));
                    dispatch(setCreateAddStatus(false))})
                    .then(()=>{navigate('/profile')})
                    .catch((errTokens)=>{console.log(errTokens)})
         }}
          type="button"
          className={
            newPostReady?`${styles.form_newArt__btn_pub_ready} ${styles.btn_hov02}`:
            `${styles.form_newArt__btn_pub} `}
          id="btnPublish"
        >Изменить
        </button>
        </>
         }
        </>
)
}