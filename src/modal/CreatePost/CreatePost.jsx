

import { 
  useEffect,
  // useRef,
   useState } from 'react'
import { useDispatch, 
  // useSelector 
} from 'react-redux'
import styles from './createpost.module.css'
import { setCreateAddStatus, setNewPostReady } from '../../store/reducers/sliceAdds'
// import uploadImage from '../../functions/upload_api'
// import { refreshTokens } from '../../api'
// import checkLoginStatus from '../../functions/checkLoginStatus'
// import { localHost } from '../../vars/vars'
import ImgUploadForm from '../ImgUpload/ImgUploadForm'
import UploadButton from'./UploadButton'



export default function CreatePost({editMode, postId}) {

  // const currentUserAdds = useSelector((state) => state.addsRedux.currentUserAdds);
  const currentAdd = JSON.parse(localStorage.getItem('currentAdd'))
  const dispatch = useDispatch()
  const [file, setFile] =useState('')
  const [description, setDescription]=useState('')
  const [title, setTitle]=useState('')
  const [price, setPrice]=useState('')
  const [src, setSrc]=useState('')
  const [imgNumber, setImgNumber]=useState('')
  const [newData, setNewData]=useState('')

  const [descriptionEdit, setDescriptionEdit]=useState(editMode?currentAdd.description:'')
  const [titleEdit, setTitleEdit]=useState(editMode?currentAdd.title:'')
  const [priceEdit, setPriceEdit]=useState(editMode?currentAdd.price:'')



  let formName; 
  editMode?formName='Редактировать объявление': formName='Новое объявление'


  const [imgUploadForms,setImgUploadForms] = useState( [ 
    {id:0, img:'', src:'' },
    {id:1, img:'', src:'' },
    {id:2, img:'', src:'' },
    {id:3, img:'', src:'' },
    {id:4, img:'', src:'' },])
 
    useEffect(()=>{
      
    if(price||priceEdit && title||titleEdit && description||descriptionEdit){
      console.log(price)
      console.log(descriptionEdit)

      dispatch(setNewPostReady(true))}
      },[price, title, description])

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
        <h3 className={styles.modal__title}>{formName}</h3>
        <div className={styles.modal__btn_close}>
          <div onKeyDown={()=>{dispatch(setCreateAddStatus(false))}}
            onClick={() => {dispatch(setNewPostReady(false));dispatch(setCreateAddStatus(false))}}
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
              value={editMode?titleEdit:title}
              onChange={(e)=>{editMode?setTitleEdit(e.target.value):setTitle(e.target.value)}}
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
            value={editMode?descriptionEdit:description}
              onChange={(e)=>{editMode?setDescriptionEdit(e.target.value):setDescription(e.target.value)}}
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
             value={editMode?priceEdit:price}
             onChange={(e)=>{editMode?setPriceEdit(e.target.value):setPrice(e.target.value)}}
            className={styles.form_newArt__input_price}
            type="number"
            name="price"
            id="formName"
          />
          <div className={styles.form_newArt__input_price_cover} />
            <UploadButton 
            postId={postId}
            editMode={editMode}
            file={file} 
            title={editMode?titleEdit:title} 
            description={editMode?descriptionEdit:description} 
            price={editMode?priceEdit:price}
            imgUploadForms={imgUploadForms}

           />


        </form>
      </div>
    </div>
  )
}
