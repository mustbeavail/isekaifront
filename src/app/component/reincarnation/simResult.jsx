'use client'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from './simResult.module.css';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import SnsShareModal from './snsShareModal';

export default function SimResult({simResult, waitForRef}) {

    const [theSunMoved, setTheSunMoved] = useState(false);
    const [animeEnd, setAnimeEnd] = useState(false);
    const [clearInfo, setClearInfo] = useState(false);
    const [genre, setGenre] = useState(null);
    const [showTopFade1, setShowTopFade1] = useState(false);
    const [showBotFade1, setShowBotFade1] = useState(false);
    const [showTopFade2, setShowTopFade2] = useState(false);
    const [showBotFade2, setShowBotFade2] = useState(false);
    const [showTopFade3, setShowTopFade3] = useState(false);
    const [showBotFade3, setShowBotFade3] = useState(false);
    const [showTopFade4, setShowTopFade4] = useState(false);
    const [showBotFade4, setShowBotFade4] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [synopSelected, setSynopSelected] = useState(false);
    const [profileSelected, setProfileSelected] = useState(false);
    const [giftSelected, setGiftSelected] = useState(false);
    const [abilSelected, setAbilSelected] = useState(false);
    const [slotNum, setSlotNum] = useState([1, 2, 3, 4]);
    const [synopClass, setSynopClass] = useState('');
    const [profileClass, setProfileClass] = useState('');
    const [giftClass, setGiftClass] = useState('');
    const [abilClass, setAbilClass] = useState('');
    let scrollRef1 = useRef(null);
    let scrollRef2 = useRef(null);
    let scrollRef3 = useRef(null);
    let scrollRef4 = useRef(null);
    let isekaiImageRef = useRef(null);
    let infoWrapperRef = useRef(null);
    let sunRef = useRef(null);
    let emptyCardRef = useRef(null);
    let subTarot1Ref = useRef(null);
    let subTarot2Ref = useRef(null);
    let subTarot3Ref = useRef(null);
    let menuRef = useRef(null);
    const router = useRouter();

    const waitFadeIn = (ref, resolve) => {
        ref.addEventListener('animationend',
            ()=>{setTimeout(resolve, 1500);});
    };

    // 애니메이션 순서대로 실행
    const animeSeq = async () => {
        await new Promise(resolve=>{waitForRef(isekaiImageRef, (ref)=>{waitFadeIn(ref, resolve)})});
        await new Promise(resolve=>{infoWrapperRef.current.classList.add(styles.fadeIn); resolve();});
        await new Promise(resolve=>{waitFadeIn(infoWrapperRef.current, resolve)});
        await new Promise(resolve=>{
            infoWrapperRef.current.classList.add(styles.vibe);
            sunRef.current.classList.add(styles.theSunMoving);
            resolve();});
        await new Promise(resolve=>{sunRef.current.addEventListener(
            'animationend', ()=>{
                setTheSunMoved(true);
                waitForRef(
                    subTarot1Ref,
                    (ref)=>{ref.addEventListener('animationend', ()=>{setAnimeEnd(true); menuRef.current.classList.add(styles.fadeIn)});});
                resolve();}
        )});
    };

    // 시작화면으로 돌아가기 함수
    const returnToHome = () => {
        if(confirm('처음화면으로 돌아갑니다.')) location.href='/';
    };

    // 세계관 영어로 만드는 함수
    const genreToEng = (genre) => {
        if(genre == '판타지') setGenre('Fantasy');
        if(genre == '어반판타지') setGenre('Urban Fantasy');
        if(genre == '동양판타지') setGenre('동양 환상설화');
        if(genre == '다크판타지') setGenre('Dark Fantasy');
        if(genre == 'SF') setGenre('SF');
    };

    // 텍스트영역 페이드아웃
    const handleScroll = (el, num) => {
        if (!el) return;
      
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;
      
        if(num == 1){
            setShowTopFade1(scrollTop > 5);
            setShowBotFade1(scrollTop + clientHeight < scrollHeight - 5);
        } else if(num == 2){
            setShowTopFade2(scrollTop > 5);
            setShowBotFade2(scrollTop + clientHeight < scrollHeight - 5);
        } else if(num == 3){
            setShowTopFade3(scrollTop > 5);
            setShowBotFade3(scrollTop + clientHeight < scrollHeight - 5);
        } else if(num == 4){
            setShowTopFade4(scrollTop > 5);
            setShowBotFade4(scrollTop + clientHeight < scrollHeight - 5);
        }
    };

    // 현재 카드자리 빠른순서 뽑기
    const getMinSlot = () => {
        const minSlot = Math.min(...slotNum);
        setSlotNum(prev => prev.filter(n => n !== minSlot));
        return minSlot;
    };

    // 카드자리 번호 반납
    const returnSlot = (num) => {
        setSlotNum(prev => [...prev, num]);
    }

    // 서브카드 호버관리
    const addUpright = (ref, state) => {
        if(!state){
            ref.current.classList.add(styles.upright);
        }
    };

    const delUpright = (ref, state) => {
        if(!state){
            ref.current.classList.remove(styles.upright);
        }
    };

    // 애니메이션 시작, url 쿼리추가, 장르 영어로
    useEffect(()=>{
        if(!simResult){
            alert('이세계가 존재하지 않습니다. 다시 시도해주세요.');
            location.href='/';
        };
        animeSeq();
        router.replace(`/component/reincarnation?simIdx=${simResult.simIdx}`);
        genreToEng(simResult.whole.세계관명시);
    },[]);

    // 배경 감상하기
    useEffect(()=>{
        if(!animeEnd) return;
        if(clearInfo) infoWrapperRef.current.classList.remove(styles.vibe); infoWrapperRef.current.classList.add(styles.fadeOut);
        if(!clearInfo) infoWrapperRef.current.classList.remove(styles.fadeOut); infoWrapperRef.current.classList.add(styles.fadeIn);
    },[clearInfo]);

    // 스크롤, 서브카드 확장 애니메이션 관리
    useEffect(()=>{

        if(synopSelected && synopClass == ''){
            const scrollableElement1 = scrollRef1.current.getScrollElement();
            scrollableElement1.addEventListener('scroll', ()=>handleScroll(scrollableElement1, 1));
            handleScroll(scrollableElement1, 1);
            setSynopClass(`slot${getMinSlot()}`);
        };
        if(profileSelected && profileClass == ''){
            const scrollableElement2 = scrollRef2.current.getScrollElement();
            scrollableElement2.addEventListener('scroll', ()=>handleScroll(scrollableElement2, 2));
            handleScroll(scrollableElement2, 2);
            setProfileClass(`slot${getMinSlot()}`);
        };
        if(giftSelected && giftClass == ''){
            const scrollableElement3 = scrollRef3.current.getScrollElement();
            scrollableElement3.addEventListener('scroll', ()=>handleScroll(scrollableElement3, 3));
            handleScroll(scrollableElement3, 3);
            setGiftClass(`slot${getMinSlot()}`);
        };
        if(abilSelected && abilClass == ''){
            const scrollableElement4 = scrollRef4.current.getScrollElement();
            scrollableElement4.addEventListener('scroll', ()=>handleScroll(scrollableElement4, 4));
            handleScroll(scrollableElement4, 4);
            setAbilClass(`slot${getMinSlot()}`);
        };

        return () => {
            if(scrollRef1.current) scrollRef1.current.getScrollElement().removeEventListener('scroll', handleScroll);
            if(scrollRef2.current) scrollRef2.current.getScrollElement().removeEventListener('scroll', handleScroll);
            if(scrollRef3.current) scrollRef3.current.getScrollElement().removeEventListener('scroll', handleScroll);
            if(scrollRef4.current) scrollRef4.current.getScrollElement().removeEventListener('scroll', handleScroll);
        };
    },[synopSelected, profileSelected, giftSelected, abilSelected]);


    return (
        <>
            <SnsShareModal visible={showModal} onClose={()=>setShowModal(false)}/>
            <div className={styles.resultContainer}>
                <div ref={menuRef} className={styles.menuWrapper}>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : returnToHome}>다시하기</div>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : ()=>setClearInfo(prev=> !prev)}>📸감상하기</div>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : ()=>setShowModal(prev=> !prev)}>🌐결과 공유하기</div>
                    <Link href="/component/archive" className={styles.buttonItem}>🌍 다른 세계 보러가기</Link>
                </div>
                <div ref={isekaiImageRef} className={styles.isekaiImageWrapper}>
                    <img className={styles.isekaiImage} src={'/fantasy.webp'} alt={'판타지 배경'}/>
                </div>
                <div ref={infoWrapperRef} className={styles.isekaiInfoWrapper}>
                    <div ref={sunRef} className={styles.theSun}>

                    </div>
                    {!theSunMoved ? null :
                        <>
                            <div 
                                ref={emptyCardRef}
                                className={!synopSelected? styles.emptyCard : `${styles.emptyCard} ${styles[synopClass]}`}
                                onMouseEnter={()=>{addUpright(emptyCardRef, synopSelected)}}
                                onMouseLeave={()=>{delUpright(emptyCardRef, synopSelected)}}>
                                {synopSelected ?
                                        <>
                                            <span className={styles[genre]}>{genre}</span>
                                            <div className={styles.reduceBtnWrapper}>
                                                <span
                                                    className={styles.reduceBtn}
                                                    onClick={()=>{
                                                        returnSlot(Number(synopClass.replace(/\D/g, "")));
                                                        setSynopSelected(false);
                                                        setSynopClass('')}}>✖️
                                                </span>
                                            </div>
                                            <div className={styles.synopWrapper}>
                                                <div className={!showTopFade1 ? styles.fadeTop1 : `${styles.fadeTop1} ${styles.visible}`}></div>
                                                <SimpleBar ref={scrollRef1} style={{ flexShrink: 0, maxHeight: 250, minWidth: 210}}>
                                                    <span className={styles.synopsis}>{simResult.whole.시놉시스}</span>
                                                </SimpleBar>
                                                <div className={!showBotFade1 ? styles.fadeBot1 : `${styles.fadeBot1} ${styles.visible}`}></div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <span className={styles.synopReady}>시놉시스</span>
                                            <span className={styles.expandBtn} onClick={()=>{setSynopSelected(true)}}>❔</span>
                                        </>
                                }
                                <span className={styles.synopTitle}>SYNOPSIS</span>
                            </div>
                            <div
                                ref={subTarot1Ref}
                                className={!profileSelected ? styles.subTarot1 : `${styles.subTarot1} ${styles[profileClass]}`}
                                onMouseEnter={()=>{addUpright(subTarot1Ref, profileSelected)}}
                                onMouseLeave={()=>{delUpright(subTarot1Ref, profileSelected)}}>
                                {profileSelected ?
                                    <>
                                        <span className={styles.profileHead}>새로운 몸</span>
                                        <div className={styles.reduceBtnWrapper}>
                                                <span
                                                    className={styles.reduceBtn}
                                                    onClick={()=>{
                                                        returnSlot(Number(profileClass.replace(/\D/g, "")));
                                                        setProfileSelected(false);
                                                        setProfileClass('')}}>✖️
                                                </span>
                                        </div>
                                        <div className={styles.profileWrapper}>
                                            <div className={!showTopFade2 ? styles.fadeTop2 : `${styles.fadeTop2} ${styles.visible}`}></div>
                                            <SimpleBar ref={scrollRef2} style={{ flexShrink: 0, maxHeight: 260, minWidth: 200}}>
                                                <span className={styles.profile}>{simResult.whole.프로필}</span>
                                            </SimpleBar>
                                            <div className={!showBotFade2 ? styles.fadeBot2 : `${styles.fadeBot2} ${styles.visible}`}></div>
                                        </div>
                                        
                                    </> :
                                    <>
                                        <span className={styles.profileReady}>새로운 몸</span>
                                        <span className={styles.expandBtn} onClick={()=>{setProfileSelected(true)}}>❔</span>
                                    </>
                                }
                                <span className={styles.profileTitle}>PROFILE</span>
                            </div>
                            <div
                                ref={subTarot2Ref}
                                className={!giftSelected ? styles.subTarot2 : `${styles.subTarot2} ${styles[giftClass]}`}
                                onMouseEnter={()=>{addUpright(subTarot2Ref, giftSelected)}}
                                onMouseLeave={()=>{delUpright(subTarot2Ref, giftSelected)}}>
                                {giftSelected ?
                                    <>
                                        <span className={styles.giftHead}>여신의 선물</span>
                                        <div className={styles.reduceBtnWrapper}>
                                                <span
                                                    className={styles.reduceBtn}
                                                    onClick={()=>{
                                                        returnSlot(Number(giftClass.replace(/\D/g, "")));
                                                        setGiftSelected(false);
                                                        setGiftClass('')}}>✖️
                                                </span>
                                        </div>
                                        <div className={styles.giftWrapper}>
                                            <div className={!showTopFade3 ? styles.fadeTop3 : `${styles.fadeTop3} ${styles.visible}`}></div>
                                            <SimpleBar ref={scrollRef3} style={{ flexShrink: 0, maxHeight: 260, minWidth: 190}}>
                                                <span className={styles.gift}>{simResult.whole.전생특전}</span>
                                            </SimpleBar>
                                            <div className={!showBotFade3 ? styles.fadeBot3 : `${styles.fadeBot3} ${styles.visible}`}></div>
                                        </div>
                                    </> :
                                    <>
                                        <span className={styles.giftReady}>여신의 선물</span>
                                        <span className={styles.expandBtn} onClick={()=>{setGiftSelected(true)}}>❔</span>
                                    </>
                                }
                                <span className={styles.giftTitle}>GIFT</span>
                            </div>
                            <div
                                ref={subTarot3Ref}
                                className={!abilSelected ? styles.subTarot3 : `${styles.subTarot3} ${styles[abilClass]}`}
                                onMouseEnter={()=>{addUpright(subTarot3Ref, abilSelected)}}
                                onMouseLeave={()=>{delUpright(subTarot3Ref, abilSelected)}}>
                                {abilSelected ?
                                    <>
                                        <span className={styles.abilHead}>고유능력</span>
                                        <div className={styles.reduceBtnWrapper}>
                                                <span
                                                    className={styles.reduceBtn}
                                                    onClick={()=>{
                                                        returnSlot(Number(abilClass.replace(/\D/g, "")));
                                                        setAbilSelected(false);
                                                        setAbilClass('')}}>✖️
                                                </span>
                                        </div>
                                        <div className={styles.abilWrapper}>
                                            <div className={!showTopFade4 ? styles.fadeTop4 : `${styles.fadeTop4} ${styles.visible}`}></div>
                                            <SimpleBar ref={scrollRef4} style={{ flexShrink: 0, maxHeight: 260, minWidth: 190}}>
                                                <span className={styles.abil}>{simResult.whole.고유능력}</span>
                                            </SimpleBar>
                                            <div className={!showBotFade4 ? styles.fadeBot4 : `${styles.fadeBot4} ${styles.visible}`}></div>
                                        </div>
                                    </> :
                                    <>
                                        <span className={styles.abilReady}>고유능력</span>
                                        <span className={styles.expandBtn} onClick={()=>{setAbilSelected(true)}}>❔</span>
                                    </>
                                }
                                <span className={styles.abilTitle}>ABILITY</span>
                            </div>                        
                        </>
                    }
                </div>
            </div>
        </>
    )
}