import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { localHost } from '../../vars/vars'
import styles from './article.module.css'
import logo from '../../img/logo.png'
import Header from '../../components/Header/Header'
import dataFormat from '../../functions/dataformat'
import { getCurrentComment } from '../../api'

import Footer from'../../components/Footer/Footer'
import ToMainButton from '../../components/ToMainButton/ToMainButton'

export default function Article() {
  const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd'))
  const [currentAdd] = useState(currentAddLocal)
  const [comments, setComments] = useState([])

  useEffect(() => {
    getCurrentComment(currentAdd.id).then((data) => {
      let dataArray = []
      dataArray = data
      setComments(dataArray)
    })
  }, [])

  console.log(comments)
  console.log(currentAdd)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header noDisplay={false} />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={`${styles.main__menu} ${styles.menu}`}>
              <a className={styles.menu__logo_link} href="" target="_blank">
                <img className={styles.menu__logo_img} src={logo} alt="logo" />
              </a>

              <form className={styles.menu__form} action="#">
                <ToMainButton/>
              </form>
            </div>
          </div>

          <div className={`${styles.main__artic} ${styles.artic}`}>
            <div className={`${styles.artic__content} ${styles.article}`}>
              <div className={styles.article__left}>
                <div className={styles.article__fill_img}>
                  <div className={styles.article__img}>
                    <img
                      src={
                        currentAdd.images[0]?.url
                          ? `${localHost}${currentAdd.images[0]?.url} `
                          : `${logo}`
                      }
                      alt="element"
                    />
                  </div>
                  <div className={styles.article__img_bar}>
                    {currentAdd.images.map((el) => {
                      return (
                        <div className={styles.article__img_bar_div}>
                          <img
                            src={el?.url ? `${localHost}${el?.url}` : `${logo}`}
                            alt="element"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className={`${styles.article__img_bar_mob}`}>
                    {currentAdd.images.map((el) => {
                      return (
                        <div
                          className={`${styles.img_bar_mob__circle} ${styles.circle_active}`}
                        >
                          <img
                            className={styles.img_bar_mob__circle}
                            src={el?.url ? `${localHost}${el?.url}` : `${logo}`}
                            alt="element"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.article__right}>
                <div className={styles.article__block}>
                  <h3 className={`${styles.article__title} ${styles.title}`}>
                    {currentAdd.title}
                  </h3>
                  <div className={styles.article__info}>
                    <p className={styles.article__date}>
                      {dataFormat(currentAdd.created_on)}
                    </p>
                    <p className={styles.article__city}>
                      {currentAdd.user.city}
                    </p>
                    <a
                      className={styles.article__link}
                      href=""
                      target="_blank"
                      // rel="#"
                    >
                      {comments.length}
                    </a>
                  </div>
{/* comments */}
                  <div className={`${styles.comments__list} ${styles.comments_visible}`}>
                  {comments.map((el) => {
                      return (
                        <div>
                          <h2>-{el.author.name}</h2>
                          <h3>{el.text}</h3>
                        </div>
                      )
                    })}
                  </div>
{/* comments */}
                  <p className={styles.article__price}>{currentAdd.price}</p>
                  <button
                    type="button"
                    className={`${styles.article__btn} ${styles.btn_hov02}`}
                  >
                    Показать&nbsp;телефон <br />
                    <span> {currentAdd.user.phone}</span> <br />
                    <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                  </button>
                  <div className={`${styles.article__author} ${styles.author}`}>
                    <div className={styles.author__img}>
                      <Link to='/seller'>
                      <img
                        src={
                          currentAdd.user?.avatar
                            ? `${localHost}${currentAdd.user.avatar}`
                            : `${logo}`
                        }
                        alt="author"
                      />
                      </Link>
                    </div>
                    <div className={styles.author__cont}>
                    <Link to='/seller'>
                      <p className={styles.author__name}>
                        {currentAdd.user.name}
                      </p>
                      </Link>
                      <p className={styles.author__about}>
                        {currentAdd.user.sells_from}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.main__container}>
            <h3 className={`${styles.main__title} ${styles.title}`}>
              Описание товара
            </h3>
            <div className={styles.main__content}>
              <p className={styles.main__text}>
                {currentAdd.description
                  ? currentAdd.description
                  : 'Прсто очень хорошая вещь, надо брать!'}
              </p>
            </div>
          </div>
        </main>

        <Footer/>
      </div>
    </div>
  )
}
