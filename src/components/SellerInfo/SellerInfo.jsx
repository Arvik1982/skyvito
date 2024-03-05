import styles from './sellerinfo.module.css'
import { localHost } from '../../vars/vars'
import logo from '../../img/logo.png'
import PhoneButton from '../PhoneButton/PhoneButton'

export default function SellerInfo({ seller }) {
  return (
    <div className={`${styles.main__profile_sell} ${styles.profile_sell}`}>
      <div className={styles.profile_sell__content}>
        <div className={`${styles.profile_sell__seller} ${styles.seller}`}>
          <div className={styles.seller__left}>
            <div className={styles.seller__img}>
              {/* <a href="" target="_self"> */}
              <img
                className={styles.seller__avatar}
                src={
                  seller?.avatar ? `${localHost}${seller.avatar}` : `${logo}`
                }
                alt=""
              />
              {/* </a> */}
            </div>
          </div>
          <div className={styles.seller__right}>
            <h3 className={styles.seller__title}>{seller.name}</h3>
            <p className={styles.seller__city}>{seller.city}</p>
            <p className={styles.seller__inf}>Продает с {seller.sells_from}</p>
            <div className={styles.seller__img_mob_block}>
              <div className={styles.seller__img_mob}>
                {/* <a href="" target="_self"> */}
                <img src="#" alt="" />
                {/* </a> */}
              </div>
            </div>
            <PhoneButton phone={seller.phone} />
            </div>
        </div>
      </div>
    </div>
  )
}
