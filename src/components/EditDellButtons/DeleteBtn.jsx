import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from'./button.module.css'
import deletePost from "../../modal/CreatePost/deletePost_api"

import { refreshTokens } from "../../api"


export default function DeleteButton({postId}){
  const [processOn, setProcessOn]=useState(false)
  const inProcess = 'Снимаем...'
  const deleteCurrentPost = 'Снять с публикации'
  const navigate =useNavigate()
    return(

        <button
        onClick={()=>{
          refreshTokens()
          .then((tokens)=>{setProcessOn(true);setTimeout(()=>{postId?deletePost(tokens.access_token,postId):''},2000) })
          .then(()=>{setTimeout(()=>{postId?navigate('/profile'):'';setProcessOn(false);},2500)})
          }}
        type="button"
        className={`${styles.menu__btn_serch} ${styles.btn_hov02}`}
        id="btnGoBack"
      >
        {processOn?inProcess:deleteCurrentPost}
      </button> 
      
    )
}