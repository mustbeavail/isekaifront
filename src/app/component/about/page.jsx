import styles from './about.module.css';
import Link from 'next/link';
import Footer from '../../footer';

export default function Privacy() {
    return (
        <>
            <div className='container'>
                <div className={styles.aboutWrapper}>
                    <h1 className={styles.title}>이세계 전생 시뮬레이터</h1>

                    <section className={styles.description}>
                    <p>
                        <span className={styles.highlight}>'이세계 전생 시뮬레이터'</span>는 간단한 설문을 통해 
                        AI가 그려내는 당신만의 이세계 전생 시나리오를 시뮬레이션해 볼 수 있는 특별한 웹서비스입니다.
                    </p>
                    <p>
                        Gemini API를 활용하여 정교한 시나리오를 생성하며, 정감 있는 <strong>irasutoya 일러스트</strong>와 
                        화려한 <strong>AI 생성 일러스트</strong>를 결합하여 몰입감을 더했습니다.
                    </p>
                    </section>

                    <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                        <strong className={styles.featureItemHead}>5가지 메인 장르 :</strong> 판타지, 어반판타지, SF 등 당신의 취향을 저격할 장르가 준비되어 있습니다.
                    </li>
                    <li className={styles.featureItem}>
                        <strong className={styles.featureItemHead}>다양한 서브 장르 :</strong> 각 장르에 랜덤으로 할당될 다양한 서브장르를 통해 5가지 장르를 넘어선 가능성을 탐험하세요.
                    </li>
                    <li className={styles.featureItem}>
                        <strong className={styles.featureItemHead}>맞춤 일러스트 :</strong> 당신의 결과에 딱 맞는 아름다운 세계관 이미지를 감상하실 수 있습니다.
                    </li>
                    </ul>

                    <p className={styles.description}>
                    태블릿과 모바일 환경을 지원하지만, 
                    <span className={styles.highlight}> PC 환경</span>에서 이용하실 때 가장 풍부하고 만족스러운 시각적 경험을 하실 수 있습니다.
                    </p>

                    <p className={styles.description}>
                    당신의 새로운 삶은 어떤 모습일까요? 관심 갖고 즐겨주셔서 진심으로 감사합니다!
                    </p>

                    <div className={styles.footerActions}>
                    </div>
                    <Link href='/component/reincarnation' className={styles.backBtn}>설문페이지로 ➡️</Link>
                </div>
            </div>
            <Footer visible={true}/>
        </>
    );
};