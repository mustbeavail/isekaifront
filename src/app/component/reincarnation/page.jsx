'use client'
import styles from "./mainPage.module.css"

const Reincarnation = () => {
    return (
        <>
            <div className="container">
                <img className="ghost" src="/ghost.png"/>
                <div className={styles.clipboard}>
                    <input type="text"></input>
                </div>
            </div>
        </>
    )
}

export default Reincarnation;