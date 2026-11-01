import styles from '../infoPage.module.css';
import Link from 'next/link';
import Footer from '../../footer';

// 문의 페이지
export default function Contact() {
    return (
        <>
            <main className={styles.page}>
                <div className={styles.inner}>
                    <h1 className={styles.title}>문의하기</h1>
                    <p className={styles.lead}>
                        이용하면서 불편했던 점, 오류 제보, 새로운 장르나 기능 제안 등 무엇이든 편하게 보내 주세요.
                        보내 주신 의견은 서비스를 고치고 다듬는 데 쓸게요.
                    </p>

                    <div className={styles.mailCard}>
                        <p className={styles.mailLabel}>이메일</p>
                        <a href="mailto:g_rick@naver.com" className={styles.mailLink}>g_rick@naver.com</a>
                    </div>

                    <h2 className={styles.heading}>오류를 제보할 때는</h2>
                    <p className={styles.text}>
                        사용한 기기와 브라우저, 어떤 화면에서 무엇을 하다가 문제가 생겼는지 함께 적어 주시면 더 빨리 확인할 수 있어요.
                        화면 캡처가 있으면 더 좋아요.
                    </p>

                    <div className={styles.cta}>
                        <Link href='/component/reincarnation' className={styles.ctaButton}>
                            <span className={styles.ctaGem}>GemExpress</span> 에서 전생 신청하기
                        </Link>
                        <Link href='/component/about' className={styles.subLink}>서비스 소개</Link>
                    </div>
                </div>
            </main>
            <Footer visible={true}/>
        </>
    );
};
