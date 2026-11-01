import Link from 'next/link';
import styles from './entrancePage.module.css';
import EntranceAnime from './entranceAnime';
import Footer from './footer';
import JsonLd from './jsonLd';
import { GENRES, STEPS } from './mainIntroData';
import { SITE_URL, SITE_NAME, WEBSITE_ID, WEBAPP_ID, buildMetadata } from '../util/seo';

const MAIN_TITLE = '이세계 전생 시뮬레이터 | 이세계 전생 테스트 · 환생 시뮬레이션';
const MAIN_DESC = '내가 이세계에 전생한다면? 간단한 설문으로 AI가 판타지, 다크 판타지, SF, 사이버펑크 등 나만의 이세계 전생 이야기를 만들어 주는 무료 이세계 전생 테스트, 환생 시뮬레이션.';

export const metadata = buildMetadata({
    absoluteTitle: MAIN_TITLE,
    description: MAIN_DESC,
    path: '/',
});

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': WEBSITE_ID,
            name: SITE_NAME,
            alternateName: ['이세계 전생 테스트', '환생 시뮬레이션'],
            url: `${SITE_URL}/`,
            inLanguage: 'ko-KR',
        },
        {
            '@type': 'WebApplication',
            '@id': WEBAPP_ID,
            name: SITE_NAME,
            url: `${SITE_URL}/component/reincarnation`,
            description: MAIN_DESC,
            applicationCategory: 'EntertainmentApplication',
            operatingSystem: 'Web',
            inLanguage: 'ko-KR',
            genre: GENRES.map(g => g.name),
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
        },
        {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            name: MAIN_TITLE,
            description: MAIN_DESC,
            url: `${SITE_URL}/`,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': WEBSITE_ID },
            about: { '@id': WEBAPP_ID },
        },
    ],
};

export default function Entrance() {
    return (
        <>
            <JsonLd data={jsonLd}/>
            <div className={`container ${styles.mainContainer}`}>
                <header className={styles.header}>
                    <nav className={styles.nav} aria-label='주요 메뉴'>
                        <Link href='/component/reincarnation' className={styles.navItem}>전생하기</Link>
                        <Link href='/component/archive' className={styles.navItem}>아카이브</Link>
                        <Link href='/component/about' className={styles.navItem}>소개</Link>
                    </nav>
                </header>
                <EntranceAnime/>
            </div>

            <section className={styles.intro}>
                <div className={styles.introInner}>
                    <h1 className={styles.introTitle}>이세계 전생 시뮬레이터 <span className={styles.introTitleSub}>나만의 이세계 전생 테스트</span></h1>
                    <p className={styles.introLead}>
                        트럭에 치이는 순간, 당신의 새로운 삶이 시작돼요.
                        <strong> 이세계 전생 시뮬레이터</strong>는 간단한 설문을 바탕으로 AI가 내가 이세계에 전생했을 때의 이야기를 만들어 주는
                        <strong> 이세계 전생 테스트</strong>예요. 어떤 몸으로 다시 태어나고, 어떤 능력을 갖고, 어떤 운명을 걷게 될지
                        <strong> 환생 시뮬레이션</strong>으로 직접 확인해 보세요.
                    </p>

                    <h2 className={styles.introHeading}>환생 시뮬레이션은 이렇게 진행돼요</h2>
                    <ol className={styles.steps}>
                        {STEPS.map((s, i) => (
                            <li key={s.title} className={styles.step}>
                                <span className={styles.stepNum}>{i + 1}</span>
                                <div>
                                    <h3 className={styles.stepTitle}>{s.title}</h3>
                                    <p className={styles.stepDesc}>{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <h2 className={styles.introHeading}>전생할 수 있는 이세계 장르</h2>
                    <p className={styles.introText}>
                        판타지부터 다크 판타지, SF까지 다섯 가지 메인 장르가 있어요.
                        장르마다 서브 장르가 무작위로 정해져서 같은 장르를 골라도 매번 다른 세계를 만날 수 있어요.
                    </p>
                    <ul className={styles.genres}>
                        {GENRES.map(g => (
                            <li key={g.name} className={styles.genre}>
                                <h3 className={styles.genreName}>{g.name}</h3>
                                <p className={styles.genreDesc}>{g.desc}</p>
                                <p className={styles.genreSubs}>
                                    <span className={styles.genreSubsLabel}>서브 장르</span>
                                    {g.subs.join(' · ')}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.introCta}>
                        <Link href='/component/reincarnation' className={styles.ctaButton}>
                            <span className={styles.ctaGem}>GemExpress</span> 에서 전생 신청하기
                        </Link>
                    </div>
                </div>
            </section>
            <Footer visible={true}/>
        </>
    );
}
