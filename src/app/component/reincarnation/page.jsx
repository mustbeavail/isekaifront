'use client'
import styles from "./mainPage.module.css";
import { useState, useEffect, useRef } from "react";
import "./mainPage.css";
import Link from 'next/link';
import CatalModal from './cartalogueModal';

const Reincarnation = () => {

    const inputDescRef = useRef(null);
    const nextButtonRef = useRef(null);
    const inputContentRef = useRef(null);
    const [nextFlag, setNextFlag] = useState(false);
    const [catalModalVisible, setCatalModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [birth, setBirth] = useState(null);
    const [gender, setGender] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [desiredSekai, setDesiredSekai] = useState('');
    const [wishedAbil, setWishedAbil] = useState('');
    const [wishedGift, setWishedGift] = useState('');

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

    useEffect(()=>{
        console.log(userName);
        console.log(birth);
        console.log(gender);
        console.log(specialty);
        console.log(desiredSekai);
        console.log(wishedAbil);
        console.log(wishedGift);
    },[userName, birth, gender, specialty, desiredSekai, wishedAbil, wishedGift]);

    return (
        <>
            <div className="container">
                <CatalModal visible={catalModalVisible} onClose={() => setCatalModalVisible(false)} />
                <div className={styles.ghostWrapper}>
                    <img className={styles.ghost} src="/ghost.png" alt="유령"/>
                </div>
                <div className={styles.clipboardWrapper}>
                    {!nextFlag ?
                        <>
                            <div ref={inputDescRef} className={styles.inputWrapper}>
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
                            <div ref={inputContentRef} className={`${styles.inputWrapper} ${styles.inputCommon}`}>
                                <span className={styles.inputItem} onChange={(e)=>setUserName(e.target.value)}>
                                    ① 이름 : <input type='text' className={styles.inputBox}/></span>
                                <span className={styles.inputItem}>
                                    ② 생년월일 : <input type='date' className={styles.dateBox} onChange={(e)=>setBirth(e.target.value)}/></span>
                                <span className={styles.inputItem}>③ 성별 : 
                                    <label className={styles.genderBox}>
                                        <input type='radio' name="gender" value="남자" onChange={(e)=>setGender(e.target.value)}/>남자</label>
                                    <label className={styles.genderBox}>
                                        <input type='radio' name="gender" value="여자" onChange={(e)=>setGender(e.target.value)}/>여자</label>
                                </span>
                                <span className={styles.inputItem}>④ 희망 여행지 : 
                                    <span className={styles.selectButton} onClick={() => setCatalModalVisible(true)}>둘러보기</span></span>
                                <span className={styles.inputItemOneRow}>
                                    ⑤ 직업 혹은 취미, 특기 : <input type='text' className={styles.inputBox} onChange={(e)=>setSpecialty(e.target.value)}/></span>
                                <div className={styles.isekaiSpecialWrapper}>
                                    <span className={`${styles.specialHead} ${styles.specialAbilHead}`}>⑥ 치트 능력치💪</span>
                                    <span className={styles.specialAbilOption}>·명석한 두뇌<br/>
                                        <span className={styles.specialAnno}> 머리가 안좋으면 몸이 고생한다</span>
                                    </span>
                                    <span className={styles.specialAbilOption}>·강인한 신체<br/>
                                        <span className={styles.specialAnno}> 몸이 안좋으면 머리가 고생한다</span>
                                    </span>
                                    <span className={styles.specialAbilOption}>·치명적 매력<br/>
                                        <span className={styles.specialAnno}> 알파의 삶을 살아보자</span>
                                    </span>
                                    <span className={styles.specialAbilOption}>·압도적인 운<br/>
                                        <span className={styles.specialAnno}> 압도적인 운 앞에 모든 것은 무의미</span>
                                    </span>
                                </div>
                                <div className={styles.isekaiSpecialWrapper}>
                                    <span className={`${styles.specialHead} ${styles.specialGiftHead}`}>⑦ 여신의 선물🎁</span>
                                    <span className={styles.specialGiftOption}>·막대한 재력<br/>
                                        <span className={styles.specialAnno}> 어떤 세계에도 통용되는 제1가치</span>
                                    </span>
                                    <span className={styles.specialGiftOption}>·영혼의 파트너<br/>
                                        <span className={styles.specialAnno}> 가장 어두운 때에도 혼자가 아니야</span>
                                    </span>
                                    <span className={styles.specialGiftOption}>·특별한 장비<br/>
                                        <span className={styles.specialAnno}> 장인이 아니면 도구탓을 하자</span>
                                    </span>
                                </div>
                                <div className={`${styles.buttonItem} ${styles.submitButton}`}>제출하기</div>
                            </div>
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