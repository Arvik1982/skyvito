import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import styles from './addCard.module.css'
import { localHost } from '../../vars/vars'
import logo from '../../img/logo.png'
import dataFormat from '../../functions/dataformat'
import { setCurrentAdd } from '../../store/reducers/sliceAdds'

export default function AddCard({ add }) {
  const fullDate = dataFormat(add.created_on)
  const dispatch = useDispatch()

  return (
    <div key={add.id} className={styles.cards__item}>
      <div className={`${styles.cards__card} ${styles.card}`}>
        <div className={styles.card__image}>
          <Link
            onClick={() => {
              dispatch(setCurrentAdd(add))
            }}
            to={`/article/${add.id}`}
          >
            <img
              src={
                add.images[0]?.url
                  ? `${localHost}${add.images[0]?.url} `
                  : `${logo}`
              }
              alt="card"
            />
          </Link>
        </div>
        <div className={styles.card__content}>
          <Link
            onClick={() => {
              dispatch(setCurrentAdd(add))
            }}
            to={`/article/${add.id}`}
            // "/article"
          >
            <h3 className={styles.card__title}>{add.title}</h3>
          </Link>
          <p className={styles.card__price}>{add.price}</p>
          <p className={styles.card__place}>{add.user.city}</p>
          <p className={styles.card__date}>{fullDate}</p>
        </div>
      </div>
    </div>
  )
}
