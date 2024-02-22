import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
import AddCard from '../../components/AddCard/AddCard'
import logo from'../../img/logo.png'
import styles from'./seller.module.css'
import SellerInfo from '../../components/SellerInfo/SellerInfo'

export default function SellerProfile() {

   const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd'))
   const allAddsLocal = JSON.parse(localStorage.getItem('allAdds'))
   const sellersArray = allAddsLocal.filter((el)=>{return el.user.id===currentAddLocal.user.id})
   const seller = sellersArray[0].user
   return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={styles.main__center_block}>
              <div className={`${styles.main__menu} ${styles.menu}`}>
                <a className={styles.menu__logo_link} href="" target="_blank">
                  <img className={styles.menu__logo_img} src={logo} alt="logo" />
                </a>
                <form className={styles.menu__form} action="#">
                  <ToMainButton/>
                </form>
              </div>
              <h2 className={styles.main__h2}>Профиль продавца</h2>
              <SellerInfo seller={seller}/>
              <h3 className={styles.main__title }>Товары продавца</h3>
            </div>
            <div className={styles.main__content}>
              <div className={`${styles.content__cards} ${styles.cards}`}>
              {sellersArray.map((add)=>{
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
