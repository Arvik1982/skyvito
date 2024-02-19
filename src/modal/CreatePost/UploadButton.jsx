import { useDispatch, useSelector } from 'react-redux';
import styles from'./createpost.module.css'
import uploadTxt from './createTxtPost_api'
import uploadImg from './createImgPost_api'
import { refreshTokens } from '../../api'
import { setCreateAddStatus, setNewPostLoadSuccess, setNewPostReady } from '../../store/reducers/sliceAdds';
import changeTxt from './changePostTxt_api';


export default function UploadButton({file,title,description,price,imgUploadForms,editMode, postId}){
  const dispatch=useDispatch()
  const newPostReady = useSelector((state) => state.addsRedux.newPostReady);    
  console.log(newPostReady)
  return(<>
  {!editMode &&  <button
        disabled={newPostReady?false:true}
        onClick={()=>{ 
          
          dispatch(setNewPostReady(false));
          refreshTokens()
              .then((tokens)=>{ 
                dispatch(setNewPostLoadSuccess(false));
                   uploadTxt(tokens.access_token,title,description,price)  
                   .then((txtData)=>{
                    uploadImg(tokens.access_token,file,txtData.id,imgUploadForms)}
                    ).catch((errTxt)=>{console.log(errTxt)})})
                    .then(()=>{
                      dispatch(setNewPostLoadSuccess(true));
                    dispatch(setCreateAddStatus(false))})
                    .catch((errTokens)=>{console.log(errTokens)})
         }}
          type="button"
          className={
            newPostReady?`${styles.form_newArt__btn_pub_ready} ${styles.btn_hov02}`:
            `${styles.form_newArt__btn_pub} ${styles.btn_hov02}`}
          id="btnPublish"
        >Опубликовать
        </button>}
{/* CHANGE */}
        {editMode && <button
        disabled={newPostReady?false:true}
        onClick={()=>{ dispatch(setNewPostReady(false));
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
                    .catch((errTokens)=>{console.log(errTokens)})
         }}
          type="button"
          className={
            newPostReady?`${styles.form_newArt__btn_pub_ready} ${styles.btn_hov02}`:
            `${styles.form_newArt__btn_pub} ${styles.btn_hov02}`}
          id="btnPublish"
        >Изменить
        </button> }
        </>
)
}