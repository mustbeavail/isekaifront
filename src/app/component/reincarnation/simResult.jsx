'use client'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from './simResult.module.css';
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function SimResult({simResult, waitForRef}) {

    const [shiningDone, setShiningDone] = useState(false);
    const [animeEnd, setAnimeEnd] = useState(false);
    const [clearInfo, setClearInfo] = useState(false);
    const [genre, setGenre] = useState(null);
    const [showTopFade1, setShowTopFade1] = useState(false);
    const [showBotFade1, setShowBotFade1] = useState(false);
    const [showTopFade2, setShowTopFade2] = useState(false);
    const [showBotFade2, setShowBotFade2] = useState(false);
    const [showTopFade3, setShowTopFade3] = useState(false);
    const [showBotFade3, setShowBotFade3] = useState(false);
    let scrollRef1 = useRef(null);
    let scrollRef2 = useRef(null);
    let scrollRef3 = useRef(null);
    let isekaiImageRef = useRef(null);
    let infoWrapperRef = useRef(null);
    let sunRef = useRef(null);
    let subTarot1Ref = useRef(null);
    let subTarot2Ref = useRef(null);
    let menuRef = useRef(null);

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
            infoWrapperRef.current.classList.add(styles.vibeVerti);
            sunRef.current.classList.add(styles.shining);
            resolve();});
        await new Promise(resolve=>{sunRef.current.addEventListener(
            'animationend', ()=>{setShiningDone(true); resolve();}
        )});
        subTarot1Ref.current.addEventListener('animationend', ()=>{setAnimeEnd(true); menuRef.current.classList.add(styles.fadeIn)});
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
        }
    };

    useEffect(()=>{
        animeSeq();
        if(!simResult) return;
        genreToEng(simResult.whole.세계관명시);
    },[]);

    useEffect(()=>{
        if(!animeEnd) return;
        if(clearInfo) infoWrapperRef.current.classList.add(styles.fadeOut);
        if(!clearInfo) infoWrapperRef.current.classList.remove(styles.fadeOut); infoWrapperRef.current.classList.add(styles.fadeIn);
    },[clearInfo]);

    useEffect(()=>{
        if(!animeEnd) return;
        const scrollableElement1 = scrollRef1.current.getScrollElement();
        const scrollableElement2 = scrollRef2.current.getScrollElement();
        const scrollableElement3 = scrollRef3.current.getScrollElement();
        scrollableElement1.addEventListener('scroll', ()=>handleScroll(scrollableElement1, 1));
        scrollableElement2.addEventListener('scroll', ()=>handleScroll(scrollableElement2, 2));
        scrollableElement3.addEventListener('scroll', ()=>handleScroll(scrollableElement3, 3));
        handleScroll(scrollableElement1, 1);
        handleScroll(scrollableElement2, 2);
        handleScroll(scrollableElement3, 3);

        return () => {
            scrollableElement1.removeEventListener('scroll', handleScroll);
            scrollableElement2.removeEventListener('scroll', handleScroll);
            scrollableElement3.removeEventListener('scroll', handleScroll);
        };
    },[animeEnd]);


    return (
        <>
        <div className={styles.resultContainer}>
            <div ref={menuRef} className={styles.menuWrapper}>
                <div className={styles.buttonItem} onClick={returnToHome}>다시하기</div>
                <div className={styles.buttonItem} onClick={()=>setClearInfo(prev=> !prev)}>📸감상하기</div>
                <div className={styles.buttonItem}>결과 공유하기</div>
                <Link href="/component/reincarnation" className={styles.buttonItem}>🌍 다른 세계 보러가기</Link>
            </div>
            <div ref={isekaiImageRef} className={styles.isekaiImageWrapper}>
                <img className={styles.isekaiImage} src={'/fantasy.webp'} alt={'판타지 배경'}/>
            </div>
            <div ref={infoWrapperRef} className={styles.isekaiInfoWrapper}>
                <div ref={sunRef} className={!shiningDone ? styles.theSun : styles.emptyCard}>
                    {animeEnd ?
                        <>
                            <span className={styles[genre]}>{genre}</span>
                            <div className={styles.synopWrapper}>
                                <div className={!showTopFade1 ? styles.fadeTop1 : `${styles.fadeTop1} ${styles.visible}`}></div>
                                <SimpleBar ref={scrollRef1} style={{ flexShrink: 0, maxHeight: 600, minWidth: 400}}>
                                    <span className={styles.synopsis}>{simResult.whole.시놉시스}</span>
                                </SimpleBar>
                                <div className={!showBotFade1 ? styles.fadeBot1 : `${styles.fadeBot1} ${styles.visible}`}></div>
                            </div>
                            
                            <span className={styles.synopTitle}>&nbsp;SYNOPSIS</span>
                        </>
                        : null
                    }
                </div>
                <div ref={subTarot1Ref} className={shiningDone ? styles.subTarot1 : ''}>
                    {animeEnd ?
                        <>
                            <span className={styles.profileHead}>새로운 몸</span>
                            <div className={styles.profileWrapper}>
                                <div className={!showTopFade2 ? styles.fadeTop2 : `${styles.fadeTop2} ${styles.visible}`}></div>
                                <SimpleBar ref={scrollRef2} style={{ flexShrink: 0, maxHeight: 280, minWidth: 200}}>
                                    <span className={styles.profile}>{simResult.whole.프로필}</span>
                                </SimpleBar>
                                <div className={!showBotFade2 ? styles.fadeBot2 : `${styles.fadeBot2} ${styles.visible}`}></div>
                            </div>
                            <span className={styles.proFileTitle}>PROFILE</span>
                        </> : null
                    }
                </div>
                <div ref={subTarot2Ref} className={shiningDone ? styles.subTarot2 : ''}>
                    {animeEnd ?
                        <>
                            <span className={styles.giftHead}>여신의 선물</span>
                            <div className={styles.giftWrapper}>
                                <div className={!showTopFade3 ? styles.fadeTop3 : `${styles.fadeTop3} ${styles.visible}`}></div>
                                <SimpleBar ref={scrollRef3} style={{ flexShrink: 0, maxHeight: 280, minWidth: 190}}>
                                    <span className={styles.gift}>{simResult.whole.전생특전}</span>
                                </SimpleBar>
                                <div className={!showBotFade3 ? styles.fadeBot3 : `${styles.fadeBot3} ${styles.visible}`}></div>
                            </div>
                            <span className={styles.giftTitle}>GIFT</span>
                        </> : null
                    }
                </div>
            </div>
        </div>
        </>
    )
}