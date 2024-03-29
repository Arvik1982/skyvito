import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { getAllAds } from '../../api'
import { setAdds } from '../../store/reducers/sliceAdds'

import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import AddCard from '../../components/AddCard/AddCard'
import Footer from '../../components/Footer/Footer'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './main.module.css'

export default function Main() {
  const searchResult = useSelector((state) => state.addsRedux.searchResult)
  const searchClick = useSelector((state) => state.addsRedux.searchButtonClick)

  const [allAds, setAllAds] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(0)
  const onPageChange = ({ selected }) => {
    setPageNumber(selected)
  }
  const coursesOnPage = 12
  const pagesVisited = pageNumber * coursesOnPage
  const displayAddsArray = allAds.slice(
    pagesVisited,
    pagesVisited + coursesOnPage,
  )
  const pageCount = Math.ceil(allAds.length / coursesOnPage)

  useEffect(() => {
    getAllAds().then((data) => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      setAllAds(data)
      dispatch(setAdds(data))
    })
  }, [])

  useEffect(() => {
    setAllAds(searchResult)
  }, [searchResult])

  return (
    <div className="main__page">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header noDisplay />
          <main className={styles.main}>
            <Search />
            <div className={styles.main__container}>
              <h2 className={styles.main__h2}>Объявления</h2>
              {!loading && allAds.length === 0 && !searchClick && (
                <h2> По запросу ничего не найдено</h2>
              )}
              {!loading && allAds.length === 0 && searchClick && (
                <h2 style={{ color: 'red' }}> По запросу ничего не найдено</h2>
              )}

              <div className={styles.main__content}>
                <div className={`${styles.content__cards} ${styles.cards}`}>
                  {
                    // allAds

                    displayAddsArray?.map((add) => {
                      return loading ? (
                        <SkeletonTheme
                          key={add.id}
                          baseColor="aliceblue"
                          highlightColor="rgb(217, 222, 226)"
                        >
                          <Skeleton className={styles.skelet} />
                        </SkeletonTheme>
                      ) : (
                        <AddCard key={add.id} add={add} />
                      )
                    })
                  }
                </div>
              </div>
              <ReactPaginate
                previousLabel="<<"
                nextLabel=">>"
                pageCount={pageCount}
                onPageChange={onPageChange}
                containerClassName={styles.paginateButtons}
                previousClassName={styles.paginatePrevButtons}
                nextClassName={styles.paginateNextButtons}
                disabledClassName={
                  pageCount <= 1 ? styles.paginateDisabled : ''
                }
                activeClassName={styles.paginateActive}
              />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
