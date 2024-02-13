import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../../store/reducers/sliceReg"
import { localHost } from "../../vars/vars"
import styles from'../../pages/Profile/profile.module.css'
import uploadImage from './avatar_api'


export default function ChangeAvatar({avatar}){
  const realUpload = useRef(null)  
  const dispatch = useDispatch()
    return(
        <div className={styles.settings__left}>
        <div className={styles.settings__img}>
          <a href="" target="_self">
            <img src={`${localHost}${avatar}`} alt="self" />
          </a>
        </div>
        <label
        ref={realUpload}>
          <input 
          style={{display:'none'}}
          type="file"
          onChange={(event)=>{
          console.log(event.target.files[0]);
          uploadImage(event.target.files[0])
          .then((data)=>{dispatch(setUserData(data))})
          .catch((error)=>{console.log(error)})}}
          className={styles.settings__change_photo}
          href=""
          target="_self" />
        </label>

         <button 
         style=
         {{
          border:'solid 0px',
          backgroundColor:'white',
          textDecoration:'underline'
        }}
         type="submit"
         onClick={()=>{            
            realUpload.current.click()}}
          className={styles.settings__change_photo}
          href=""
          target="_self"
        >заменить</button>
         
      </div>
    )
}