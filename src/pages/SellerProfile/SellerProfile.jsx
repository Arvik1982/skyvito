import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
import AddCard from '../../components/AddCard/AddCard'
import styles from './seller.module.css'
import SellerInfo from '../../components/SellerInfo/SellerInfo'
import LogoSky from '../../components/Logo/Logo'

export default function SellerProfile() {
  const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd'))
  const allAddsLocal = JSON.parse(localStorage.getItem('allAdds'))
  const currentAddRedux = useSelector((state) => state.addsRedux.currentAdd)
  const [sellersArray, setSellersArray] = useState([])
  const [seller, setSeller] = useState({})

  useEffect(() => {
    const sellersArrayOld = allAddsLocal.filter((el) => {
      let newUserId
      currentAddRedux.length !== 0
        ? (newUserId = currentAddRedux.user.id)
        : (newUserId = currentAddLocal.user.id)
      return el.user.id === newUserId
    })
    setSellersArray(sellersArrayOld)
    setSeller(sellersArrayOld[0]?.user)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={styles.main__center_block}>
              <div className={`${styles.main__menu} ${styles.menu}`}>
                <LogoSky />
                <form className={styles.menu__form} action="#">
                  <ToMainButton />
                </form>
              </div>
              <h2 className={styles.main__h2}>Профиль продавца</h2>
              <SellerInfo seller={seller} />
              <h3 className={styles.main__title}>Товары продавца</h3>
            </div>
            <div className={styles.main__content}>
              <div className={`${styles.content__cards} ${styles.cards}`}>
                {sellersArray.map((add) => {
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
