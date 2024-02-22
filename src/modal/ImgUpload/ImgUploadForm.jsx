
import { useRef } from "react"
import styles from'../CreatePost/createpost.module.css'


export default function ImgUploadForm({
  
  setFile,
  src,
  setSrc,
  id,
  imgUploadForms,
  setImgNumber}){

    const realUpload = useRef(null)

    return(
      
        <div className={styles.form_newArt__img}>
        <input
        style={{ display: 'none' }}
        ref={realUpload} 
        type="file"
        accept="image/*, .png, .jpg, .gif, .web"
        onChange={(e)=>{
          console.log(id)
        setFile(e.target.files[0]);
        (e.target.files[0])?setSrc(URL.createObjectURL(e.target.files[0])):"";
        setImgNumber(id)  
                }}/>
        <img         
        onClick={()=>{src?realUpload.current.click():''}}
        style={src?{
          width:'100%',
          height:'100%',
          }:null} 
          src={src?imgUploadForms[id].src:null} alt=""  
          />

         <div
        onKeyDown={()=>{}}
        onClick={()=>{realUpload.current.click()}}
        className={styles.form_newArt__img_cover} />
        
       
      </div>
      
    )
}