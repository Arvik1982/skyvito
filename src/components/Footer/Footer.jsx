import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './footer.module.css'
import icon01 from '../../img/icon_01.png'
import icon02 from '../../img/icon_02.png'
import icon03 from '../../img/icon_03.png'
import {
  setCreateAddStatus,
  setEditMode,
  setNewPostReady,
} from '../../store/reducers/sliceAdds'

export default function Footer() {
  const createAddStatus = useSelector((state) => state.addsRedux.createAdd)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__img}>
          <a
            onClick={() => {
              navigate('/')
            }}
          >
            <img src={icon01} alt="home" />
          </a>
        </div>
        <div className={styles.footer__img}>
          <a
            onClick={(e) => {
              e.stopPropagation()
              dispatch(setNewPostReady(false))
              dispatch(setEditMode(false))
              createAddStatus
                ? dispatch(setCreateAddStatus(false))
                : dispatch(setCreateAddStatus(true))
            }}
            // href="" target="_self"
          >
            <img src={icon02} alt="home" />
          </a>
        </div>
        <div className={styles.footer__img}>
          <a
            onClick={() => {
              navigate('/profile')
            }}
          >
            <img src={icon03} alt="home" />
          </a>
        </div>
      </div>
    </div>
  )
}
