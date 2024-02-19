import { Link } from "react-router-dom"
import styles from'./button.module.css'
import deletePost from "../../modal/CreatePost/deletePost_api"

import { refreshTokens } from "../../api"

export default function DeleteButton({postId}){
    return(
<Link to='/'>
        <button
        onClick={()=>{
          refreshTokens().then((tokens)=>{deletePost(tokens.access_token,postId)})
          }}
        type="button"
        className={`${styles.menu__btn_serch} ${styles.btn_hov02}`}
        id="btnGoBack"
      >
        Снять с публикации
      </button> 
    </Link>  
    )
}