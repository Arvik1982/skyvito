import styles from'./authorization.module.css'

export default function LoginWrapper({page}){
    return(
    <div className={styles.wrapper}>
    <div className={styles.container_enter}>
        <div className={styles.modal__block}>
            {page}
        </div>
     </div>
</div>
)
}