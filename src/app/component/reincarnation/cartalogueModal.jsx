import { useState } from 'react';
import styles from './catalModal.module.css';

export default function CatalModal({ visible, onClose, onSend }) {
    const topics = [
        {
            id: 1,
            title: '판타지',
            description: '마법과 전설, 신화가 살아 숨 쉬는 세계입니다. 사악한 마왕을 무찌르는 용사가 될 수도 있고, 어쩌면 마왕 그 자체가 될 수도 있겠죠. 예상치 못한 신비한 생물로 전생할지도 모르고, 던전을 공략하며 던전 식재료로 요리를 하게 될 수도 있고, 던전에서 운명적인 만남을 추구하게 될지도 모릅니다. 그리고 이 세계에서는, 이미 세상을 떠난 동료를 기리며 다시 만나기 위한 여행조차 가능하답니다.',
        },
        {
            id: 2,
            title: '어반 판타지',
            description: '당신이 살아왔던 현대 도시와 마법, 그리고 초현실이 공존하는 세계입니다. 익숙하면서도 현대 문물 속에 스며든 비일상적인 존재들 덕분에, 당신이 살게 될 도시는 결코 지루할 틈이 없을 거예요. 도시를 위협하는 빌런들과 맞설 수도 있고, 현실이 되어버린 괴담과 오컬트에 휘말릴 수도 있으며, 어쩌다 보니 소원을 들어주는 정체불명의 컵 하나를 두고 마술사들과 전쟁을 벌이게 될지도 모르죠.',
        },
        {
            id: 3,
            title: '다크 판타지',
            description: '마법이 존재하지만 어둡고 잔혹한 세계입니다. 여행지로 선호될 만한 곳은 아니지만, 몇 가지 축복을 안고 태어날 당신에게 이 세계는 그리 가혹하지만은 않을지도 모릅니다. 세상에 들끓는 흡혈귀와 악마들을 처단하며 도덕적 갈등 속에서 정의와 질서를 관철하세요. 어쩌면, 당신이 새로운 질서 그 자체가 될 수도 있겠죠.',
        },
        {
            id: 4,
            title: '동양 판타지',
            description: '요괴와 혼령, 신선들이 존재하는 동양 신화의 세계입니다. 이 신비로운 세계에서 당신은 전국을 돌며 요괴들을 해치워 산산조각 난 구슬 조각을 모으거나, 혈귀가 돼버린 동생을 인간으로 되돌리거나, 암행어사나 마을 이장이 돼볼 수도 있겠죠.',
        },
        {
            id: 5,
            title: 'SF',
            description: '엄청나게 진보된 과학의 세계입니다. 행성과 행성 간, 은하와 은하 간의 외교와 전쟁에 휘말리거나, 거대 기업이 지배하는 도시에서 최첨단 사이버웨어로 해결사가 될 수도 있죠. 혹은 거대 로봇을 타고 거대 괴수와 싸우던가 하늘을 뚫어버리는 것도 당신만이 할 수 있는 일이에요. 설령 대충 망해버린 세상이어도 걱정마세요. 당신이라면 좀비든 핵전쟁이든 문제없을 거에요.',
        },
        {
            id: 6,
            title: '상관 없음',
            description: '결과의 무작위성은 재미를 더 해주죠. 새로운 당신의 운명은 현재의 당신의 운명에 달렸어요.',
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