import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './header.module.css'
import checkLoginStatus from '../../functions/checkLoginStatus'
import CreatePost from '../../modal/CreatePost/CreatePost'
import { setCreateAddStatus, setEditMode, setNewPostReady } from '../../store/reducers/sliceAdds'
import closeModal from '../../functions/closeModal'
import logout from '../../functions/logOut'
import { setError } from '../../store/reducers/sliceError'


export default function Header({ noDisplay, page,postId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const editMode=useSelector((state) => state.addsRedux.editMode)
  const userData = useSelector((state) => state.authRedux.userData)
  const createAddStatus = useSelector((state) => state.addsRedux.createAdd)
  const loginStatus = checkLoginStatus(userData)
  const [isLogin, setIsLogin] = useState('')



  useEffect(() => {
    
    loginStatus.name !== 'No_User' ? setIsLogin(true) : setIsLogin(false)
  }, [])

  const createPostClick =(e)=>{

    e.stopPropagation()
    dispatch(setNewPostReady(false));
    dispatch(setEditMode(false));
    createAddStatus
      ? dispatch(setCreateAddStatus(false))
      : dispatch(setCreateAddStatus(true))
  }
  

  return (
    <header
    
        onClick={(e) => {
        e.stopPropagation()
        closeModal(dispatch, createAddStatus)
      }}
      onMouseUp={()=>{}}
      className={styles.header}
    >
      <nav className={styles.header__nav}>
        {isLogin &&<button
          type="button"
          onClick={(e) => {
           createPostClick(e)
          }
        }
          className={`${styles.header__btn_putAd} ${noDisplay ? styles.el_display : ''}`}
        >
          Разместить объявление
        </button>}

        {isLogin && (
          <button
            onClick={() => { 
              dispatch(setError(''))
              setIsLogin(false)
              logout(dispatch,navigate)
            }}
            type="button"
            className={`${styles.header__btn_putAd} ${noDisplay ? styles.el_display : ''}`}
          >
            Выйти
          </button>
        )}

        {page !== 'profile' && (
          <button
            onClick={() => {
              navigate('/profile')
            }}
            type="button"
            className={`${styles.header__btn_main_enter} ${styles.btn_hov01}`}
            id="btnMainEnter"
          >
            {!isLogin?`${'Вход в личный кабинет'}`:`${'В личный кабинет'}`}
          </button>
        )}
      </nav>
      {createAddStatus && <CreatePost postId={postId} editMode={editMode} />}
    </header>
  )
}
