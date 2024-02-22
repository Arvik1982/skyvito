
import { useRef } from "react"
import styles from'../CreatePost/createpost.module.css'

import { localHost } from "../../vars/vars"

export default function ImgUploadForm({
  
  setFile,
  src,
  setSrc,
  id,
  imgUploadForms,
  setImgNumber,
  editMode,
  currentAdd}){

    const realUpload = useRef(null)

    return(
      <>
      {!editMode&&
        <div 
        key={Math.round(Math.random()*1000)}  
        className={styles.form_newArt__img}>
        <input
        
        key={Math.round(Math.random()*100)} 
        style={{ display: 'none' }}
        ref={realUpload} 
        type="file"
        accept="image/*, .png, .jpg, .gif, .web"
        onChange={(e)=>{
          
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
        
       
      </div>}

      {/* EDIT MODE */}
{editMode&&
      <div 
        key={Math.round(Math.random()*1000)}  
        className={styles.form_newArt__img}>
        <input
        // value={currentAdd.images[0].url}
        key={Math.round(Math.random()*100)} 
        style={{ display: 'none' }}
        ref={realUpload} 
        type="file"
        accept="image/*, .png, .jpg, .gif, .web"
        onChange={(e)=>{
          
        setFile(e.target.files[0]);
        (e.target.files[0])?setSrc(URL.createObjectURL(e.target.files[0])):"";
        setImgNumber(id)  
                }}/>
        <img         
        onClick={()=>{src||currentAdd.images[id]?realUpload.current.click():''}}
        style={src||currentAdd.images[id]?{
          width:'100%',
          height:'100%',
          }:null} 
          src={src?imgUploadForms[id].src:
            currentAdd.images[id]?localHost+currentAdd.images[id].url:null
          } alt="" 
          // src={currentAdd.images[id]?localHost+currentAdd.images[id].url:''} alt=""
            />

         <div
        onKeyDown={()=>{}}
        onClick={()=>{realUpload.current.click()}}
        className={styles.form_newArt__img_cover} />
        
       
      </div>}

      </>
    )
}