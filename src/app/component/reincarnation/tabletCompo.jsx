'use client'
import styles from './tabletCompo.module.css';
import { useState, useEffect, useRef } from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function TabletCompo (mainRef, subRef1, subRef2, subRef3, subRef4, mainMoved, genre, simResult) {

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
            <div ref ={mainRef} className={styles.mainTablet}></div>
        </>
    );
};