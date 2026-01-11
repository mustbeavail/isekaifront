'use client'
import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer ({visible}) {

    return (
        <>
            <footer className={!visible ? `${styles.footer} ${styles.hidden}` : styles.footer}>
                <Link href='/component/about'>이세계 전생 시뮬레이터에 대해</Link>
                <span> |</span>
                <Link href='/component/privacy'> 개인정보 처리방침</Link>
                <span> |</span>
                <Link href='/component/contact'> contact</Link>
            </footer>
        </>
    );
}