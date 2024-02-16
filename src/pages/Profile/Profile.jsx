import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState,  } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './profile.module.css'
import logo from '../../img/logo.png'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
import AddCard from '../../components/AddCard/AddCard'
import checkLoginStatus from '../../functions/checkLoginStatus'
import ProfileTextInput from '../../components/ProfileTextInputs/ProfileTextInputs'
import ChangeAvatar from '../../components/ChangeAvatar/ChangeAvatar'
import getUserAddsByToken from '../../functions/getUserAddsByToken'
import SaveUserData from '../../components/SaveUserData/SaveUserData'
import { setUserTmpPhone } from '../../store/reducers/sliceReg'


export default function Profile() {

const navigate=useNavigate()  
  const dispatch = useDispatch()
  const error = useSelector((state) => state.errorRedux.error)
  const userDataRedux = useSelector((state) => state.authRedux.userData) //  получить массив юзера и передать в AddCard
  const userData = checkLoginStatus(userDataRedux)
  const currentUserAdds = useSelector((state) => state.addsRedux.currentUserAdds)
  const [userPhone, setUserPhone] = useState(userData.phone ? userData.phone : '')
  const inputForms = [
    { id:1,
      name: 'name',
      value: userData.name,
      placeholder: 'Введите имя',
      labelName:'Имя'
    },
    { id:2,
      name: 'surname',
      value: userData.surname,
      placeholder: 'Введите фамилию',
      labelName:'Фамилия'
    },
    { id:3,
      name: 'city',
      value: userData.city,
      placeholder: 'Введите город',
      labelName:'Город'
    },
  ]

  
  useEffect(() => {
    dispatch(setUserTmpPhone(userPhone))
  }, [userPhone])

  useEffect(() => {
    getUserAddsByToken(dispatch)
    if(userData.name==='No_User'){navigate('/login')}
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header page="profile" />
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
                  <ToMainButton />
                </form>
              </div>

              <h2 className={styles.main__h2}>
                Здравствуйте,{userData.name ? userData.name : 'Введите свое имя'}!
              </h2>

              <div className={`${styles.main__profile} ${styles.profile}`}>
                <div className={styles.profile__content}>
                  <h3 className={`${styles.profile__title} ${styles.title}`}>
                    Настройки профиля
                  </h3>
                  <div
                    className={`${styles.profile__settings} ${styles.settings}`}
                  >{console.log(userData)}
                    <ChangeAvatar avatar={userData.avatar} />

                    <div className={styles.settings__right}>
                      <form className={styles.settings__form} action="#">
                        {inputForms.map((el) => {
                          return (
                            <div key={el.id} className={styles.settings__div}>
                              <label>{el.labelName}</label>
                              <ProfileTextInput
                                name={el.name}
                                value={el.value}
                                placeholder={el.placeholder}
                              />
                            </div>
                          )
                        })}
                        <div className={styles.settings__div}>
                          <label>Телефон</label>
                          <input
                            onChange={(event) => {
                              setUserPhone(event.target.value)
                            }}
                            className={styles.settings__phone}
                            id="settings-phone"
                            name="phone"
                            type="tel"
                            value={userPhone}
                            placeholder="Введите телефон: +79161234567"
                          />
                          {error && (<h2 style={{ color: 'red', marginTop:'10px' }}>{error}</h2>)}
                        </div>
                        <SaveUserData />
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
                {currentUserAdds?.map((add) => {
                  return <AddCard key={add.id} add={add} />
                })}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
