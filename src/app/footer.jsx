'use client'
import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer ({visible}) {

    return (
        <>
            <footer className={!visible ? `${styles.footer} ${styles.hidden}` : styles.footer}>
                <div className={styles.contentWrapper}>
                    <Link href='/component/about' className={styles.subject}>이세계 전생 시뮬레이터에 대해</Link>
                    <span className={styles.bar}>||</span>
                    <Link href='/component/privacy' className={styles.subject}>개인정보 처리방침</Link>
                    <span className={styles.bar}>||</span>
                    <Link href='/component/contact' className={styles.subject}>CONTACT ME 📞</Link>
                </div>
            </footer>
        </>
    );
}