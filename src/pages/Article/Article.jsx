import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { localHost } from '../../vars/vars'
import styles from './article.module.css'
import logo from '../../img/logo.png'
import Header from '../../components/Header/Header'
import dataFormat from '../../functions/dataformat'
import {
  getAllAds,
  getCurrentComment,
  getUserByToken,
  refreshTokens,
} from '../../api'
import Footer from '../../components/Footer/Footer'
import ToMainButton from '../../components/ToMainButton/ToMainButton'
import PhoneButton from '../../components/PhoneButton/PhoneButton'
import EditButton from '../../components/EditDellButtons/EditBtn'
import DeleteButton from '../../components/EditDellButtons/DeleteBtn'
import { setUserData } from '../../store/reducers/sliceReg'
import Comments from '../../modal/Comments/Comments'
import LogoSky from '../../components/Logo/Logo'
import {
  setAdds,
  setDataChanged,
  setNoMainImg,
} from '../../store/reducers/sliceAdds'

export default function Article() {
  const dispatch = useDispatch()
  const currentAddLocal = JSON.parse(localStorage.getItem('currentAdd')) // actual
  const userId = Number(localStorage.getItem('userUID')) // user before actual

  const articleId = useParams().id

  const userAssessTokenRedux = useSelector(
    (state) => state.authRedux.access_token,
  )
  const userRefreshTokenRedux = useSelector(
    (state) => state.authRedux.access_refresh,
  )
  const deleted = useSelector((state) => state.addsRedux.imgDeleted)
  const dataChanged = useSelector((state) => state.addsRedux.dataChanged)

  const currentAdd = currentAddLocal

  const [displayButtons, setDisplayButtons] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsOpen, setCommentsOpen] = useState(false)

  const noMainImg = useSelector((state) => state.addsRedux.noMainImg)

  const [mainImg, setMainImg] = useState(
    currentAdd.images[0]?.url
      ? `${localHost}${currentAdd.images[0]?.url} `
      : `${logo}`,
  )

  const currentAddUserId = currentAdd.user.id
  const postId = currentAdd.id
  const token = localStorage.getItem('user_token')

  useEffect(() => {
    noMainImg && currentAdd.images.length !== 0
      ? setMainImg(`${logo}`)
      : setMainImg(
          currentAdd.images.length !== 0
            ? `${localHost}${currentAdd.images[0].url}`
            : currentAdd.images[1]?.url
              ? `${localHost}${currentAdd.images[1]?.url}`
              : `${logo}`,
        )

    getAllAds().then((data) => {
      dispatch(setAdds(data))
      dispatch(setNoMainImg(false))
    })
  }, [dataChanged])

  useEffect(() => {
    !userId || !currentAddUserId ? setDisplayButtons(true) : ''
    if (userAssessTokenRedux || token) {
      refreshTokens(userAssessTokenRedux, userRefreshTokenRedux)
        .catch((err) => {
          console.log(err)
        })
        .then((tokens) => {
          getUserByToken(tokens.access_token)
            .then((data) => {
              dispatch(setUserData(data))
              setDisplayButtons(true)
            })
            .catch((err) => {
              console.log(err)
            })
        })
    }

    getCurrentComment(currentAdd.id)
      .then((data) => {
        let dataArray = []
        dataArray = data
        setComments(dataArray)
        dispatch(setDataChanged(dataChanged ? false : true))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [deleted])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header postId={postId} noDisplay={false} articleId={articleId} />

        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={`${styles.main__menu} ${styles.menu}`}>
              <LogoSky />
              <form className={styles.menu__form} action="#">
                <ToMainButton />
              </form>
            </div>
          </div>

          <div className={`${styles.main__artic} ${styles.artic}`}>
            <div className={`${styles.artic__content} ${styles.article}`}>
              <div className={styles.article__left}>
                <div className={styles.article__fill_img}>
                  <div className={styles.article__img}>
                    <img key={dataChanged} src={mainImg} alt="element" />
                  </div>
                  <div className={styles.article__img_bar}>
                    {currentAdd.images.map((el) => {
                      return (
                        <div
                          onClick={() =>
                            setMainImg(
                              el?.url ? `${localHost}${el?.url}` : `${logo}`,
                            )
                          }
                          key={Math.round(Math.random() * 1000000)}
                          className={styles.article__img_bar_div}
                        >
                          <img
                            className={`${styles.img__line}`}
                            key={Math.round(Math.random() * 100000000)}
                            src={el.url ? `${localHost}${el?.url}` : `${logo}`}
                            alt="element"
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div
                    key={Math.round(Math.random() * 10000000)}
                    className={`${styles.article__img_bar_mob}`}
                  >
                    {currentAdd.images.map((el) => {
                      return (
                        <div
                          key={Math.round(Math.random() * 10000000)}
                          className={`${styles.img_bar_mob__circle} ${styles.circle_active}`}
                        >
                          <img
                            key={Math.round(Math.random() * 1000000000)}
                            className={` ${styles.img_bar_mob__circle}`}
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
                    Название: {currentAdd.title}
                  </h3>
                  <div className={styles.article__info}>
                    <p className={styles.article__date}>
                      {dataFormat(currentAdd.created_on)}
                    </p>
                    <p className={styles.article__city}>
                      {currentAdd.user.city}
                    </p>
                    <br />
                    <label>Комментарии:</label>
                    <span
                      style={{
                        cursor: 'pointer',
                        color: '#0080C1',
                        textDecoration: 'underline',
                      }}
                      onClick={() => {
                        setCommentsOpen(true)
                      }}
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
                    commentId={postId}
                  />
                  {/* comments */}
                  <p className={styles.article__price}>
                    {currentAdd.price} руб.
                  </p>

                  {currentAddUserId === userId && (
                    <div className={styles.button__block_edit}>
                      {!displayButtons ? (
                        <SkeletonTheme
                          baseColor="aliceblue"
                          highlightColor="rgb(217, 222, 226)"
                        >
                          <Skeleton className={styles.skelet_edit} />
                        </SkeletonTheme>
                      ) : (
                        <EditButton />
                      )}

                      {!displayButtons ? (
                        <SkeletonTheme
                          baseColor="aliceblue"
                          highlightColor="rgb(217, 222, 226)"
                        >
                          <Skeleton className={styles.skelet_delete} />
                        </SkeletonTheme>
                      ) : (
                        <DeleteButton postId={postId} />
                      )}
                    </div>
                  )}

                  {currentAddUserId !== userId && (
                    <PhoneButton phone={currentAdd.user.phone} />
                  )}

                  <div className={`${styles.article__author} ${styles.author}`}>
                    <div className={styles.author__img}>
                      <Link to={`/seller/${currentAdd.user.id}`}>
                        <img
                          className={styles.seller__avatar}
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
                      <Link to={`/seller/${currentAdd.user.id}`}>
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
        <Footer />
      </div>
    </div>
  )
}
