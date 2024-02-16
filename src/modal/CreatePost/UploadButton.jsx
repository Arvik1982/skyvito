import styles from'./createpost.module.css'
import uploadTxt from './createTxtPost_api'
import uploadImg from './createImgPost_api'
import { refreshTokens } from '../../api'

export default function UploadButton({file,title,description,price,imgUploadForms}){
    return(
        <button
        onClick={()=>{console.log('upl button')
refreshTokens().
 then((tokens)=>{uploadTxt(tokens.access_token,title,description,price).then((txtData)=>{
    uploadImg(tokens.access_token,file,txtData.id,imgUploadForms).then((imgData)=>{console.log(imgData)}).catch((imgErr)=>{console.log(imgErr)})
        console.log(txtData)}).catch((errTxt)=>{console.log(errTxt)})





                                }).catch((errTokens)=>{console.log(errTokens)})
        


          }}
          type="button"
          className={`${styles.form_newArt__btn_pub} ${styles.btn_hov02}`}
          id="btnPublish"
        >
          Опубликовать
        </button>
    )
}