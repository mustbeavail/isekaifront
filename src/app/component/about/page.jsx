import styles from '../infoPage.module.css';
import Link from 'next/link';
import Footer from '../../footer';

// 서비스 소개 페이지
const FEATURES = [
    {
        title: 'AI가 쓰는 나만의 시나리오',
        text: '신청서에 적은 이름, 생일, 성별, 특기와 고른 능력을 바탕으로 Gemini AI가 새로운 몸, 시놉시스, 고유 능력을 담은 이야기를 한 편 써 줘요.',
    },
    {
        title: '5가지 장르, 매번 다른 세계',
        text: '판타지, 어반 판타지, 다크 판타지, 동양 판타지, SF 중에서 고를 수 있어요. 서브 장르가 무작위로 붙어서 같은 장르를 골라도 다른 세계가 나와요.',
    },
    {
        title: '세계관마다 다른 일러스트',
        text: '전생 결과에는 장르에 맞는 세계관 일러스트가 함께 나와요. 친근한 irasutoya 일러스트와 AI 생성 일러스트를 섞어 연출했어요.',
    },
    {
        title: '기록하고 공유하기',
        text: '내가 다녀온 세계는 "내 이전 세계"에서 다시 볼 수 있어요. 결과는 카카오톡, 페이스북, X, 라인으로 공유하거나 링크를 복사해 보낼 수 있어요.',
    },
];

const NOTES = [
    { head: '회원가입 없이 이용해요.', text: '접속하면 바로 신청서를 쓸 수 있어요.' },
    { head: '전생 기록은 브라우저에 묶여 있어요.', text: '같은 기기, 같은 브라우저에서 접속해야 "내 이전 세계"가 이어져요. 브라우저 데이터를 지우면 기록을 찾을 수 없어요.' },
    { head: '결과는 AI가 만든 이야기예요.', text: '재미로 즐기는 가상의 시나리오이고, 실제 성격이나 운세와는 관계가 없어요.' },
    { head: 'PC 화면을 추천해요.', text: '태블릿과 모바일에서도 쓸 수 있지만, 연출과 일러스트는 PC에서 가장 잘 보여요.' },
];

export default function About() {
    return (
        <>
            <main className={styles.page}>
                <div className={styles.inner}>
                    <h1 className={styles.title}>
                        서비스 소개
                        <span className={styles.titleSub}>이세계 전문 여행사 GemExpress 에 오신 것을 환영해요</span>
                    </h1>
                    <p className={styles.lead}>
                        이세계 전생 시뮬레이터는 "내가 이세계에 전생한다면 어떤 삶을 살게 될까?"라는 상상을 직접 확인해 보는 웹서비스예요.
                        트럭에 치인 당신을 쌍둥이 여신이 맞이하고, 몇 가지 질문에 답하면 새로운 세계와 운명을 알려 줘요.
                    </p>

                    <h2 className={styles.heading}>이런 걸 할 수 있어요</h2>
                    <ul className={styles.cards}>
                        {FEATURES.map(f => (
                            <li key={f.title} className={styles.card}>
                                <h3 className={styles.cardTitle}>{f.title}</h3>
                                <p className={styles.cardText}>{f.text}</p>
                            </li>
                        ))}
                    </ul>

                    <h2 className={styles.heading}>이용 전에 알아 두세요</h2>
                    <ul className={styles.list}>
                        {NOTES.map(n => (
                            <li key={n.head} className={styles.listItem}>
                                <strong>{n.head}</strong> {n.text}
                            </li>
                        ))}
                    </ul>

                    <h2 className={styles.heading}>의견을 기다려요</h2>
                    <p className={styles.text}>
                        새로운 장르나 기능 아이디어, 오류 제보는 언제든 반가워요. 문의하기 페이지의 이메일로 보내 주세요.
                    </p>

                    <div className={styles.cta}>
                        <Link href='/component/reincarnation' className={styles.ctaButton}>
                            <span className={styles.ctaGem}>GemExpress</span> 에서 전생 신청하기
                        </Link>
                        <Link href='/component/contact' className={styles.subLink}>문의하기</Link>
                    </div>
                </div>
            </main>
            <Footer visible={true}/>
        </>
    );
};
