import { useEffect, useState } from 'react'
import { useDispatch, 
  // useSelector
 } from 'react-redux'
import { Link } from 'react-router-dom'
import { localHost,
  // accessToken
} from '../../vars/vars'
import styles from './article.module.css'
import logo from '../../img/logo.png'
import Header from '../../components/Header/Header'
import dataFormat from '../../functions/dataformat'
import { getCurrentComment, getUserByToken, refreshTokens } from '../../api'
import Footer from'../../components/Footer/Footer'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
import PhoneButton from '../../components/PhoneButton/PhoneButton'
import EditButton from '../../components/EditDellButtons/EditBtn'
import DeleteButton from '../../components/EditDellButtons/DeleteBtn'
import { setUserData } from '../../store/reducers/sliceReg'
// import { setCurrentAdd } from '../../store/reducers/sliceAdds'
import Comments from '../../modal/Comments/Comments'


export default function Article() {
  const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd')) // actual
  const userId =Number( localStorage.getItem('userUID')) // user before actual
  
  const [currentAdd] = useState(currentAddLocal)
  const [displayButtons, setDisplayButtons]=useState(false)
  const [comments, setComments] = useState([])
  // const [showButtons, setShowButtons] = useState(false)
  const dispatch = useDispatch()

 const currentAddUserId = currentAdd.user.id
 const postId=currentAdd.id
const [commentsOpen, setCommentsOpen]= useState(false)

// = useSelector(state=>state.authRedux.userData.id)



  useEffect(() => {
    !userId||!currentAddUserId?setDisplayButtons(true):'';
    // setShowButtons(true)
    refreshTokens().catch((err)=>{console.log(err)}).then((tokens)=>{ 

      getUserByToken(tokens.access_token)
      .then((data)=>{
        dispatch(setUserData(data));
        setDisplayButtons(true)})
      .catch((err)=>{console.log(err)})

    })

    getCurrentComment(currentAdd.id).then((data) => {
      
      let dataArray = []
      dataArray = data
      setComments(dataArray)
    }).catch((err)=>{console.log(err)})
  }, [])
   
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header postId={postId} noDisplay={false} />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={`${styles.main__menu} ${styles.menu}`}>
              <a className={styles.menu__logo_link} href="" target="_blank">
                <img className={styles.menu__logo_img} src={logo} alt="logo" />
              </a>

              <form className={styles.menu__form} action="#">
                <ToMainButton/>
              </form>
            </div>
          </div>

          <div   className={`${styles.main__artic} ${styles.artic}`}>
            <div  className={`${styles.artic__content} ${styles.article}`}>
              <div  className={styles.article__left}>
                <div  className={styles.article__fill_img}>
                  <div  className={styles.article__img}>
                    
                    <img 
                      src={
                        currentAdd.images[0]?.url
                          ? `${localHost}${currentAdd.images[0]?.url} `
                          : `${logo}`
                      }
                      alt="element"
                    />
                  </div>
                  <div 
                  
                   className={styles.article__img_bar}>
                    {currentAdd.images.map((el) => {
                      return (
                        <div key={Math.round(Math.random()*100000)}   
                        className={styles.article__img_bar_div}>
                         
                          <img className={styles.img__line}
                           key={Math.round(Math.random()*10000)}
                            src={el?.url ? `${localHost}${el?.url}` : `${logo}`}
                            alt="element"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div key={Math.round(Math.random()*1000)} className={`${styles.article__img_bar_mob}`}>
                    {currentAdd.images.map((el) => {
                      return (
                        <div key={Math.round(Math.random()*100)}
                          className={`${styles.img_bar_mob__circle} ${styles.circle_active}`}
                        >
                          <img 
                             key={Math.round(Math.random()*10)}
                            className={`${styles.img_bar_mob__circle}`}
                            src={el?.url ? `${localHost}${el?.url}` : `${logo}`}
                            alt="element"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.article__right}>
                <div className={styles.article__block}>
                  <h3 className={`${styles.article__title} ${styles.title}`}>
                    {currentAdd.title}
                  </h3>
                  <div className={styles.article__info}>
                    <p className={styles.article__date}>
                      {dataFormat(currentAdd.created_on)}
                    </p>
                    <p className={styles.article__city}>
                      {currentAdd.user.city}
                    </p>
                    <span 
                      style={{cursor:'pointer', color:'#0080C1', textDecoration:'underline'}}
                      onClick={()=>{setCommentsOpen(true)}}
                      // className={styles.article__link}
                     
                    >
                      {comments.length}
                    </span>
                  </div>
{/* comments */}
          <Comments 
          setComments={setComments} 
          commentsOpen={commentsOpen} 
          setCommentsOpen={setCommentsOpen} 
          comments={comments}
          commentId={postId}/>
          
                  <div className={`${styles.comments__list} ${styles.comments_visible}`}>
                  {comments.map((el) => {
                      return (
                        <div key={el.id}>
                          <h2>-{el.author.name}</h2>
                          <h3>{el.text}</h3>
                        </div>
                      )
                    })}
                  </div>
{/* comments */}
                  <p className={styles.article__price}>{currentAdd.price}</p>
                  {displayButtons&&<>
                  
                  {currentAddUserId===userId&& <div
                    // key={showButtons}
                     className={styles.button__block_edit}> 
                  <EditButton />
                  <DeleteButton postId={postId} />
                  </div> }
                  {currentAddUserId!==userId&& 
                  <PhoneButton phone={currentAdd.user.phone}/>}
                  </>}
                  <div className={`${styles.article__author} ${styles.author}`}>
                    <div className={styles.author__img}>
                      <Link to='/seller'>
                      <img className={styles.seller__avatar}
                        src={
                          currentAdd.user?.avatar
                            ? `${localHost}${currentAdd.user.avatar}`
                            : `${logo}`
                        }
                        alt="author"
                      />
                      </Link>
                    </div>
                    <div className={styles.author__cont}>
                    <Link to='/seller'>
                      <p className={styles.author__name}>
                        {currentAdd.user.name}
                      </p>
                      </Link>
                      <p className={styles.author__about}>
                        {currentAdd.user.sells_from}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.main__container}>
            <h3 className={`${styles.main__title} ${styles.title}`}>
              Описание товара
            </h3>
            <div className={styles.main__content}>
              <p className={styles.main__text}>
                {currentAdd.description
                  ? currentAdd.description
                  : 'Прсто очень хорошая вещь, надо брать!'}
              </p>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  )
}
