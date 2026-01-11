import styles from './contact.module.css';
import Link from 'next/link';
import Footer from '../../footer';

export default function Contact() {
    return (
        <>
            <div className='container'>
                <div className={styles.contactWrapper}>
                    <h1 className={styles.title}>Contact</h1>
                    <a href="mailto:g_rick@naver.com" className={styles.mailLink}>
                        g_rick@naver.com
                    </a><br/><br/><br/><br/><br/><br/>
                    <Link href='/component/reincarnation' className={styles.backBtn}>설문페이지로 ➡️</Link>
                </div>
            </div>
            <Footer visible={true}/>
        </>
    );
};