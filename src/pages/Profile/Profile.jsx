
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './profile.module.css'
import logo from'../../img/logo.png'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
// import { baseData } from '../../vars/vars'
// import AddCard from '../../components/AddCard/AddCard'
import checkLoginStatus from '../../functions/checkLoginStatus'
import { refreshTokens, getCurrentUserAdds } from '../../api'



export default function Profile() {

  const userDataRedux = useSelector(state=>state.authRedux.userData) //  получить массив юзера и передать в AddCard
  const userData = checkLoginStatus(userDataRedux)
 
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header page='profile' />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={styles.main__center_block}>
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

              <h2 className={styles.main__h2}>Здравствуйте,{userData.name?userData.name:'No Named User'}!</h2>

              <div className={`${styles.main__profile} ${styles.profile}`}>
                <div className={styles.profile__content}>
                  <h3 className={`${styles.profile__title} ${styles.title}`}>
                    Настройки профиля
                  </h3>
                  <div
                    className={`${styles.profile__settings} ${styles.settings}`}
                  >
                    <div className={styles.settings__left}>
                      <div className={styles.settings__img}>
                        <a href="" target="_self">
                          <img src="#" alt="self" />
                        </a>
                      </div>
                      <a
                        className={styles.settings__change_photo}
                        href=""
                        target="_self"
                      >
                        Заменить
                      </a>
                    </div>
                    <div className={styles.settings__right}>
                      <form className={styles.settings__form} action="#">
                        <div className={styles.settings__div}>
                          <label 
                        //   for="fname"
                          >Имя</label>
                          <input
                            className={styles.settings__f_name}
                            id="fname"
                            name="fname"
                            type="text"
                            value={userData.name}
                            placeholder="Введите имя"
                          />
                        </div>

                        <div className={styles.settings__div}>
                          <label 
                        //   for="lname"
                          >Фамилия</label>
                          <input
                            className={styles.settings__l_name}
                            id="lname"
                            name="lname"
                            type="text"
                            value={userData.surname}
                            placeholder="Введите фамилию"
                          />
                        </div>

                        <div className={styles.settings__div}>
                          <label 
                        //   for="city"
                          >Город</label>
                          <input
                            className={styles.settings__city}
                            id="settings-city"
                            name="city"
                            type="text"
                            value={userData.city}
                            placeholder=""
                          />
                        </div>

                        <div className={styles.settings__div}>
                          <label 
                        //   for="phone"
                          >Телефон</label>
                          <input
                            className={styles.settings__phone}
                            id="settings-phone"
                            name="phone"
                            type="tel"
                            value={userData.phone?userData.phone:''}
                            placeholder="Введите телефон: +79161234567"
                          />
                        </div>

                        <button
                          type="button"
                          className={`${styles.settings__btn} ${styles.btn_hov02}`}
                          id="settings-btn"
                        >
                          Сохранить
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className={`${styles.main__title} ${styles.title}`}>
                Мои товары
              </h3>
            </div>
            <div className={styles.main__content}>
              <div className={`${styles.content__cards} ${styles.cards}`}>
              {/* передать сюда массив юзера */}
                {/* <AddCard/>  */}
              </div>
            </div>
          </div>
        </main>
<button type='button' onClick={()=>{getCurrentUserAdds()}}>click</button>
  <Footer/>
      </div>
    </div>
  )
}
