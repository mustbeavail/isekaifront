'use client'
import styles from "./mainPage.module.css";
import "./mainPage.css";

const Reincarnation = () => {


    return (
        <>
            <div className="container">
                <div className={styles.ghostWrapper}>
                    <span className={styles.phraseCommon}>안녕하세요</span>
                    <img className={styles.ghost} src="/ghost.png" alt="유령"/>
                </div>
                <div className={styles.clipboardWrapper}>
                    <div className={styles.inputContent}>
                        <input type="text"></input>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reincarnation;