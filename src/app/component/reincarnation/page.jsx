'use client'
import styles from "./mainPage.module.css";
import { useState, useEffect, useRef } from "react";
import "./mainPage.css";
import Link from 'next/link';
import CatalModal from './cartalogueModal';
import { useSelector } from "react-redux";
import axios from "axios";

const Reincarnation = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const inputDescRef = useRef(null);
    const nextButtonRef = useRef(null);
    const inputContentRef = useRef(null);
    const callbackPhraseRef1 = useRef(null);
    const callbackPhraseRef2 = useRef(null);
    const callbackPhraseRef3 = useRef(null);
    const truckRef = useRef(null);
    const ghostWrapperRef = useRef(null);
    const ghostRef = useRef(null);
    const [nextFlag, setNextFlag] = useState(false);
    const [catalModalVisible, setCatalModalVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [birth, setBirth] = useState(null);
    const [gender, setGender] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [preferredIsekai, setPreferredIsekai] = useState('');
    const [wishedAbil, setWishedAbil] = useState('');
    const [wishedGift, setWishedGift] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [callbackAnime, setCallbackAnime] = useState(false);
    const [animeEnd, setAnimeEnd] = useState(false);
    const [resDone, setResDone] = useState('idle');
    const [loadingPhrase, setLoadingPhrase] = useState('');
    let guestId = useSelector(state => state.guest.guestId);
    let isFirst = useSelector(state => state.guest.isFirst);

    // ref 기다리기
    const waitForRef = (ref, callback, resolve) => {
        if (ref.current) {
            callback(ref.current);
            if(resolve){
                resolve();
            }}
        else requestAnimationFrame(() => waitForRef(ref, callback));
    };

    // 페이드인 추가
    const addFadeIn = (ref) => {
        ref.classList.add(styles.fadeIn);
    };

    // 딜레이 페이드인 추가
    const addFadeInDelay = (ref) => {
        ref.classList.add(styles.fadeInDelay);
    };

    // 신청서 html 로 전환
    const next = () => {
        let inputDesc = inputDescRef.current;
        let nextButton = nextButtonRef.current;
        if(!inputDesc && !nextButton) return;
        inputDesc.classList.add(styles.fadeOut);
        nextButton.classList.add(styles.fadeOut);
        inputDesc.addEventListener('animationend', ()=>setNextFlag(true));
        waitForRef(inputContentRef, addFadeIn);
    }

    const firstCallbackAnime = () => {
        return new Promise(resolve => {
            waitForRef(callbackPhraseRef1, addFadeInDelay, resolve);
        });
    };
    const secondCallbackAnime = () => {
        return new Promise(resolve => {
            callbackPhraseRef1.current.addEventListener('animationend', ()=>waitForRef(callbackPhraseRef2, addFadeInDelay));
            callbackPhraseRef2.current.addEventListener('animationend', ()=>{truckRef.current.classList.add(styles.driving);});
            truckRef.current.addEventListener('animationend',
                ()=>{
                    ghostWrapperRef.current.classList.add(styles.flying);
                    ghostRef.current.classList.add(styles.spinning);
                    ghostWrapperRef.current.addEventListener('animationend', ()=>waitForRef(callbackPhraseRef3, addFadeIn));});
            callbackPhraseRef3.current.addEventListener('animationend', ()=>setTimeout(()=>setAnimeEnd(true), 2500))
            resolve()
        });
    };

    const callbackAnimeSeq = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await firstCallbackAnime();
        await secondCallbackAnime();
    };

    const randomLoadingPhrase = async () => {
        let idx = -1
        const loadingPhrases1 = ['로딩중', '로딩중.', '로딩중..', '로딩중...'];
        const loadingPhrases2 = ['이세계물 시청중', '이세계물 시청중.', '이세계물 시청중..', '이세계물 시청중...'];
        const loadingPhrases3 = ['멋있는 대사 생각중', '멋있는 대사 생각중.', '멋있는 대사 생각중..', '멋있는 대사 생각중...'];
        const loadingPhrases4 = ['운명 수정중', '운명 수정중.', '운명 수정중..', '운명 수정중...'];
        const loadingPhrases5 = ['고난과 억까 만드는중', '고난과 억까 만드는중.', '고난과 억까 만드는중..', '고난과 억까 만드는중...',];
        const loadingPhrases6 = ['행복한 한 때 생성중', '행복한 한 때 생성중.', '행복한 한 때 생성중..', '행복한 한 때 생성중...',];
        const wholeLoadingPhrases = [loadingPhrases1, loadingPhrases2, loadingPhrases3, loadingPhrases4, loadingPhrases5, loadingPhrases6];
        const getRandom = (arr) => {
            const idx = Math.floor(Math.random() * arr.length);
            return arr[idx];
        }

        for (;;) {
            let phrases = getRandom(wholeLoadingPhrases);
            for (let index = 0; index < phrases.length; index++) {
                setLoadingPhrase(phrases[index]);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    };

    // 시뮬레이션 실행
    const runSim = async () => {

        let finalPreferred = preferredIsekai;

        if(!guestId){
            alert('유저 식별불가, 다시 시도해주세요.');
            location.href='/';
            return;
        } else if (!userName) {
            alert('이름을 입력해주세요.');
            return;
        } else if (!birth) {
            alert('생년월일을 입력해주세요.');
            return;
        } else if (!gender) {
            alert('성별을 선택해주세요.');
            return;
        } else if (!specialty) {
            alert('직업 혹은 취미, 특기를 입력해주세요.');
            return;
        } else if (!wishedAbil) {
            alert('치트 능력치를 선택해주세요.');
            return;
        } else if (!wishedGift) {
            alert('여신의 선물을 선택해주세요.');
            return;
        } else if (!finalPreferred) {
            if(confirm('희망 여행지 미선택시 무작위 이세계로 정해집니다. 무작위로 진행하시겠습니까?')){
                finalPreferred ='상관없음';
                setPreferredIsekai('상관없음');
            }else{
                return;
            }
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        setCallbackAnime(true);
        callbackAnimeSeq();
        setResDone('start');
        try{
            const {data} = await axios.post(`${API_URL}/reincarnation`, {guestId, userName, birth, gender, specialty, wishedAbil, wishedGift, finalPreferred});
            console.log(data);
            setResDone('done');
        }catch(err){
            alert(err.response.data.message);
            location.href='/component/reincarnation';
        };
    };

    // 오버플로우 끄기
    useEffect(()=>{

        if(!guestId) return;

        document.body.style.overflowX = 'hidden';

        return () => {
            document.body.style.overflowX = '';
        }
    },[guestId]);

    // 로딩문구 띄우기
    useEffect(()=>{
        if(resDone !== 'start') return;
        else randomLoadingPhrase();
    },[resDone]);

    return (
        <div className={animeEnd ? styles.lightOut : ''}>
            <div className="container">
                {!animeEnd ?
                    <>
                        <CatalModal visible={catalModalVisible} onClose={() => setCatalModalVisible(false)} onSend={(value)=>setPreferredIsekai(value)}/>
                        <div ref={ghostWrapperRef} className={styles.ghostWrapper}>
                            <img ref={ghostRef} className={styles.ghost} src="/ghost.png" alt="유령"/>
                        </div>
                        <div ref={truckRef} className={styles.truckWrapper}>
                            <img className={styles.truck} src="/truck.png" alt="트럭"/>
                        </div>
                        {!callbackAnime ? null :
                            <div className={styles.callbackPhraseWrapper}>
                                <span ref={callbackPhraseRef1} className={styles.callbackPhrase}>이번생에 고생 참 많으셨어요</span>
                                <span ref={callbackPhraseRef2} className={styles.callbackPhrase}>잠시만 서계시면 여신님의 마법으로 새로운 세계로 가게되실거에요</span>
                                <span ref={callbackPhraseRef3} className={styles.callbackPhrase}>새로운 운명에 축복 가득하시길 기원해요</span>
                            </div>    
                        }
                        <div className={!callbackAnime ? styles.clipboardWrapper : `${styles.clipboardWrapper} ${styles.callbackAnime}`}>
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
                                            ② 생년월일 : <input type='date' max={today} className={styles.dateBox} onChange={(e)=>setBirth(e.target.value)}/></span>
                                        <span className={styles.inputItem}>③ 성별 : 
                                            <label className={styles.genderBox}>
                                                <input type='radio' name="gender" value="남자" onChange={(e)=>setGender(e.target.value)}/>남자</label>
                                            <label className={styles.genderBox}>
                                                <input type='radio' name="gender" value="여자" onChange={(e)=>setGender(e.target.value)}/>여자</label>
                                        </span>
                                        <span className={styles.inputItem}>④ 희망 여행지 : 
                                            {preferredIsekai ?
                                                <span className={styles.preferredIsekai} onClick={() => setCatalModalVisible(true)}>{preferredIsekai}</span> :
                                                <span className={styles.selectButton} onClick={() => setCatalModalVisible(true)}>둘러보기</span>}
                                        </span>
                                        <span className={styles.inputItemOneRow}>
                                            ⑤ 직업 혹은 취미, 특기 : <input type='text' className={styles.inputBox} onChange={(e)=>setSpecialty(e.target.value)}/></span>
                                        <div className={styles.isekaiSpecialWrapper}>
                                            <span className={`${styles.specialHead} ${styles.specialAbilHead}`}>⑥ 치트 능력치💪</span>
                                            <span 
                                                className={wishedAbil=='명석한두뇌' ? `${styles.specialAbilOption} ${styles.selected}` : styles.specialAbilOption}
                                                onClick={(e)=>setWishedAbil(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·명석한 두뇌<br/>
                                                    <span className={styles.specialAnno}> 머리가 안좋으면 몸이 고생한다</span>
                                            </span>
                                            <span
                                                className={wishedAbil=='강인한신체' ? `${styles.specialAbilOption} ${styles.selected}` : styles.specialAbilOption}
                                                onClick={(e)=>setWishedAbil(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·강인한 신체<br/>
                                                    <span className={styles.specialAnno}> 몸이 안좋으면 머리가 고생한다</span>
                                            </span>
                                            <span
                                                className={wishedAbil=='치명적매력' ? `${styles.specialAbilOption} ${styles.selected}` : styles.specialAbilOption}
                                                onClick={(e)=>setWishedAbil(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·치명적 매력<br/>
                                                    <span className={styles.specialAnno}> 알파의 삶을 살아보자</span>
                                            </span>
                                            <span
                                                className={wishedAbil=='압도적인운' ? `${styles.specialAbilOption} ${styles.selected}` : styles.specialAbilOption}
                                                onClick={(e)=>setWishedAbil(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·압도적인 운<br/>
                                                    <span className={styles.specialAnno}> 압도적인 운 앞에 모든 것은 무의미</span>
                                            </span>
                                        </div>
                                        <div className={styles.isekaiSpecialWrapper}>
                                            <span className={`${styles.specialHead} ${styles.specialGiftHead}`}>⑦ 여신의 선물🎁</span>
                                            <span
                                                className={wishedGift=='막대한재력' ? `${styles.specialGiftOption} ${styles.selected}` : styles.specialGiftOption}
                                                onClick={(e)=>setWishedGift(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·막대한 재력<br/>
                                                    <span className={styles.specialAnno}> 어떤 세계에도 통용되는 제1가치</span>
                                            </span>
                                            <span
                                                className={wishedGift=='영혼의파트너' ? `${styles.specialGiftOption} ${styles.selected}` : styles.specialGiftOption}
                                                onClick={(e)=>setWishedGift(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·영혼의 파트너<br/>
                                                    <span className={styles.specialAnno}> 가장 어두운 때에도 혼자가 아니야</span>
                                            </span>
                                            <span
                                                className={wishedGift=='특별한장비' ? `${styles.specialGiftOption} ${styles.selected}` : styles.specialGiftOption}
                                                onClick={(e)=>setWishedGift(e.currentTarget.innerText.slice(1, e.currentTarget.innerText.indexOf('\n')).replace(/\s+/g, ''))}>
                                                    ·특별한 장비<br/>
                                                    <span className={styles.specialAnno}> 장인이 아니면 도구탓을 하자</span>
                                            </span>
                                        </div>
                                        <div className={`${styles.buttonItem} ${styles.submitButton}`} onClick={()=>runSim()}>제출하기</div>
                                    </div>
                                </> : null
                            }
                            <div className={styles.buttons}>
                                <Link href="/component/reincarnation" className={styles.buttonItem}>🌍 다른 세계 보러가기</Link>
                                <Link href="/component/reincarnation" className={styles.buttonItem}>🕰️ 내 이전 세계 보러가기</Link>
                            </div>
                        </div>
                    </> : animeEnd && resDone=='start' ? <span className={styles.loadingPhrase}>{loadingPhrase}</span> :
                    null
                }
            </div>
        </div>
    )
}

export default Reincarnation;