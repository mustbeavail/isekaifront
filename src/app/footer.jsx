'use client'
import styles from './footer.module.css';

export default function Footer ({visible}) {

    return (
        <>
            <footer className={!visible ? `${styles.footer} ${styles.hidden}` : styles.footer}>푸터입니다</footer>
        </>
    );
}