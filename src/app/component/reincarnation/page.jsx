'use client'
import styles from "./mainPage.module.css";
import { useState, useEffect, useRef } from "react";
import "./mainPage.css";
import Link from 'next/link';

const Reincarnation = () => {

    const inputDescRef = useRef(null);
    const nextButtonRef = useRef(null);
    const inputContentRef = useRef(null);
    const [nextFlag, setNextFlag] = useState(false);

    // 신청서 html 로 전환
    const next = () => {
        let inputDesc = inputDescRef.current;
        let nextButton = nextButtonRef.current;
        if(!inputDesc && !nextButton) return;
        inputDesc.classList.add(styles.fadeOut);
        nextButton.classList.add(styles.fadeOut);
        inputDesc.addEventListener('animationend', ()=>setNextFlag(true));
        const waitForRef = (ref, callback) => {
            if (ref.current) callback(ref.current);
            else requestAnimationFrame(() => waitForRef(ref, callback));
        };
        const addFadeIn = () => {
            inputContentRef.current.classList.add(styles.fadeIn);
        };
        waitForRef(inputContentRef, addFadeIn);
    }

    return (
        <>
            <div className="container">
                <div className={styles.ghostWrapper}>
                    <img className={styles.ghost} src="/ghost.png" alt="유령"/>
                </div>
                <div className={styles.clipboardWrapper}>
                    {!nextFlag ?
                        <>
                            <div ref={inputDescRef} className={styles.inputDesc}>
                                <span className={styles.inputDescItem1}>
                                    이세계 전문 여행사<br/>GemExpress에 어서오세요!
                                </span>
                                <span className={styles.inputDescItem2}>
                                    우리 여신님은 갑작스러운 전생마법에 희생당한 불운한<br/>영혼들을 위해 두번째 기회를 제공한답니다!<br/>
                                    특별한 능력이나 동료를 비롯한 각종 전생특전 혜택까지!<br/>
                                    어디론가 훌쩍 떠나고싶단 생각 해보신적 있나요?<br/>
                                    반복되는 일상이 너무 지겨우시다구요?<br/>
                                    간단한 신청서를 작성하시고 오늘 바로 전생해보세요!
                                </span>
                                <span className={styles.inputDescItem3}>
                                    *우리 여신님은 생전에 지은 업보등으로 인한 극한세계관 전생에 대하여 책임지지 않으며,<br/>
                                    단순 변심으로인한 취소 및 재전생은 어려움을 알립니다.
                                </span>
                            </div>
                            <span
                                ref={nextButtonRef}
                                className={`${styles.nextButton} ${styles.buttonItem}`}
                                onClick = {next}
                                >신청서 작성하기 ➡️</span>
                        </> : null
                    }
                    {nextFlag ?
                        <>
                            <div ref={inputContentRef}>해위잉</div>
                        </> : null
                    }
                    <div className={styles.buttons}>
                        <Link href="/component/reincarnation" className={styles.buttonItem}>🌍 다른 세계 보러가기</Link>
                        <Link href="/component/reincarnation" className={styles.buttonItem}>🕰️ 내 이전 세계 보러가기</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reincarnation;