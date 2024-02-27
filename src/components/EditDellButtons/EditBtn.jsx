
import { useDispatch } from 'react-redux'
import { setCreateAddStatus, setEditMode } from '../../store/reducers/sliceAdds'
import styles from'./button.module.css'

export default function EditButton(){
  const dispatch = useDispatch()
    return(

        <button
        onClick={()=>{
          dispatch(setCreateAddStatus(true));
          dispatch(setEditMode(true))
        }}
        style={{width:'200px'}}
        type="button"
        className={`${styles.menu__btn_serch} ${styles.btn_hov02}`}
        id="btnGoBack"
      >
        Редактировать
      </button> 
     
    )
}