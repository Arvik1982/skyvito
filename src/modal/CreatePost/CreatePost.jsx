

import { 
  useEffect,
  // useRef,
   useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './createpost.module.css'
import { setCreateAddStatus } from '../../store/reducers/sliceAdds'
// import uploadImage from '../../functions/upload_api'
// import { refreshTokens } from '../../api'
import checkLoginStatus from '../../functions/checkLoginStatus'
// import { localHost } from '../../vars/vars'
import ImgUploadForm from '../ImgUpload/ImgUploadForm'
import UploadButton from'./UploadButton'


export default function CreatePost() {

 const [file, setFile] =useState('')

  // const realUpload = useRef(null)

  const currentUserAdds = useSelector((state) => state.addsRedux.currentUserAdds);
  const userDataRedux = useSelector((state) => state.authRedux.userData); //  получить массив юзера и передать в AddCard
  const userData = checkLoginStatus(userDataRedux);
  
  
 
  console.log(currentUserAdds)
  console.log(userDataRedux)
  console.log(userData)

  const dispatch = useDispatch()
  const [description, setDescription]=useState('')
  const [title, setTitle]=useState('')
  const [price, setPrice]=useState('')
  const [src, setSrc]=useState('')
  const [imgNumber, setImgNumber]=useState('')
  const [newData, setNewData]=useState('')
  const [imgUploadForms,setImgUploadForms] = useState( [ 
    {id:0, 
      img:'',
      src:''
    },
    {id:1, 
      img:'',
      src:''
    },
    {id:2,
       img:'',
      src:''
    },
    {id:3, 
      img:'',
    src:''
    },
    {id:4,
    img:'',
    src:''
    },])
 


useEffect(()=>{

newData?setNewData(false):setNewData(true)

imgUploadForms.forEach((el)=>{
    el.id===imgNumber?el.src = src:'not src';
    el.id===imgNumber?el.img=file:'not file';
  })
  setImgUploadForms(imgUploadForms)
  
},[src])

  return (
    <div key={newData} className={styles.modal__block}>
      <div
      onKeyDown={(e)=>{e.stopPropagation()}}
      onClick={(e)=>{e.stopPropagation()}}
      className={styles.modal__content}>
        <h3 className={styles.modal__title}>Новое объявление</h3>
        <div className={styles.modal__btn_close}>
          <div onKeyDown={()=>{dispatch(setCreateAddStatus(false))}}
            onClick={() => {dispatch(setCreateAddStatus(false))}}
            className={styles.modal__btn_close_line}
          />
        </div>
        <form
          className={`${styles.modal__form_newArt} ${styles.form_newArt}`}
          id="formNewArt"
          action="#"
        >
          <div className={styles.form_newArt__block}>
            <label
              htmlFor="name">Название</label>
            <input
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
              className={styles.form_newArt__input}
              type="text"
              name="name"
              id="formName"
              placeholder="Введите название"
            />
          </div>
          <div className={styles.form_newArt__block}>
            <label htmlFor="text">Описание</label>
            <textarea
            value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              className={styles.form_newArt__area}
              name="text"
              id="formArea"
              cols="auto"
              rows="10"
              placeholder="Введите описание"
            />
          </div>
          <div className={styles.form_newArt__block}>
            <p className={styles.form_newArt__p}>
              Фотографии товара<span>не более 5 фотографий</span>
            </p>
            <div className={styles.form_newArt__bar_img}>
              {imgUploadForms.map((el)=>{
                return(
                  <ImgUploadForm 
                  file={file} 
                  setFile={setFile} 
                  src={el.src} 
                  setSrc={setSrc}
                  id={el.id}
                  imgUploadForms={imgUploadForms}
                  setImgNumber={setImgNumber} />)
              })
              }
              
            </div>
          </div>
          <div
            className={`${styles.form_newArt__block} ${styles.block_price}`}
          />
          <label
            htmlFor="price">Цена</label>
            <input
             value={price}
             onChange={(e)=>{setPrice(e.target.value)}}
            className={styles.form_newArt__input_price}
            type="number"
            name="price"
            id="formName"
          />
          <div className={styles.form_newArt__input_price_cover} />
            <UploadButton 
            file={file} 
            title={title} 
            description={description} 
            price={price}
            imgUploadForms={imgUploadForms}

           />


        </form>
      </div>
    </div>
  )
}
