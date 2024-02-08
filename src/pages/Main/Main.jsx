import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


import { getAllAds } from '../../api'
import { setAdds } from '../../store/reducers/sliceAdds'

import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import AddCard from '../../components/AddCard/AddCard'
import Footer from '../../components/Footer/Footer'

import styles from './main.module.css'


export default function Main() {
  const [allAds, setAllAds] = useState([])
  const dispatch =useDispatch()

  useEffect(() => {
    getAllAds().then((data) => {
      setAllAds(data);
      dispatch(setAdds(data))
    })
  }, [])
  return (
    <div className="main__page">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header noDisplay/>
          <main className={styles.main}>
            <Search />
            <div className={styles.main__container}>
              <h2 className={styles.main__h2}>Объявления</h2>

              <div className={styles.main__content}>
                <div className={`${styles.content__cards} ${styles.cards}`}>
                  {allAds.map((add) => {
                    return <AddCard key={add.id} add={add} />
                  })}
                </div>
              </div>
            </div>
          </main>
            <Footer/>
          </div>
      </div>
    </div>
  )
}