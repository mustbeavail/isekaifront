import { useState } from 'react';
import styles from './mainPage.module.css';

export default function CatalModal({ visible, onClose, onSend }) {
    const topics = [
        {
            id: 1,
            title: '판타지',
            description: '마법과 전설, 신화의 세계에요. 사악한 마왕을 무찌르는 용사가 된다거나, 어쩌면 마왕이 된다거나, 그것도 아니면 예상치 못한 신비한 생물로 환생한다거나, 던전을 공략하면서 요리를 해볼 수도, 혹은 어떤 만남이 있을 수도 있겠죠. 오래전에 세상을 떠난 동료를 만나러 여행을 떠나는 것도 이 세계에선 가능하답니다.',
        },
        {
            id: 2,
            title: '어반 판타지',
            description: '당신이 살아왔던 현대 도시와 마법, 초현실이 공존하는 세계에요. 당신이 살게될 도시는 익숙하면서도 현대 문물에 스며든 비일상적 존재들 덕에 지루할 틈이 없을 거에요. 도시를 위협하는 빌런들과 맞설 수도, 현실이 된 괴담과 오컬트에 휘말릴 수도, 왠 컵을 놓고 마술사들과 전쟁을 할수도 있겠죠.',
        },
        {
            id: 3,
            title: '다크 판타지',
            description: '마법의 세계지만 어둡고 잔혹한 세계에요. 여행지로 선호되는 곳은 아니지만 몇가지 축복을 안고 태어날 당신에게는 그렇게 가혹하지만은 않을거에요. 세계에 들끓는 흡혈귀와 악마들을 해치우고 도덕적으로 갈등하며 세상의 정의와 질서를 관철하세요. 어쩌면 당신이 새로운 질서가 될 수도 있겠죠.',
        },
        {
            id: 4,
            title: '동양 판타지',
            description: '요괴와 혼령, 신선들이 존재하는 동양 신화의 세계에요. 이 신비로운 세계에서 당신은 전국을 돌며 요괴들을 해치워 산산조각난 구슬조각을 모으거나, 요괴가 돼버린 동생을 인간으로 되돌리거나, 수천년간 공백이었던 하늘에 서보는 것도, 암행어사나 마을이장이 돼보는 것도 좋겠죠.',
        },
        {
            id: 5,
            title: 'SF',
            description: '엄청나게 진보된 과학의 세계에요. 행성과 행성간, 은하와 은하간의 외교와 전쟁에 휘말리거나, 거대기업이 지배하는 도시에서 최첨단 의수로 해결사가 될수도 있죠. 혹은 거대로봇을 타고 거대괴수와 싸우던가 하늘을 뚫어버리는 것도 당신만이 할 수 있는 일이에요. 설령 대충 망해버린 세상이어도 걱정마세요. 당신이라면 좀비든 핵전쟁이든 문제 없을 거에요.',
        },
        {
            id: 6,
            title: '상관 없음',
            description: '결과의 무작위성은 재미를 더 해주죠. 당신의 새로운 운명은 당신의 지금 운명에 달렸어요.',
        }
    ];

    const [selectedTopic, setSelectedTopic] = useState(null);

    if (!visible) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
            >
                <button className={styles.closeBtn} onClick={()=>{onClose(); setSelectedTopic(null);}} aria-label="Close modal">
                    &times;
                </button>

                {!selectedTopic && (
                    <>
                        <h2 className={styles.title}>원하는 세계를 선택하세요</h2>
                        <ul className={styles.topicList}>
                            {topics.map(topic => (
                                <li key={topic.id}>
                                    <button
                                        className={styles.topicBtn}
                                        onClick={() => setSelectedTopic(topic)}
                                        type="button"
                                    >
                                        {topic.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {selectedTopic && (
                    <>
                        <h2 id="modalTitle" className={styles.title}>{selectedTopic.title}</h2>
                        <p className={styles.description}>{selectedTopic.description}</p>
                        <button
                            className={styles.backBtn}
                            onClick={() => setSelectedTopic(null)}
                            type="button"
                        >
                            ← 뒤로 가기
                        </button>
                        <button
                            className={`${styles.backBtn} ${styles.selBtn}`}
                            onClick={() => {onSend(selectedTopic.title.replace(/\s+/g, ""), onClose()); setSelectedTopic(null)}}
                            type="button"
                        >
                            선택 하기
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}