'use client'
import styles from './simResult.module.css';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SnsShareModal from './snsShareModal';
import TarotCompo from './tarotCompo';
import TabletCompo from './tabletCompo';
import OriCompo from './oriCompo';
import PersonalArchiveModal from './personalArchiveModal';

export default function SimResult({simResult, waitForRef, setResultMount, guestId}) {

    const [mainMoved, setMainMoved] = useState(false);
    const [animeEnd, setAnimeEnd] = useState(false);
    const [clearInfo, setClearInfo] = useState(false);
    const [genre, setGenre] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [archiveModalVisible, setArchiveModalVisible] = useState(false);
    let isekaiImageRef = useRef(null);
    let infoWrapperRef = useRef(null);
    let mainRef = useRef(null);
    let subRef1 = useRef(null);
    let subRef2 = useRef(null);
    let subRef3 = useRef(null);
    let subRef4 = useRef(null);
    let menuRef = useRef(null);
    let loadingRef = useRef(null);
    const router = useRouter();

    const waitFadeIn = (ref, resolve) => {
        ref.addEventListener('animationend',
            ()=>{setTimeout(resolve, 1500);});
    };

    // 애니메이션 순서대로 실행
    const animeSeq = async () => {
        await new Promise(resolve=>{waitForRef(isekaiImageRef, (ref)=>{ref.classList.add(styles.fadeIn)}, resolve)});
        await new Promise(resolve=>{waitFadeIn(isekaiImageRef.current, resolve)});
        await new Promise(resolve=>{infoWrapperRef.current.classList.add(styles.fadeIn); resolve();});
        await new Promise(resolve=>{waitFadeIn(infoWrapperRef.current, resolve)});
        await new Promise(resolve=>{
            if(simResult.whole.세계관명시 == 'SF'){
                loadingRef.current.classList.add(styles.fakeLoading);
                loadingRef.current.addEventListener('animationend', ()=>{mainRef.current.classList.add(styles.mainMovingTablet)});
                mainRef.current.addEventListener('animationend', (e)=>{
                    if(e.target !== mainRef.current) return;
                    setMainMoved(true);
                    setAnimeEnd(true);
                    menuRef.current.classList.add(styles.fadeIn);})
                resolve();
            }else{
                infoWrapperRef.current.classList.add(styles.vibe);
                mainRef.current.classList.add(styles.mainMoving);
                mainRef.current.addEventListener('animationend', ()=>{
                    setMainMoved(true);
                    waitForRef(
                        subRef1,
                        (ref)=>{ref.addEventListener('animationend', ()=>{setAnimeEnd(true); menuRef.current.classList.add(styles.fadeIn);});});
                })
                resolve();
            };
        });
    };

    // 시작화면으로 돌아가기 함수
    const returnToHome = () => {
        if(confirm('처음화면으로 돌아갑니다.')) location.href='/';
    };

    // 아카이브로 가기 함수
    const toArchive = () => {
        if(confirm('현재 페이지를 떠납니다.')) location.href='/component/archive';
    };

    // 세계관 영어로 만드는 함수
    const genreToEng = (genre) => {
        if(genre == '판타지') setGenre('Fantasy');
        if(genre == '어반판타지') setGenre('UrbanFantasy');
        if(genre == '동양판타지') setGenre('동양-환상설화');
        if(genre == '다크판타지') setGenre('DarkFantasy');
        if(genre == 'SF') setGenre('SF');
    };

    // 애니메이션 시작, url 쿼리추가, 장르 영어로
    useEffect(()=>{
        if(!simResult){
            alert('이세계가 존재하지 않습니다. 다시 시도해주세요.');
            location.href='/';
        };
        setResultMount(true);
        setTimeout(animeSeq, 2000);
        router.replace(`/component/reincarnation?simIdx=${simResult.simIdx}`);
        genreToEng(simResult.whole.세계관명시);
    },[]);

    // 배경 감상하기
    useEffect(()=>{
        if(!animeEnd) return;
        if(clearInfo) infoWrapperRef.current.classList.remove(styles.vibe); infoWrapperRef.current.classList.add(styles.fadeOut);
        if(!clearInfo) infoWrapperRef.current.classList.remove(styles.fadeOut); infoWrapperRef.current.classList.add(styles.fadeIn);
    },[clearInfo]);

    return (
        <>
            <SnsShareModal visible={showModal} onClose={()=>setShowModal(false)}/>
            <PersonalArchiveModal
                            visible={archiveModalVisible}
                            onClose={()=>{setArchiveModalVisible(false)}}
                            guestId={guestId}
            />
            <div className={styles.resultContainer}>
                <div ref={menuRef} className={styles.menuWrapper}>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : returnToHome}>다시하기</div>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : ()=>setClearInfo(prev=> !prev)}>📸 감상하기</div>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : ()=>setShowModal(prev=> !prev)}>🌐 결과 공유하기</div>
                    <div className={styles.buttonItem} onClick={!animeEnd ? '' : toArchive}>🌍 다른 세계 보러가기</div>
                    <div className={styles.buttonItem} onClick={()=>{setArchiveModalVisible(true)}}>🕰️ 내 이전 세계</div>
                </div>
                <div ref={isekaiImageRef} className={styles.isekaiImageWrapper}>
                    {
                        simResult.whole.세계관명시 == '판타지' ?
                            <img
                                className={styles.isekaiImage}
                                src={simResult.subGenre == '던전 공략물' ? '/fandungeon.webp' : '/fantasy.webp'}
                                alt={'판타지배경'}
                            /> :

                        simResult.whole.세계관명시 == '어반판타지' ?
                            <img
                                className={styles.isekaiImage}
                                src={simResult.subGenre == '능력자 배틀물' ||
                                    simResult.subGenre == '히어로물' ? '/urbanfanbattle.webp' : '/urbanfan.webp'}
                                alt={'어반판타지배경'}
                            /> :

                        simResult.whole.세계관명시 == '다크판타지' ? 
                            <img
                                className={styles.isekaiImage}
                                src={simResult.subGenre == '코즈믹 호러' ? '/darkfancosmic.webp' : '/darkfan.webp'}
                                alt={'다크판타지배경'}
                            /> :

                        simResult.whole.세계관명시 == '동양판타지' ?
                            <img className={styles.isekaiImage} src={'/orifan.webp'} alt={'동양판타지배경'}/> :

                        simResult.whole.세계관명시 == 'SF' ?
                            <img
                                className={styles.isekaiImage}
                                src={simResult.subGenre == '사이버펑크' ? '/sfcyberpunk.webp' :
                                    simResult.subGenre.includes('아포칼립스') ? '/sfapocal.webp' :
                                    simResult.subGenre == '거대로봇물' ? '/sfgiantmech.webp' :
                                    '/sf.webp'}
                                alt={'SF배경'}
                            /> : null
                    }
                </div>
                <div ref={infoWrapperRef} className={styles.isekaiInfoWrapper}>
                        {
                            simResult.whole.세계관명시 == '판타지' ||
                            simResult.whole.세계관명시 == '어반판타지' ||
                            simResult.whole.세계관명시 == '다크판타지' ?
                            <TarotCompo
                                mainRef = {mainRef} subRef1 = {subRef1} subRef2 = {subRef2}
                                subRef3 = {subRef3} subRef4 = {subRef4} mainMoved = {mainMoved}
                                genre = {genre} simResult = {simResult}
                            /> :
                            simResult.whole.세계관명시 == 'SF' ?
                            <TabletCompo
                                mainRef = {mainRef} subRef1 = {subRef1} subRef2 = {subRef2}
                                subRef3 = {subRef3} subRef4 = {subRef4} mainMoved = {mainMoved}
                                genre = {genre} simResult = {simResult} loadingRef = {loadingRef}
                                animeEnd = {animeEnd}
                            /> :
                            simResult.whole.세계관명시 == '동양판타지' ?
                            <OriCompo
                                mainRef = {mainRef} subRef1 = {subRef1} subRef2 = {subRef2}
                                subRef3 = {subRef3} subRef4 = {subRef4} mainMoved = {mainMoved}
                                genre = {genre} simResult = {simResult}
                            /> : null
                        }
                </div>
            </div>
        </>
    )
}