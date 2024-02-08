import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './myarticle.module.css'
import logo from '../../img/logo.png'
import ToMainButton from '../../components/ToMainButton/ToMainButton'

export default function MyArticle() {
    return(
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <Header noDisplay={false} />
      <main className={styles.main}>
        <div className={styles.main__container}>
          <div className={`${styles.main__menu} ${styles.menu}`}>
            <a className={styles.menu__logo_link} href="" target="_blank">
              <img
                className={styles.menu__logo_img}
                src={logo}
                alt="logo"
              />
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
                  <img src="" alt="" />
                </div>
                <div className={styles.article__img_bar}>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.article__img_bar_div}>
                    <img src="" alt="" />
                  </div>
                </div>
                <div
                  className={`${styles.article__img_bar_mob} ${styles.mg_bar_mob}`}
                >
                  <div
                    className={`${styles.img_bar_mob__circle} ${styles.circle_active}`}
                  />
                  <div className={styles.img_bar_mob__circle}/>
                  <div className={styles.img_bar_mob__circle}/>
                  <div className={styles.img_bar_mob__circle}/>
                  <div className={styles.img_bar_mob__circle}/>
                </div>
              </div>
            </div>
            <div className={styles.article__right}>
              <div className={styles.article__block}>
                <h3 className={`${styles.article__title} ${styles.title}`}>
                  Ракетка для большого тенниса Triumph Pro STС Б/У
                </h3>
                <div className={styles.article__info}>
                  <p className={styles.article__date}>Сегодня в 10:45</p>
                  <p className={styles.article__city}>Санкт-Петербург</p>
                  <a
                    className={styles.article__link}
                    href=""
                    target="_blank"
                    // rel=""
                  >
                    4 отзыва
                  </a>
                </div>
                <p className={styles.article__price}>2 200 ₽</p>
                <div className={styles.article__btn_block}>
                  <button
                    type="button"
                    className={`${styles.article__btn} ${styles.btn_redact} ${styles.btn_hov02}`}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className={`${styles.article__btn} ${styles.btn_remove} ${styles.btn_hov02}`}
                  >
                    Снять с публикации
                  </button>
                </div>

                <div className={`${styles.article__author} ${styles.author}`}>
                  <div className={styles.author__img}>
                    <img src="" alt="" />
                  </div>
                  <div className={styles.author__cont}>
                    <p className={styles.author__name}>Антон</p>
                    <p className={styles.author__about}>
                      Продает товары с&nbsp;мая 2022
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </main>

     <Footer/>
    </div>
  </div>
)}
