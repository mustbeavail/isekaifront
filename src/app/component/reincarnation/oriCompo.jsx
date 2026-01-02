'use client'
import styles from './oriCompo.module.css';
import { useState, useEffect, useRef } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {hungeul} from './oriCompoFont';


export default function OriCompo ({mainRef, subRef1, subRef2, subRef3, subRef4, mainMoved, genre, simResult}) {

    const [synopSelected, setSynopSelected] = useState(false);
    const [profileSelected, setProfileSelected] = useState(false);
    const [giftSelected, setGiftSelected] = useState(false);
    const [abilSelected, setAbilSelected] = useState(false);

    const [synopClass, setSynopClass] = useState('');
    const [profileClass, setProfileClass] = useState('');
    const [giftClass, setGiftClass] = useState('');
    const [abilClass, setAbilClass] = useState('');

    const [showTopFade1, setShowTopFade1] = useState(false);
    const [showBotFade1, setShowBotFade1] = useState(false);
    const [showTopFade2, setShowTopFade2] = useState(false);
    const [showBotFade2, setShowBotFade2] = useState(false);
    const [showTopFade3, setShowTopFade3] = useState(false);
    const [showBotFade3, setShowBotFade3] = useState(false);
    const [showTopFade4, setShowTopFade4] = useState(false);
    const [showBotFade4, setShowBotFade4] = useState(false);

    const [slotNum, setSlotNum] = useState([1, 2, 3, 4]);

    let scrollRef1 = useRef(null);
    let scrollRef2 = useRef(null);
    let scrollRef3 = useRef(null);
    let scrollRef4 = useRef(null);

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
            <div ref={mainRef} className={styles.mainOriCard}></div>
            {!mainMoved ? null :
                <>
                    <div className={synopSelected ? `${styles.sub4Wrapper} ${styles.float}` : styles.sub4Wrapper}>
                        <div 
                            ref={subRef4}
                            className={!synopSelected? styles.subOriCard1 : `${styles.subOriCard1} ${styles[synopClass]}`}
                            onMouseEnter={()=>{addUpright(subRef4, synopSelected)}}
                            onMouseLeave={()=>{delUpright(subRef4, synopSelected)}}>
                            {synopSelected ?
                                    <>
                                        <span className={`${hungeul.className} ${styles[genre]}`}>{genre}</span>
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
                                            <SimpleBar ref={scrollRef1} style={{ flexShrink: 0, maxHeight: 200, minWidth: 210}}>
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
                        </div>
                    </div>
                    <div className={profileSelected ? `${styles.sub1Wrapper} ${styles.float}` : styles.sub1Wrapper}>
                        <div
                            ref={subRef1}
                            className={!profileSelected ? styles.subOriCard2 : `${styles.subOriCard2} ${styles[profileClass]}`}
                            onMouseEnter={()=>{addUpright(subRef1, profileSelected)}}
                            onMouseLeave={()=>{delUpright(subRef1, profileSelected)}}>
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
                                        <SimpleBar ref={scrollRef2} style={{ flexShrink: 0, maxHeight: 200, minWidth: 195}}>
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
                        </div>
                    </div>
                    <div className={giftSelected ? `${styles.sub2Wrapper} ${styles.float}` : styles.sub2Wrapper}>
                        <div
                            ref={subRef2}
                            className={!giftSelected ? styles.subOriCard3 : `${styles.subOriCard3} ${styles[giftClass]}`}
                            onMouseEnter={()=>{addUpright(subRef2, giftSelected)}}
                            onMouseLeave={()=>{delUpright(subRef2, giftSelected)}}>
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
                                        <SimpleBar ref={scrollRef3} style={{ flexShrink: 0, maxHeight: 210, minWidth: 190}}>
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
                        </div>
                    </div>
                    <div className={abilSelected ? `${styles.sub3Wrapper} ${styles.float}` : styles.sub3Wrapper}>
                        <div
                            ref={subRef3}
                            className={!abilSelected ? styles.subOriCard4 : `${styles.subOriCard4} ${styles[abilClass]}`}
                            onMouseEnter={()=>{addUpright(subRef3, abilSelected)}}
                            onMouseLeave={()=>{delUpright(subRef3, abilSelected)}}>
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
                                        <SimpleBar ref={scrollRef4} style={{ flexShrink: 0, maxHeight: 200, minWidth: 190}}>
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
                        </div>
                    </div>
                    <div className={styles.subWrapperCover}></div>
                </>
            }
        </>
    );
};