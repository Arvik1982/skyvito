import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './search.module.css'

import {
  setSearchButtonClick,
  setSearchData,
} from '../../store/reducers/sliceAdds'
import LogoSky from '../Logo/Logo'

export default function Search() {
  const searchInput = useSelector((state) => state.addsRedux.searchString)
  const dispatch = useDispatch()
  const [placeHolder, setPlaceHolder] = useState('Поиск по объявлениям')

  useEffect(() => {
    dispatch(setSearchButtonClick(false))
  }, [searchInput])

  return (
    <div className={`${styles.main__search} ${styles.search}`}>
      <LogoSky />

      <form className={styles.search__form} action="#">
        <input
          value={searchInput}
          onChange={(event) => {
            dispatch(setSearchData(event.target.value))
          }}
          className={styles.search__text}
          type="search"
          placeholder={placeHolder}
          name="search"
        />

        <input
          className={styles.search__text_mob}
          type="search"
          placeholder="Поиск"
          name="search-mob"
        />

        <button
          onClick={() => {
            searchInput
              ? dispatch(setSearchData(searchInput))
              : setPlaceHolder('Введите поисковый запрос')
            dispatch(setSearchButtonClick(true))
          }}
          type="button"
          className={`${styles.search__btn} ${styles.btn_hov02}`}
        >
          Найти
        </button>
      </form>
    </div>
  )
}
