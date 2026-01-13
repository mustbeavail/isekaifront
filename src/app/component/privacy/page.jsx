import styles from './privacy.module.css';
import Link from 'next/link';
import Footer from '../../footer';

export default function Privacy() {
    return (
        <>
            <div className='container'>
                <div className={styles.privacyWrapper}>
                    <Link href='/component/reincarnation' className={styles.backBtn}>설문페이지로 ➡️</Link>
                    <h1 className={styles.title}>개인정보처리방침</h1>

                    <p className={styles.text}>
                    <strong>[이세계 전생 시뮬레이터]</strong>(이하 '본 서비스')은 별도의 회원가입 절차 없이 콘텐츠를 제공하며, 방문자의 개인정보를 직접 수집하거나 저장하지 않습니다. 다만, 서비스 운영 및 수익 창출을 위한 구글 광고 서비스 이용에 따라 다음과 같은 안내 사항을 고지합니다.
                    </p>

                    <h2 className={styles.sectionTitle}>1. 개인정보의 수집 및 이용 (Google AdSense)</h2>
                    <p className={styles.text}>
                    본 서비스는 <strong>Google AdSense</strong> 광고를 게재합니다. 이 과정에서 구글은 사용자의 브라우저에 쿠키를 저장하거나 읽을 수 있습니다.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>구글은 쿠키를 사용하여 사용자의 과거 방문 기록을 기반으로 최적화된 맞춤형 광고를 제공합니다.</li>
                        <li className={styles.listItem}>사용자의 활동 데이터는 비식별화된 상태로 구글 광고 시스템에 전송될 수 있습니다.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>2. 쿠키 사용 거부 방법</h2>
                    <p className={styles.text}>
                    방문자는 본인의 선택에 따라 맞춤형 광고 수신을 거부할 수 있습니다.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className={styles.link}>
                            Google 광고 설정
                            </a> 페이지에서 맞춤형 광고를 해제할 수 있습니다.
                        </li>
                        <li className={styles.listItem}>브라우저 설정을 통해 쿠키 저장을 차단할 수 있으나, 이 경우 일부 웹 기능 이용에 제한이 생길 수 있습니다.</li>
                    </ul>

                    <h2 className={styles.sectionTitle}>3. 제3자 제공 및 정책 준수</h2>
                    <p className={styles.text}>
                    본 서비스는 직접적인 개인 식별 정보를 보유하지 않으므로 제3자에게 개인정보를 제공하지 않습니다. 구글 측에서 수집하는 데이터에 관한 상세 내용은 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={styles.link}> Google 개인정보 보호 및 약관</a>을 확인하시기 바랍니다.
                    </p>

                    <h2 className={styles.sectionTitle}>4. 관리 책임자</h2>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>담당자: [이관형]</li>
                        <li className={styles.listItem}>이메일: [g_rick@naver.com]</li>
                    </ul>

                    <div className={styles.footerInfo}>
                        <p>공고일자: 2026년 1월 14일</p>
                        <p>시행일자: 2026년 1월 14일</p>
                    </div>
                </div>
            </div>
            <Footer visible={true}/>
        </>
    );
};