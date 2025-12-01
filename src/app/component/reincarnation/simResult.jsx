'use client'
import styles from './simResult.module.css';
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function SimResult({simResult, waitForRef}) {

    const [shiningDone, setShiningDone] = useState(false);
    const [animeEnd, setAnimeEnd] = useState(false);
    const [cuttedSynop, setCuttedSynop] = useState([]);
    const [synopPage, setSynopPage] = useState(0);
    const [cuttedProfile, setCuttedProfile] = useState([]);
    const [cuttedGift, setCuttedGift] = useState([]);
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
        await new Promise(resolve=>{waitForRef(infoWrapperRef, (ref)=>{waitFadeIn(ref, resolve)})});
        await new Promise(resolve=>{
            infoWrapperRef.current.classList.add(styles.vibeVerti);
            sunRef.current.classList.add(styles.shining);
            resolve();});
        await new Promise(resolve=>{sunRef.current.addEventListener(
            'animationend', ()=>{setShiningDone(true); resolve();}
        )});
        subTarot1Ref.current.addEventListener('animationend', ()=>{setAnimeEnd(true); menuRef.current.classList.add(styles.fadeIn)});
    };

    // 시뮬레이션 결과 길이 자르기
    const cutSim = (simResult) => {
        
        const cuttedResult = [];

        for(let from = 0; from < simResult.length; from += 336){
            let to = from + 336;
            const resultPiece = simResult.slice(from, to);
            cuttedResult.push(resultPiece);
        };

        return cuttedResult;
    };
    const cutSubSim = (simResult) => {
        
        const cuttedResult = [];

        for(let from = 0; from < simResult.length; from += 140){
            let to = from + 140;
            const resultPiece = simResult.slice(from, to);
            cuttedResult.push(resultPiece);
        };

        return cuttedResult;
    };

    // 이전 다음 버튼 함수
    const before = (pageState, setPageState) => {
        if(pageState != 0){
            setPageState(prev=> prev-1);
        };
    };
    const next = (pageState, cuttedResult, setPageState) => {
        if(pageState < cuttedResult.length-1){
            setPageState(prev=> prev+1);
        };
    };

    useEffect(()=>{
        animeSeq();
        setCuttedSynop(cutSim(simResult.시놉시스));
        setCuttedProfile(cutSubSim(simResult.프로필));
        setCuttedGift(cutSubSim(simResult.전생특전));
    },[]);


    return (
        <>
        <div className={styles.resultContainer}>
            <div ref={menuRef} className={styles.menuWrapper}>
                <Link href="/" className={styles.buttonItem}>다시하기</Link>
                <Link href="/component/reincarnation" className={styles.buttonItem}>🌍 다른 세계 보러가기</Link>
            </div>
            <div className={styles.isekaiImageWrapper}>
                <img className={styles.isekaiImage} src={'/fantasy.webp'} alt={'판타지 배경'}/>
            </div>
            <div ref={infoWrapperRef} className={styles.isekaiInfoWrapper}>
                <span className={animeEnd ? styles.genre : styles.hide}>{simResult.세계관명시}</span>
                <div ref={sunRef} className={!shiningDone ? styles.theSun : styles.emptyCard}>
                    {animeEnd ?
                        <>
                            <span className={styles.synopsis}>{cuttedSynop[synopPage]}</span>
                            <div className={styles.btnWrapper}>
                                <div className={synopPage == 0 ? styles.hide : styles.beforeBtn} onClick={()=>before(synopPage, setSynopPage)}>◀️&nbsp;</div>
                                <div className={styles.index}>{synopPage+1}/{cuttedSynop.length}</div>
                                <div className={synopPage+1 == cuttedSynop.length ? styles.hide : styles.nextBtn} onClick={()=>next(synopPage, cuttedSynop, setSynopPage)}>&nbsp;▶️</div>
                            </div>
                            <span className={styles.title}>&nbsp;SYNOPSIS</span>
                        </>
                        : null
                    }
                </div>
                <div ref={subTarot1Ref} className={shiningDone ? styles.subTarot1 : ''}>
                    {animeEnd ?
                        <>
                            <span className={styles.profile}>{cuttedProfile[0]}</span>
                        </> : null
                    }
                </div>
                <div ref={subTarot2Ref} className={shiningDone ? styles.subTarot2 : ''}>
                    {animeEnd ?
                        <>
                            <span className={styles.gift}>{cuttedGift[0]}</span>
                        </> : null
                    }
                </div>
            </div>
        </div>
        </>
    )
}