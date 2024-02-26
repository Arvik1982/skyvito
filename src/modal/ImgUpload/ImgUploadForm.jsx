import { useDispatch, useSelector } from "react-redux"
import {  useEffect, useRef, useState,  
  // useState  
} from "react"
import styles from'../CreatePost/createpost.module.css'
// import { setImageRef } from "../../store/reducers/sliceAdds"
import { localHost } from "../../vars/vars"
import deleteImg from "../CreatePost/delImage"
import { getCurrentAdd, refreshTokens } from "../../api"
import { setTokenAccess, setTokenRefresh } from "../../store/reducers/sliceReg"
import {  setCurrentAdd, setImgDeleted } from "../../store/reducers/sliceAdds"



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
  postId}){

    const realUpload = useRef(null)
    const realImg = useRef(null)

    const dispatch=useDispatch()
    const userAssessTokenRedux = useSelector((state) => state.authRedux.access_token);
    const userRefreshTokenRedux = useSelector((state) => state.authRedux.access_refresh);
    const [startDel, setStartDel]=useState(false)
    
    useEffect(() => {
    
     postId?getCurrentAdd(postId).then((data) => {
         dispatch(setCurrentAdd(data))
      })
    :''}, [startDel])


    

    function del(){
      console.log('DELETiNG IMG...')
      setStartDel(true)
      refreshTokens(userAssessTokenRedux,userRefreshTokenRedux)
      .then((tokens)=>{
        dispatch(setTokenAccess(tokens.access_token));
        dispatch(setTokenRefresh(tokens.refresh_token));
        deleteImg(currentAdd.id,currentAdd.images[id]?.url, tokens.access_token)

        .then((data)=> 
        {
          
          if(data==='No content'){
            
            setSrc('')
            const newArr = imgUploadForms
            newArr.forEach((el)=>{el.id === id?(el.deleted = true):''})
            setImgUploadForms(newArr)
          }
          dispatch(setImgDeleted(true));
          setStartDel(false)
          console.log('DELETED IMG')
        })
        .catch((err)=>{
          setStartDel(false);
          console.log(err.message)
          console.log("err.message")
        })
      });
      
      
    }

   
    
  

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
        onClick={()=>
          {src?realUpload.current.click():''}
        }
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
        key=
         {Math.round(Math.random()*1000)}  
        className={styles.form_newArt__img}>

<div
onClick={()=>{del(realUpload)}}
className={src||currentAdd.images[id]?styles.delete__img_text
          :styles.display}> X </div>


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

        // disabled={src||currentAdd.images[id]?Boolean(true):false}
        
          ref={realImg} 
          onClick={()=> 
          {src||currentAdd.images[id]? del(realUpload): realUpload.current.click()}
        }
          style={src||currentAdd.images[id]?{width:'100%',height:'100%'}:null} 
          src={
            src?imgUploadForms[id].src:
            currentAdd.images[id]?
            localHost+currentAdd.images[id].url
            :null
          } 

          // src?imgUploadForms[id].src:
          // currentAdd.images[id]?
          // localHost+currentAdd.images[id].url
          // :null

          alt="" />

         <div onKeyDown={()=>{}} 
         onClick={()=>{realUpload.current.click()}}
         className={styles.form_newArt__img_cover} />

         
         
       </div>
      }

      </>
    )
}