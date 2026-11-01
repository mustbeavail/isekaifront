import styles from './footer.module.css';
import Link from 'next/link';

// 사이트 공통 푸터 (모든 페이지에서 같이 쓴다)
// visible=false 면 투명 처리만 하고 자리는 유지한다.
export default function Footer ({visible}) {

    return (
        <footer className={!visible ? `${styles.footer} ${styles.hidden}` : styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link href='/' className={styles.brandName}>이세계 전생 시뮬레이터</Link>
                    <p className={styles.brandDesc}>
                        간단한 설문으로 AI가 만들어 주는 나만의 이세계 전생 테스트, 환생 시뮬레이션
                    </p>
                </div>

                <nav className={styles.columns} aria-label='사이트 링크'>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>바로가기</h2>
                        <ul className={styles.links}>
                            <li><Link href='/' className={styles.link}>홈</Link></li>
                            <li><Link href='/component/reincarnation' className={styles.link}>전생하기</Link></li>
                            <li><Link href='/component/archive' className={styles.link}>이세계 아카이브</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>안내</h2>
                        <ul className={styles.links}>
                            <li><Link href='/component/about' className={styles.link}>이세계 전생 시뮬레이터에 대해</Link></li>
                            <li><Link href='/component/privacy' className={styles.link}>개인정보 처리방침</Link></li>
                            <li><Link href='/component/contact' className={styles.link}>CONTACT ME 📞</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className={styles.bottom}>
                <p className={styles.copyright}>© 이세계 전생 시뮬레이터. All rights reserved.</p>
            </div>
        </footer>
    );
}
