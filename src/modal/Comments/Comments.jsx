
import { useState } from 'react';
import styles from './Comments.module.css'
import { localHost } from '../../vars/vars';
import createComment from './createComment';
import { refreshTokens } from '../../api';


export default function Comments({ commentsOpen, setCommentsOpen, comments, 
    // setComments,
    postId }) {
    console.log(postId)
    console.log(comments)
const [commentText, setCommentText]=useState('')


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
              <textarea
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
            onClick={()=>{
                    refreshTokens().then((tokens)=>{
                    createComment(tokens.access_token, commentText).then((data)=>{
                    console.log(data);
                    // setComments(data)
                })})}}
              type='button'
              className={`${styles.form_newArt__btn_pub} ${styles.btn_hov02}`}
              id="btnPublish"
            >
              Опубликовать
            </button>
          </form>

          <div className={`${styles.modal__reviews} ${styles.reviews}`}>
 {/* COMMENTS */}
            
            
              {comments.map((el)=>{return(
                <div className={`${styles.reviews__review} ${styles.review}`}>
                <div className={styles.review__item}>
                <div className={styles.review__left}>

                  <div className={styles.review__img}>
                    <img src={localHost+el.author.avatar} alt="" />
                  </div>

                </div>

                <div className={styles.review__right}>

                  <p className={`${styles.review__name} ${styles.font_t}`}>
                    {' '}
                    {el.author.name}
                    <span>14 августа</span>
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
