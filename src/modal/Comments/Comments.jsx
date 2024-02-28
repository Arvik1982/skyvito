import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Comments.module.css'
import { localHost } from '../../vars/vars';
import createComment from './createComment';
import { getCurrentComment, refreshTokens } from '../../api';
import dataFormat from'../../functions/dataformat'


export default function Comments({ commentsOpen, setCommentsOpen, comments, setComments }) {
   
const userAssessTokenRedux = useSelector((state) => state.authRedux.access_token);
const userRefreshTokenRedux = useSelector((state) => state.authRedux.access_refresh);
const [commentText, setCommentText]=useState('')
const [login, setLogin]=useState(false)
const currentAdd= JSON.parse(localStorage.getItem('currentAdd'))
const token = localStorage.getItem('user_token')


useEffect(()=>{
  userAssessTokenRedux || token ? setLogin(true):setLogin(false)
},[])

const sendCommentClick = ()=>{

  !commentText?'':
  refreshTokens(userAssessTokenRedux,userRefreshTokenRedux)
  .then((tokens)=>{
  createComment(tokens.access_token, commentText)
  .then(()=>{
  setCommentText('');
  getCurrentComment(currentAdd.id)
  .then((dataComments) => {
      let dataArray = []
      dataArray = dataComments
      setComments(dataArray)
    })
  
})})

}
  return (
    <div 
      className={commentsOpen ? styles.modal__block : styles.noDisplay}>

      <div className={styles.modal__content}>
      
        <h3 className={styles.modal__title}>Отзывы о товаре</h3>

        <div 
        onClick={(e) => {e.stopPropagation();setCommentsOpen(false)}}
        className={styles.modal__btn_close}>
          <div className={styles.modal__btn_close_line} />
        </div>

        <div className={styles.modal__scroll}>
          <form
            className={`${styles.modal__form_newArt} ${styles.form_newArt}`}
            id="formNewArt"
            action="#"
          >
            <div className={styles.form_newArt__block}>
            <label >Добавить отзыв</label>
              
              {!commentText&&<label style={{color:'red'}} >
                Заполните поле с отзывом</label>}
              <textarea
              
                disabled={userAssessTokenRedux || Boolean(token)?false:true}
                value={commentText}
                onChange={(e)=>{setCommentText(e.target.value);}}
                className={styles.form_newArt__area}
                name="text"
                id="formArea"
                cols="auto"
                rows="5"
                placeholder="Введите описание"
              />
             
            </div>
            
            <button
            disabled={commentText?false:true}
            onClick={ sendCommentClick }
              type='button'
              className={`${styles.form_newArt__btn_pub} ${styles.btn_hov02}`}
              id="btnPublish"
            >
              Опубликовать
            </button>
          </form>
          
          {!login && <h3 style={{color:'red'}}> Что бы оставить комментарий нужно войти в приложение</h3>}
          
          
          <div className={`${styles.modal__reviews} ${styles.reviews}`}>

 {/* COMMENTS */}
            
               {comments.map((el)=>{return(
                <div key={el.id} className={`${styles.reviews__review} ${styles.review}`}>
                <div className={styles.review__item}>
                <div className={styles.review__left}>

                  <div 
                  className={styles.review__img}
                  >
                    <img className={styles.review__img_avatar} src={localHost+el.author.avatar} alt="" />
                  </div>

                </div>

                <div className={styles.review__right}>

                  <p className={`${styles.review__name} ${styles.font_t}`}>
                    {' '}
                    {el.author.name}


                    <span>{dataFormat( el.created_on)}</span>
                  </p>
                  <h5 className={`${styles.review__title} ${styles.font_t}`}>
                    Комментарий
                  </h5>
                  <p className={`${styles.review__text} ${styles.font_t}`}>
                    {el.text}
                  </p>


                </div>
              
                </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    </div>
  )
}
